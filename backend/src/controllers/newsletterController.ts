import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import emailService from '../services/emailService';

export const newsletterController = {
  /**
   * Subscribe to newsletter
   * POST /api/newsletter/subscribe
   */
  async subscribe(req: Request, res: Response) {
    try {
      const { email } = req.body;

      // Validate email
      if (!email || typeof email !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address'
        });
      }

      // Normalize email to lowercase
      const normalizedEmail = email.toLowerCase().trim();

      // Check if email already exists
      const { data: existingSubscriber, error: checkError } = await supabase
        .from('newsletter_subscribers')
        .select('id, email, is_active')
        .eq('email', normalizedEmail)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is expected for new subscribers
        console.error('Error checking subscriber:', checkError);
        return res.status(500).json({
          success: false,
          message: 'An error occurred while processing your subscription'
        });
      }

      // If subscriber exists
      if (existingSubscriber) {
        if (existingSubscriber.is_active) {
          return res.status(200).json({
            success: true,
            message: 'You are already subscribed to our newsletter!',
            alreadySubscribed: true
          });
        } else {
          // Reactivate subscription
          const { error: updateError } = await supabase
            .from('newsletter_subscribers')
            .update({
              is_active: true,
              unsubscribed_at: null,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingSubscriber.id);

          if (updateError) {
            console.error('Error reactivating subscription:', updateError);
            return res.status(500).json({
              success: false,
              message: 'An error occurred while reactivating your subscription'
            });
          }

          // Send welcome back email
          await emailService.sendNewsletterWelcome(normalizedEmail, true);

          return res.status(200).json({
            success: true,
            message: 'Welcome back! Your subscription has been reactivated.',
            reactivated: true
          });
        }
      }

      // Create new subscriber
      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: normalizedEmail,
          is_active: true,
          subscribed_at: new Date().toISOString()
        });

      if (insertError) {
        console.error('Error creating subscription:', insertError);
        return res.status(500).json({
          success: false,
          message: 'An error occurred while creating your subscription'
        });
      }

      // Send welcome email
      await emailService.sendNewsletterWelcome(normalizedEmail, false);

      return res.status(201).json({
        success: true,
        message: 'Successfully subscribed! Check your email for confirmation.'
      });

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return res.status(500).json({
        success: false,
        message: 'An unexpected error occurred. Please try again later.'
      });
    }
  },

  /**
   * Unsubscribe from newsletter
   * POST /api/newsletter/unsubscribe
   */
  async unsubscribe(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Update subscriber to inactive
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({
          is_active: false,
          unsubscribed_at: new Date().toISOString()
        })
        .eq('email', normalizedEmail)
        .eq('is_active', true);

      if (error) {
        console.error('Error unsubscribing:', error);
        return res.status(500).json({
          success: false,
          message: 'An error occurred while unsubscribing'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Successfully unsubscribed from newsletter'
      });

    } catch (error) {
      console.error('Newsletter unsubscribe error:', error);
      return res.status(500).json({
        success: false,
        message: 'An unexpected error occurred'
      });
    }
  },

  /**
   * Get all active subscribers (admin only)
   * GET /api/newsletter/subscribers
   */
  async getSubscribers(req: Request, res: Response) {
    try {
      const { data: subscribers, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .eq('is_active', true)
        .order('subscribed_at', { ascending: false });

      if (error) {
        console.error('Error fetching subscribers:', error);
        return res.status(500).json({
          success: false,
          message: 'An error occurred while fetching subscribers'
        });
      }

      return res.status(200).json({
        success: true,
        data: subscribers,
        count: subscribers?.length || 0
      });

    } catch (error) {
      console.error('Error fetching subscribers:', error);
      return res.status(500).json({
        success: false,
        message: 'An unexpected error occurred'
      });
    }
  }
};
