import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { JWTPayload } from '../types/auth';

interface AuthRequest extends Request {
  user?: JWTPayload;
}

export const contentController = {
  // Get all static content (admin)
  async getAllContent(req: AuthRequest, res: Response) {
    try {
      const { content_type } = req.query;
      
      let query = supabase
        .from('static_content')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (content_type) {
        query = query.eq('content_type', content_type);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      res.json(data);
    } catch (error) {
      console.error('Error fetching content:', error);
      res.status(500).json({ error: 'Failed to fetch content' });
    }
  },

  // Get published content (public)
  async getPublishedContent(req: Request, res: Response) {
    try {
      const { slug, content_type } = req.query;
      
      let query = supabase
        .from('static_content')
        .select('*')
        .eq('is_published', true);
      
      if (slug) {
        const { data, error } = await query.eq('slug', slug).single();
        if (error) throw error;
        return res.json(data);
      } else {
        if (content_type) {
          query = query.eq('content_type', content_type);
        }
        query = query.order('display_order', { ascending: true });
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      res.json(data);
    } catch (error) {
      console.error('Error fetching published content:', error);
      res.status(500).json({ error: 'Failed to fetch content' });
    }
  },

  // Create new content
  async createContent(req: AuthRequest, res: Response) {
    try {
      const { title, content, content_type, slug, meta_description, is_published, display_order } = req.body;
      
      const { data, error } = await supabase
        .from('static_content')
        .insert({
          title,
          content,
          content_type,
          slug,
          meta_description,
          is_published: is_published || false,
          display_order: display_order || 0,
          created_by: req.user?.userId,
          updated_by: req.user?.userId
        })
        .select()
        .single();
      
      if (error) throw error;
      
      res.status(201).json(data);
    } catch (error) {
      console.error('Error creating content:', error);
      res.status(500).json({ error: 'Failed to create content' });
    }
  },

  // Update content
  async updateContent(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const { data, error } = await supabase
        .from('static_content')
        .update({
          ...updates,
          updated_by: req.user?.userId,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      res.json(data);
    } catch (error) {
      console.error('Error updating content:', error);
      res.status(500).json({ error: 'Failed to update content' });
    }
  },

  // Delete content
  async deleteContent(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      
      const { error } = await supabase
        .from('static_content')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      res.json({ message: 'Content deleted successfully' });
    } catch (error) {
      console.error('Error deleting content:', error);
      res.status(500).json({ error: 'Failed to delete content' });
    }
  },

  // FAQ Categories
  async getFAQCategories(req: Request, res: Response) {
    try {
      const { data, error } = await supabase
        .from('faq_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      
      res.json(data);
    } catch (error) {
      console.error('Error fetching FAQ categories:', error);
      res.status(500).json({ error: 'Failed to fetch FAQ categories' });
    }
  },

  async createFAQCategory(req: AuthRequest, res: Response) {
    try {
      const { name, slug, description, display_order } = req.body;
      
      const { data, error } = await supabase
        .from('faq_categories')
        .insert({
          name,
          slug,
          description,
          display_order: display_order || 0
        })
        .select()
        .single();
      
      if (error) throw error;
      
      res.status(201).json(data);
    } catch (error) {
      console.error('Error creating FAQ category:', error);
      res.status(500).json({ error: 'Failed to create FAQ category' });
    }
  },

  // FAQ Items
  async getFAQItems(req: Request, res: Response) {
    try {
      const { category_id } = req.query;
      
      let query = supabase
        .from('faq_items')
        .select(`
          *,
          category:faq_categories(name, slug)
        `)
        .eq('is_published', true)
        .order('display_order', { ascending: true });
      
      if (category_id) {
        query = query.eq('category_id', category_id);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      res.json(data);
    } catch (error) {
      console.error('Error fetching FAQ items:', error);
      res.status(500).json({ error: 'Failed to fetch FAQ items' });
    }
  },

  async createFAQItem(req: AuthRequest, res: Response) {
    try {
      const { category_id, question, answer, display_order, is_published } = req.body;
      
      const { data, error } = await supabase
        .from('faq_items')
        .insert({
          category_id,
          question,
          answer,
          display_order: display_order || 0,
          is_published: is_published !== false,
          created_by: req.user?.userId,
          updated_by: req.user?.userId
        })
        .select()
        .single();
      
      if (error) throw error;
      
      res.status(201).json(data);
    } catch (error) {
      console.error('Error creating FAQ item:', error);
      res.status(500).json({ error: 'Failed to create FAQ item' });
    }
  },

  async updateFAQItem(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const { data, error } = await supabase
        .from('faq_items')
        .update({
          ...updates,
          updated_by: req.user?.userId,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      res.json(data);
    } catch (error) {
      console.error('Error updating FAQ item:', error);
      res.status(500).json({ error: 'Failed to update FAQ item' });
    }
  },

  async deleteFAQItem(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      
      const { error } = await supabase
        .from('faq_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      res.json({ message: 'FAQ item deleted successfully' });
    } catch (error) {
      console.error('Error deleting FAQ item:', error);
      res.status(500).json({ error: 'Failed to delete FAQ item' });
    }
  },

  // Track FAQ helpfulness
  async trackFAQHelpfulness(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { helpful } = req.body;

      const { data: faq, error: fetchError } = await supabase
        .from('faq_items')
        .select('helpful_count, not_helpful_count')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      const updates = helpful
        ? { helpful_count: (faq.helpful_count || 0) + 1 }
        : { not_helpful_count: (faq.not_helpful_count || 0) + 1 };

      const { error: updateError } = await supabase
        .from('faq_items')
        .update(updates)
        .eq('id', id);

      if (updateError) throw updateError;

      res.json({ message: 'Feedback recorded' });
    } catch (error) {
      console.error('Error tracking FAQ helpfulness:', error);
      res.status(500).json({ error: 'Failed to record feedback' });
    }
  },

  // Blog Posts Management
  // Get all blog posts (admin)
  async getAllBlogPosts(req: AuthRequest, res: Response) {
    try {
      const { category, is_published } = req.query;

      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      if (is_published !== undefined) {
        query = query.eq('is_published', is_published === 'true');
      }

      const { data, error } = await query;

      if (error) throw error;

      res.json(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  },

  // Get published blog posts (public)
  async getPublishedBlogPosts(req: Request, res: Response) {
    try {
      const { category, slug, limit, offset } = req.query;

      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true);

      if (slug) {
        const { data, error } = await query.eq('slug', slug).single();
        if (error) throw error;
        return res.json(data);
      }

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      query = query.order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(parseInt(limit as string));
      }

      if (offset) {
        query = query.range(parseInt(offset as string), parseInt(offset as string) + parseInt(limit as string || '10') - 1);
      }

      const { data, error } = await query;

      if (error) throw error;

      res.json(data);
    } catch (error) {
      console.error('Error fetching published blog posts:', error);
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  },

  // Get single blog post by ID
  async getBlogPostById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (!data) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      res.json(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).json({ error: 'Failed to fetch blog post' });
    }
  },

  // Create new blog post
  async createBlogPost(req: AuthRequest, res: Response) {
    try {
      const {
        title,
        slug,
        description,
        content,
        category,
        read_time,
        image,
        author_name,
        author_title,
        author_initials,
        reviewer_name,
        last_updated,
        meta_description,
        is_published
      } = req.body;

      // Validate required fields
      if (!title || !slug || !description || !category) {
        return res.status(400).json({
          error: 'Title, slug, description, and category are required'
        });
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          title,
          slug,
          description,
          content: content || '',
          category,
          read_time: read_time || '5 min read',
          image: image || null,
          author_name: author_name || 'ACT Coaching Team',
          author_title: author_title || 'Lead coach, ACT Coaching for Life',
          author_initials: author_initials || 'ACT',
          reviewer_name: reviewer_name || author_name,
          last_updated: last_updated || new Date().toISOString().split('T')[0],
          meta_description: meta_description || description,
          is_published: is_published !== false,
          created_by: req.user?.userId,
          updated_by: req.user?.userId
        })
        .select()
        .single();

      if (error) throw error;

      res.status(201).json(data);
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).json({ error: 'Failed to create blog post' });
    }
  },

  // Update blog post
  async updateBlogPost(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          ...updates,
          updated_by: req.user?.userId,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      if (!data) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      res.json(data);
    } catch (error) {
      console.error('Error updating blog post:', error);
      res.status(500).json({ error: 'Failed to update blog post' });
    }
  },

  // Delete blog post
  async deleteBlogPost(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      res.status(500).json({ error: 'Failed to delete blog post' });
    }
  },

  // Toggle blog post publish status
  async toggleBlogPostPublish(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      // Get current status
      const { data: post, error: fetchError } = await supabase
        .from('blog_posts')
        .select('is_published')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      if (!post) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      // Toggle status
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          is_published: !post.is_published,
          updated_by: req.user?.userId,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      res.json(data);
    } catch (error) {
      console.error('Error toggling blog post publish status:', error);
      res.status(500).json({ error: 'Failed to toggle publish status' });
    }
  },

  // Get blog categories
  async getBlogCategories(req: Request, res: Response) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('category')
        .eq('is_published', true);

      if (error) throw error;

      // Get unique categories
      const categories = [...new Set(data.map(post => post.category))];

      res.json(categories);
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  }
};