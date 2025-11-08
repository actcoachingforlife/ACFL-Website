"use client";

import Footer from "@/components/Footer";
import NavbarLandingPage from "@/components/NavbarLandingPage";
import Contact from "../component/contactUs";
import { motion } from "framer-motion";
import { Facebook, Linkedin, Twitter, Link2 } from "lucide-react";
import Image from "next/image";

export default function ResourcesPage() {
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
            <a href="#" className="hover:text-gray-900">
              Blog
            </a>
            <span>›</span>
            <span className="text-gray-900">Understanding your values...</span>
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
                Understanding your values in challenging times
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 text-lg mb-6"
              >
                Learn practical techniques to align your actions with core personal values
              </motion.p>

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 text-sm"
              >
                <div>
                  <span className="text-gray-500">Last Updated: </span>
                  <span className="text-gray-900 font-medium">October 2, 2025</span>
                </div>
                <div>
                  <span className="text-gray-500">Reviewed by: </span>
                  <span className="text-gray-900 font-medium">John Doe</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-gray-600 text-white text-xs font-medium px-3 py-1.5 rounded">
                    Wellness
                  </span>
                  <span className="text-gray-600">5 min read</span>
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
                  src="/images/coaching-hero.png"
                  alt="Understanding your values in challenging times"
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
            className="prose prose-lg max-w-none"
          >
            <p className="text-gray-700 leading-relaxed mb-6">
              Acceptance is a journey, not a destination. In the landscape of personal growth, we often struggle against our inner experiences, believing that fighting will bring peace. But what if true strength lies in embracing our thoughts and feelings, not battling them?
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Acceptance and Commitment Therapy (ACT) offers a unique approach to mental wellness. It teaches us that pain is an inevitable part of human experience. Our suffering increases when we resist what cannot be changed. Instead, ACT guides us to accept our emotions, thoughts, and circumstances while committing to actions aligned with our core values.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Imagine your mind as a vast ocean. Thoughts are waves that come and go. Traditional therapy might teach you to calm the waves. ACT teaches you to become a skilled navigator, riding those waves with purpose and resilience.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              The core of ACT revolves around six key processes: psychological flexibility, cognitive defusion, acceptance, contact with the present moment, values, and committed action. These aren't just theoretical concepts but practical skills that transform how we engage with life's challenges.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Cognitive defusion helps us see thoughts as mental events, not absolute truths. Acceptance allows us to experience emotions without being consumed by them. Connecting with the present moment grounds us in reality, not hypothetical fears or regrets.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Values become our compass. They are the deeply held principles that give meaning to our actions. When we align our behaviors with these values, we create a life of purpose and authenticity.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Committed action is where theory meets practice. It's about taking meaningful steps towards our goals, even when discomfort or fear tries to hold us back. Small, consistent actions build resilience and create lasting change.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Personal growth isn't about eliminating negative experiences. It's about developing the capacity to move forward despite them. ACT empowers individuals to live fully, embracing both joy and challenge with equal courage.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Remember, healing is not linear. Some days will feel easier than others. The practice of acceptance is itself a form of strength. By learning to be with our experiences rather than fighting them, we open the door to genuine transformation.
            </p>
          </motion.article>

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
                  <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
                    <Link2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
                    <Linkedin className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
                    <Facebook className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded">
                Coach
              </span>
            </div>

            {/* Author Card */}
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop"
                  alt="Sarah Thompson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Sarah Thompson</p>
                <p className="text-sm text-gray-600">Lead coach, ACT Coaching for Life</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Keep Reading Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12"
          >
            Keep reading
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/coaching-hero.png"
                  alt="Setting meaningful life goals"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-cyan-100 text-cyan-600 text-xs font-medium px-3 py-1 rounded">
                    Personal Growth
                  </span>
                  <span className="text-sm text-gray-500">5 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Setting meaningful life goals
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Strategies for creating purpose-driven personal and professional objectives
                </p>
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/why-coaching-1.png"
                  alt="Breaking through mental barriers"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-cyan-100 text-cyan-600 text-xs font-medium px-3 py-1 rounded">
                    Mindfulness
                  </span>
                  <span className="text-sm text-gray-500">5 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Breaking through mental barriers
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Explore strategies to overcome limiting beliefs and create meaningful change
                </p>
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src="/images/why-coaching-2.png"
                  alt="Understanding your values in challenging times"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-cyan-100 text-cyan-600 text-xs font-medium px-3 py-1 rounded">
                    Wellness
                  </span>
                  <span className="text-sm text-gray-500">5 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Understanding your values in challenging times
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Practical techniques to align actions with core personal values
                </p>
                <button className="inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                  Read more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Stories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Client stories
            </h2>
            <p className="text-gray-600 text-lg">
              Real people, real transformations through ACT coaching
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                My coach helped me work through anxiety that was holding me back for years. The ACT approach really clicked with me, and I finally feel like I'm living authentically. Highly recommend!
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  SM
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Sarah Martinez</p>
                  <p className="text-gray-500 text-xs">Local Guide • 47 reviews</p>
                  <p className="text-gray-400 text-xs">Google • 3 months ago</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                The matching process was incredible - they found me a coach who understood my specific challenges. Three months later, I feel more confident and focused than ever. Worth every penny.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                  MR
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Michael Rodriguez</p>
                  <p className="text-gray-500 text-xs">Local Guide • 29 reviews</p>
                  <p className="text-gray-400 text-xs">Google • 2 months ago</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                I was skeptical about online coaching, but the platform made it so easy to connect with my coach. The flexibility to message between sessions has been a game-changer. Amazing service!
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  JL
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Jennifer Lee</p>
                  <p className="text-gray-500 text-xs">Local Guide • 83 reviews</p>
                  <p className="text-gray-400 text-xs">Google • 1 month ago</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to start your journey?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Discover personalized coaching that helps you live with purpose and clarity
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 py-3 rounded-lg transition-colors shadow-sm">
                Start assessment
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 font-medium px-8 py-3 rounded-lg border border-gray-300 transition-colors">
                Browse resources
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-lg overflow-hidden"
          >
            <img
              src="/images/coaching-hero.png"
              alt="Ready to start your journey"
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </motion.div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
}
