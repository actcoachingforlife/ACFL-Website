"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import NavbarLandingPage from "@/components/NavbarLandingPage";
import Contact from "../component/contactUs";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import ScrollToTop from "@/components/ScrollToTop";

// Blog article type
type BlogArticle = {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  image: string;
};

// Helper function to convert article title to URL slug
const getArticleSlug = (title: string): string => {
  const slugMap: { [key: string]: string } = {
    "Setting meaningful life goals": "/blog/life-goals",
    "Breaking through mental barriers": "/blog/mental-barriers",
    "Understanding your values in challenging times": "/blog/understanding-values",
    "Emotional intelligence in the workplace": "/blog/emotional-intelligence",
    "Building psychological flexibility through ACT": "/blog/psychological-flexibility",
    "Mastering cognitive defusion": "/blog/defusion-techniques",
    "Taking committed action": "/blog/committed-action"
  };
  return slugMap[title] || "#";
};

// Sample blog articles data
const allBlogArticles: BlogArticle[] = [
  {
    id: 1,
    title: "Setting meaningful life goals",
    description: "Strategies for creating purpose-driven personal and professional objectives",
    category: "Personal Growth",
    readTime: "5 min read",
    image: "/images/why-coaching-4.png"
  },
  {
    id: 2,
    title: "Breaking through mental barriers",
    description: "Explore strategies to overcome limiting beliefs and create meaningful change",
    category: "Mindfulness",
    readTime: "5 min read",
    image: "/images/why-coaching-5.png"
  },
  {
    id: 3,
    title: "Understanding your values in challenging times",
    description: "Practical techniques to align actions with core personal values",
    category: "Wellness",
    readTime: "5 min read",
    image: "/images/coaching-hero.png"
  },
  {
    id: 4,
    title: "Emotional intelligence in the workplace",
    description: "Develop critical skills for effective communication and team performance",
    category: "Leadership",
    readTime: "6 min read",
    image: "/images/why-coaching-3.png"
  },
  {
    id: 5,
    title: "Mindful living practices",
    description: "Daily techniques to enhance presence and awareness",
    category: "Mindfulness",
    readTime: "4 min read",
    image: "/images/why-coaching-1.png"
  },
  {
    id: 6,
    title: "Building resilience in difficult times",
    description: "Strengthen your ability to bounce back from challenges",
    category: "Wellness",
    readTime: "7 min read",
    image: "/images/why-coaching-2.png"
  },
  {
    id: 7,
    title: "Leadership through acceptance",
    description: "Lead with authenticity and psychological flexibility",
    category: "Leadership",
    readTime: "6 min read",
    image: "/images/why-coaching-4.png"
  },
  {
    id: 8,
    title: "Personal transformation journey",
    description: "Navigate your path to meaningful personal growth",
    category: "Personal Growth",
    readTime: "8 min read",
    image: "/images/why-coaching-5.png"
  },
  {
    id: 9,
    title: "Stress management techniques",
    description: "Effective strategies for managing everyday stress",
    category: "Wellness",
    readTime: "5 min read",
    image: "/images/coaching-hero.png"
  },
  {
    id: 10,
    title: "Communication mastery",
    description: "Enhance your interpersonal communication skills",
    category: "Leadership",
    readTime: "6 min read",
    image: "/images/why-coaching-3.png"
  },
  {
    id: 11,
    title: "Meditation for beginners",
    description: "Start your mindfulness practice with simple techniques",
    category: "Mindfulness",
    readTime: "4 min read",
    image: "/images/why-coaching-1.png"
  },
  {
    id: 12,
    title: "Goal setting strategies",
    description: "Create actionable plans for your personal development",
    category: "Personal Growth",
    readTime: "7 min read",
    image: "/images/why-coaching-2.png"
  },
  {
    id: 13,
    title: "Work-life balance essentials",
    description: "Find harmony between professional and personal life",
    category: "Wellness",
    readTime: "5 min read",
    image: "/images/why-coaching-4.png"
  },
  {
    id: 14,
    title: "Mindful breathing exercises",
    description: "Simple breathing techniques for daily practice",
    category: "Mindfulness",
    readTime: "3 min read",
    image: "/images/why-coaching-5.png"
  },
  {
    id: 15,
    title: "Effective team leadership",
    description: "Build and lead high-performing teams",
    category: "Leadership",
    readTime: "8 min read",
    image: "/images/coaching-hero.png"
  }
];

