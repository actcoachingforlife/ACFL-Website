"use client";

import Footer from "@/components/Footer";
import NavbarLandingPage from "@/components/NavbarLandingPage";
import Contact from "../component/contactUs";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
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
                    src="/images/Blog_img1.png"
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
                      src="/images/Blog_img2.png"
                      alt="Emotional intelligence in the workplace"
                      className="w-32 h-24 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight">
                        Emotional intelligence in the workplace
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">November 3, 2025</p>
                      <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                        Latest Blog
                      </span>
                    </div>
                  </div>

                  {/* Trending Article 2 */}
                  <div className="flex gap-4 p-4 border-b border-gray-200">
                    <img
                      src="/images/Blog_img3.png"
                      alt="Emotional intelligence in the workplace"
                      className="w-32 h-24 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight">
                        Emotional intelligence in the workplace
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">November 3, 2025</p>
                      <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                        Latest Blog
                      </span>
                    </div>
                  </div>

                  {/* Trending Article 3 */}
                  <div className="flex gap-4 p-4">
                    <img
                      src="/images/Blog_img4.png"
                      alt="Emotional intelligence in the workplace"
                      className="w-32 h-24 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight">
                        Emotional intelligence in the workplace
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">November 3, 2025</p>
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
                  src="/images/Blog_img5.png"
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
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
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
                  src="/images/Blog_img6.png"
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
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
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
                  src="/images/Blog_img7.png"
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
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
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
                  src="/images/Blog_img8.png"
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
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
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
                  src="/images/Blog_img9.png"
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
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
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
                  src="/images/Blog_img10.png"
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
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
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
                  src="/images/Blog_img11.png"
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
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
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
                  src="/images/Blog_img12.png"
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
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors w-fit">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
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
                src="/images/Blog_img13.png"
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
              <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                Read more
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
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
                  Emotional intelligence in the workplace
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">November 3, 2025</span>
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
                  Emotional intelligence in the workplace
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">November 3, 2025</span>
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
                  Emotional intelligence in the workplace
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">November 3, 2025</span>
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
      <section className="py-16 bg-gray-50">
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
            <button className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors">
              View all
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors">
              Wellness
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors">
              Mindfulness
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors">
              Leadership
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors">
              Personal Growth
            </button>
          </div>

          {/* Blog Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/Blog_img14.png"
                  alt="Setting meaningful life goals"
                  className="w-full h-[220px] object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-xs font-medium">
                    Personal Growth
                  </span>
                  <span className="text-sm text-gray-600">5 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  Setting meaningful life goals
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Strategies for creating purpose-driven personal and professional objectives
                </p>
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
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
                  src="/images/Blog_img15.png"
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
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
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
                  src="/images/Blog_img16.png"
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
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button className="px-4 py-2 bg-cyan-400 text-white text-sm font-medium rounded">
              1
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors">
              4
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors">
              5
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
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
                  src="/images/Blog_img17.png"
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
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors w-fit">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
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
                  src="/images/Blog_img18.png"
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
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
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
                  src="/images/Blog_img15.png"
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
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
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
                  src="/images/Blog_img20.png"
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
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
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
              <div className="flex flex-col sm:flex-row gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sign up to our newsletter ↓
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 border border-gray-300 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <button className="px-6 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition-colors self-end">
                  Subscribe
                </button>
              </div>
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
              <button className="px-6 py-3 bg-teal-500 text-white font-medium rounded hover:bg-teal-600 transition-colors">
                Subscribe
              </button>
              <button className="px-6 py-3 bg-white text-gray-700 font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors">
                Explore
              </button>
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
              src="/images/Blog_img21.png"
              alt="Get insights that transform"
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
}
