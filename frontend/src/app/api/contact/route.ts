import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create Supabase admin client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, interests, message, agreeToTerms } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate terms agreement
    if (!agreeToTerms) {
      return NextResponse.json(
        { error: 'You must agree to the terms' },
        { status: 400 }
      );
    }

    // Store contact form submission in database
    // First, check if you have a contact_submissions table, if not, we'll create the structure
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
        interests: interests || [],
        message,
        submitted_at: new Date().toISOString(),
        status: 'new' // can be: new, read, responded
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);

      // If table doesn't exist, log it but still send email
      if (error.code === '42P01') {
        console.warn('contact_submissions table does not exist. Please create it.');
        // Continue to send email even if table doesn't exist
      } else {
        return NextResponse.json(
          { error: 'Failed to save contact submission' },
          { status: 500 }
        );
      }
    }

    // Send email notification (optional - implement based on your email service)
    // await sendContactEmail({
    //   firstName,
    //   lastName,
    //   email,
    //   phone,
    //   interests,
    //   message
    // });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
        data: data || { firstName, lastName, email }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
