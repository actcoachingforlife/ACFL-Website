"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Facebook, Linkedin, Link2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Footer from "@/components/Footer";
import NavbarLandingPage from "@/components/NavbarLandingPage";
import { getApiUrl } from "@/lib/api";
import 'react-quill/dist/quill.snow.css';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  read_time: string;
  image: string;
  author_name: string;
  author_title?: string;
  author_initials?: string;
  reviewer_name?: string;
  last_updated?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

export default function BlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting for framer-motion
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/api/content/public/blog/posts?slug=${slug}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (!mounted || loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <nav>
          <NavbarLandingPage />
        </nav>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <nav>
          <NavbarLandingPage />
        </nav>
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/blog')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Blog
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <nav>
        <NavbarLandingPage />
      </nav>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-gray-600 mb-8"
          >
            <button onClick={() => router.push('/blog')} className="hover:text-gray-900">
              Blog
            </button>
            <span>›</span>
            <span className="text-gray-900">{post.title.substring(0, 30)}...</span>
          </motion.nav>

          {/* Article Header - Two Column Layout */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Column - Content */}
            <div className="lg:flex-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                {post.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 text-lg mb-6"
              >
                {post.description}
              </motion.p>

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 text-sm"
              >
                {post.last_updated && (
                  <div>
                    <span className="text-gray-500">Last Updated: </span>
                    <span className="text-gray-900 font-medium">{formatDate(post.last_updated)}</span>
                  </div>
                )}
                {post.reviewer_name && (
                  <div>
                    <span className="text-gray-500">Reviewed by: </span>
                    <span className="text-gray-900 font-medium">{post.reviewer_name}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-gray-600 text-white text-xs font-medium px-3 py-1.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-600">{post.read_time}</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="lg:w-[400px] self-start"
            >
              <div className="rounded-lg overflow-hidden h-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="blog-content"
          >
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.article>

          <style jsx global>{`
            .blog-content {
              color: #374151;
              font-size: 1.125rem;
              line-height: 1.75;
            }

            .blog-content h2 {
              font-size: 1.875rem;
              font-weight: 700;
              margin-top: 3rem;
              margin-bottom: 1.5rem;
              color: #111827;
              line-height: 1.2;
            }

            .blog-content h3 {
              font-size: 1.5rem;
              font-weight: 700;
              margin-top: 2rem;
              margin-bottom: 1rem;
              color: #111827;
              line-height: 1.3;
            }

            .blog-content p {
              margin-bottom: 1.5rem;
              line-height: 1.75;
              color: #4b5563;
            }

            .blog-content ul,
            .blog-content ol {
              margin-bottom: 1.5rem;
              padding-left: 1.5rem;
            }

            .blog-content ul {
              list-style-type: disc;
            }

            .blog-content ol {
              list-style-type: decimal;
            }

            .blog-content li {
              margin-bottom: 0.5rem;
              color: #4b5563;
            }

            .blog-content blockquote {
              border-left: 4px solid #3b82f6;
              padding-left: 1rem;
              margin: 1.5rem 0;
              font-style: italic;
              color: #6b7280;
            }

            .blog-content a {
              color: #3b82f6;
              text-decoration: underline;
            }

            .blog-content a:hover {
              color: #2563eb;
            }

            .blog-content strong {
              font-weight: 700;
              color: #111827;
            }

            .blog-content em {
              font-style: italic;
            }

            .blog-content code {
              background-color: #f3f4f6;
              padding: 0.25rem 0.5rem;
              border-radius: 0.25rem;
              font-size: 0.875rem;
              font-family: monospace;
            }

            .blog-content pre {
              background-color: #1f2937;
              color: #f9fafb;
              padding: 1rem;
              border-radius: 0.5rem;
              overflow-x: auto;
              margin: 1.5rem 0;
            }

            .blog-content pre code {
              background-color: transparent;
              padding: 0;
              color: inherit;
            }
          `}</style>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-900 font-medium">Share this post</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                  >
                    <Link2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded">
                Coach
              </span>
            </div>

            {/* Author Card */}
            {post.author_name && (
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white font-bold text-lg">
                    {post.author_initials || post.author_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{post.author_name}</p>
                  {post.author_title && (
                    <p className="text-sm text-gray-600">{post.author_title}</p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
