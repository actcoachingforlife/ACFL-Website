-- Migration: Create blog_posts table
-- Description: Creates the blog_posts table for blog management system
-- Date: 2025

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    content TEXT,
    category VARCHAR(100) NOT NULL,
    read_time VARCHAR(50) DEFAULT '5 min read',
    image VARCHAR(500) DEFAULT '/images/coaching-hero.png',
    author_name VARCHAR(255) DEFAULT 'ACT Coaching Team',
    author_title VARCHAR(255) DEFAULT 'Lead coach, ACT Coaching for Life',
    author_initials VARCHAR(10) DEFAULT 'ACT',
    reviewer_name VARCHAR(255),
    last_updated DATE,
    meta_description TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Create trigger to update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_blog_posts_updated_at();

-- Add comments for documentation
COMMENT ON TABLE blog_posts IS 'Stores blog posts for the ACFL website';
COMMENT ON COLUMN blog_posts.slug IS 'URL-friendly identifier for the blog post';
COMMENT ON COLUMN blog_posts.category IS 'Blog post category (Personal Growth, Mindfulness, Leadership, Wellness)';
COMMENT ON COLUMN blog_posts.read_time IS 'Estimated reading time (e.g., "5 min read")';
COMMENT ON COLUMN blog_posts.author_title IS 'Author job title or role (e.g., "Lead coach, ACT Coaching for Life")';
COMMENT ON COLUMN blog_posts.author_initials IS 'Author initials for avatar display (e.g., "ST" for Sarah Thompson)';
COMMENT ON COLUMN blog_posts.reviewer_name IS 'Name of person who reviewed the blog post';
COMMENT ON COLUMN blog_posts.last_updated IS 'Date when the blog post was last updated';
COMMENT ON COLUMN blog_posts.is_published IS 'Publication status - only published posts appear on public site';