export default function BlogPage() {
  useScrollRestoration('blogScrollPosition');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const articlesPerPage = 3;
  const categories = ['all', 'Wellness', 'Mindfulness', 'Leadership', 'Personal Growth'];

  // Filter articles based on active category
  const filteredArticles = activeFilter === 'all'
    ? allBlogArticles
    : allBlogArticles.filter(article => article.category === activeFilter);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Handle filter change
  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to the section
    document.getElementById('insights-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      const { getApiUrl } = await import('@/lib/api');
      const apiUrl = getApiUrl();

      const response = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed! Check your email for confirmation.');
        setEmail('');

        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Subscription failed. Please try again.');

        // Reset error message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');

      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <nav>
        <NavbarLandingPage />
      </nav>

      {/* Hero Section with Featured Article and Trending Sidebar */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Featured Article - Left Side */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Featured Image */}
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img
                    src="/images/coaching-hero.png"
                    alt="Understanding your values in challenging times"
                    className="w-full h-[350px] object-cover"
                  />
                </div>

                {/* Content */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Understanding your values in challenging times
                </h1>
                <p className="text-gray-600 text-base mb-6">
                  Learn practical techniques to align your actions with core personal values
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Wellness
                  </span>
                  <span className="text-gray-600">5 min read</span>
                </div>
              </motion.div>
            </div>

            {/* Trending Sidebar - Right Side */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-lg overflow-hidden shadow-sm"
              >
                {/* Teal Header with Geometric Design */}
                <div className="bg-[#5EBEC4] p-8 relative overflow-hidden">
                  {/* Diagonal Geometric Shape */}
                  <div className="absolute top-0 right-0 w-full h-full">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#4BA8AE] opacity-40 transform rotate-45 translate-x-32 -translate-y-32"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white relative z-10">
                    Trending on<br />ACT Coaching<br />For Life
                  </h2>
                </div>

                {/* White Background with Blog Cards */}
                <div className="bg-white">
                  {/* Trending Article 1 */}
                  <div className="flex gap-4 p-4 border-b border-gray-200">
                    <img
                      src="/images/why-coaching-1.png"
                      alt="Mastering cognitive defusion"
                      className="w-32 h-24 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight">
                        Mastering cognitive defusion
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">November 6, 2025</p>
                      <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                        Latest Blog
                      </span>
                    </div>
                  </div>

                  {/* Trending Article 2 */}
                  <div className="flex gap-4 p-4 border-b border-gray-200">
                    <img
                      src="/images/why-coaching-5.png"
                      alt="Building psychological flexibility"
                      className="w-32 h-24 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight">
                        Building psychological flexibility
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">November 7, 2025</p>
                      <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                        Latest Blog
                      </span>
                    </div>
                  </div>

                  {/* Trending Article 3 */}
                  <div className="flex gap-4 p-4">
                    <img
                      src="/images/why-coaching-4.png"
                      alt="Taking committed action"
                      className="w-32 h-24 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight">
                        Taking committed action
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">November 5, 2025</p>
                      <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                        Latest Blog
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest ACT Resources & Guides */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-red-500 text-sm font-medium mb-2">Insights →</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Latest ACT Resources & Guides
            </h2>
            <p className="text-gray-600 text-lg">
              Discover transformative strategies for personal and professional growth
            </p>
          </motion.div>

          {/* Featured Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/images/coaching-hero.png"
                  alt="Understanding your values in challenging times"
                  className="w-full h-[350px] object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Wellness
                  </span>
                  <span className="text-sm text-gray-600">8 min read</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Understanding your values in challenging times
                </h3>
                <p className="text-gray-600 mb-6">
                  Learn practical techniques to align your actions with core personal values
                </p>
                <a href="/blog/understanding-values">
                  <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Grid of Article Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/why-coaching-1.png"
                  alt="Understanding your values in challenging times"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Wellness
                  </span>
                  <span className="text-sm text-gray-600">5 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Understanding your values in challenging times
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Practical techniques to align actions with core personal values
                </p>
                <a href="/blog/understanding-values">
                  <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </a>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/why-coaching-2.png"
                  alt="Breaking through mental barriers"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Mindfulness
                  </span>
                  <span className="text-sm text-gray-600">6 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Breaking through mental barriers
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore strategies to overcome limiting beliefs and create meaningful change
                </p>
                <a href="/blog/mental-barriers">
                  <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </a>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/why-coaching-3.png"
                  alt="Emotional intelligence in the workplace"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Leadership
                  </span>
                  <span className="text-sm text-gray-600">6 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Emotional intelligence in the workplace
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Develop critical skills for effective communication and team performance
                </p>
                <a href="/blog/emotional-intelligence">
                  <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Second Row of Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/why-coaching-4.png"
                  alt="Setting meaningful life goals"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Personal Growth
                  </span>
                  <span className="text-sm text-gray-600">5 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Setting meaningful life goals
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Strategies for creating purpose-driven personal and professional objectives
                </p>
                <a href="/blog/life-goals">
                  <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </a>
              </div>
            </motion.div>

            {/* Card 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/why-coaching-5.png"
                  alt="Breaking through mental barriers"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Mindfulness
                  </span>
                  <span className="text-sm text-gray-600">6 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Breaking through mental barriers
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore strategies to overcome limiting beliefs and create meaningful change
                </p>
                <a href="/blog/mental-barriers">
                  <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </a>
              </div>
            </motion.div>

            {/* Card 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/coaching-hero.png"
                  alt="Understanding your values in challenging times"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Wellness
                  </span>
                  <span className="text-sm text-gray-600">5 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Understanding your values in challenging times
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Practical techniques to align actions with core personal values
                </p>
                <a href="/blog/understanding-values">
                  <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Explore More Topics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-gray-900 mb-8"
          >
            Explore More Topics
          </motion.h2>

          {/* Horizontal Featured Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-lg overflow-hidden shadow-sm"
          >
            <div className="grid lg:grid-cols-2 gap-0 items-stretch">
              <div className="overflow-hidden">
                <img
                  src="/images/coaching-hero.png"
                  alt="Understanding your values in challenging times"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Wellness
                  </span>
                  <span className="text-sm text-gray-600">5 min read</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Understanding your values in challenging times
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Learn practical techniques to align your actions with core personal values
                </p>
                <a href="/blog/understanding-values">
                  <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors w-fit">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest from the blog Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-gray-900 mb-8"
          >
            Latest from the blog
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Featured Card Image - Column 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="overflow-hidden rounded"
            >
              <img
                src="/images/why-coaching-1.png"
                alt="Understanding your values in challenging times"
                className="w-full h-[180px] object-cover"
              />
            </motion.div>

            {/* Featured Card Content - Column 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                  Wellness
                </span>
                <span className="text-sm text-gray-600">5 min read</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                Understanding your values in challenging times
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Learn practical techniques to align your actions with core personal values
              </p>
              <a href="/blog/understanding-values">
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </a>
            </motion.div>

            {/* Three Small Cards - Column 3 */}
            <div className="space-y-6">
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="border-b border-gray-200 pb-6"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                  Building psychological flexibility
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">November 7, 2025</span>
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Latest Blog
                  </span>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="border-b border-gray-200 pb-6"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                  Mastering cognitive defusion
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">November 6, 2025</span>
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Latest Blog
                  </span>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                  Taking committed action
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">November 5, 2025</span>
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Latest Blog
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ACT Insights & Strategies Section */}
      <section id="insights-section" className="py-16 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-red-500 text-sm font-medium mb-2">Resources →</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              ACT Insights & Strategies
            </h2>
            <p className="text-gray-600 text-base">
              Empowering knowledge for personal and professional development
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                  activeFilter === category
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category === 'all' ? 'View all' : category}
              </button>
            ))}
          </div>

          {/* Blog Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {currentArticles.length > 0 ? (
              currentArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-[220px] object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-600">{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {article.description}
                    </p>
                    <a
                      href={getArticleSlug(article.title)}
                      className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
                    >
                      Read more
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-600">No articles found for this category.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                    currentPage === pageNumber
                      ? 'bg-cyan-400 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Complete ACT Resource Collection Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-red-500 text-sm font-medium mb-2">Library →</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Complete ACT Resource Collection
            </h2>
            <p className="text-gray-600 text-base">
              Comprehensive materials for personal and professional transformation
            </p>
          </div>

          {/* Featured Horizontal Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 rounded-lg overflow-hidden mb-12"
          >
            <div className="grid md:grid-cols-2 gap-0 items-stretch">
              <div className="overflow-hidden h-[220px]">
                <img
                  src="/images/why-coaching-1.png"
                  alt="Understanding your values in challenging times"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Wellness
                  </span>
                  <span className="text-sm text-gray-600">5 min read</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  Understanding your values in challenging times
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Learn practical techniques to align your actions with core personal values
                </p>
                <a href="/blog/understanding-values">
                  <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors w-fit">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Three Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/why-coaching-2.png"
                  alt="Understanding your values in challenging times"
                  className="w-full h-[220px] object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Wellness
                  </span>
                  <span className="text-sm text-gray-600">5 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  Understanding your values in challenging times
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Practical techniques to align actions with core personal values
                </p>
                <a href="/blog/understanding-values">
                  <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </a>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/why-coaching-5.png"
                  alt="Breaking through mental barriers"
                  className="w-full h-[220px] object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Mindfulness
                  </span>
                  <span className="text-sm text-gray-600">5 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  Breaking through mental barriers
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore strategies to overcome limiting beliefs and create meaningful change
                </p>
                <a href="/blog/mental-barriers">
                  <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </a>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/why-coaching-3.png"
                  alt="Emotional intelligence in the workplace"
                  className="w-full h-[220px] object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Leadership
                  </span>
                  <span className="text-sm text-gray-600">5 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  Emotional intelligence in the workplace
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Develop critical skills for effective communication and team performance
                </p>
                <a href="/blog/emotional-intelligence">
                  <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stay up to date Section */}
      <section className="py-16 bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Stay up to date !
              </h2>
              <p className="text-gray-600">
                Subscribe to our newsletter to get inbox <span className="font-medium">notifications</span>.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sign up to our newsletter ↓
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    className="px-4 py-2 border border-gray-300 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition-colors self-end disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {message && (
                <p className={`mt-3 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Client stories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Client stories
            </h2>
            <p className="text-gray-600">
              Real people, real transformations through ACT coaching
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                My coach helped me work through anxiety that was holding me back for years. The ACT approach really clicked with me, and I finally feel like I'm living authentically. Highly recommend!
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Sarah Martinez</p>
                  <p className="text-xs text-gray-500">Local Guide • 47 reviews</p>
                  <p className="text-xs text-gray-400">Google • 3 months ago</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                Themond service was incredible - they found me a coach who understood my unique challenges. Three months later, I feel more confident and focused than ever. Worth every penny.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  MR
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Michael Rodriguez</p>
                  <p className="text-xs text-gray-500">Local Guide • 29 reviews</p>
                  <p className="text-xs text-gray-400">Google • 2 months ago</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                I was skeptical about online coaching, but the platform made it so easy to connect with my coach. The flexibility to message between sessions has been a game-changer. Amazing service!
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  JL
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Jennifer Lee</p>
                  <p className="text-xs text-gray-500">Local Guide • 63 reviews</p>
                  <p className="text-xs text-gray-400">Google • 1 month ago</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Get insights that transform Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Get insights that transform
            </h2>
            <p className="text-gray-600 mb-6">
              Stay updated with the latest ACT strategies and personal growth resources
            </p>
            <div className="flex justify-center gap-4">
              <a href="#footer-subscribe">
                <button className="px-6 py-3 bg-teal-500 text-white font-medium rounded hover:bg-teal-600 transition-colors">
                  Subscribe
                </button>
              </a>
              <a href="/resources">
                <button className="px-6 py-3 bg-white text-gray-700 font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors">
                  Explore
                </button>
              </a>
            </div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-lg overflow-hidden"
          >
            <img
              src="/images/coaching-hero.png"
              alt="Get insights that transform"
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
