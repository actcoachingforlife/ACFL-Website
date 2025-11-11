"use client";

import { motion } from "framer-motion";
import { Facebook, Linkedin, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import NavbarLandingPage from "@/components/NavbarLandingPage";

export default function UnderstandingValuesArticle() {
  const router = useRouter();

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
                  <span className="text-gray-900 font-medium">November 11, 2025</span>
                </div>
                <div>
                  <span className="text-gray-500">Reviewed by: </span>
                  <span className="text-gray-900 font-medium">Sarah Thompson</span>
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
              In times of uncertainty and challenge, understanding and living by your core values becomes more important than ever. Values serve as an internal compass, guiding your decisions and helping you navigate through difficult situations with clarity and purpose.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What Are Personal Values?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Personal values are the fundamental beliefs and principles that matter most to you. They represent what you stand for and what gives your life meaning and direction. Unlike goals, which are specific achievements you work towards, values are ongoing qualities you want to embody in how you live your life.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Common personal values include:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Integrity and honesty</li>
              <li>Compassion and kindness</li>
              <li>Growth and learning</li>
              <li>Connection and relationships</li>
              <li>Autonomy and independence</li>
              <li>Creativity and self-expression</li>
              <li>Health and well-being</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why Values Matter in Challenging Times</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              During difficult periods, it's easy to lose sight of what truly matters to you. Stress, anxiety, and external pressures can push you to make decisions that don't align with your core beliefs. This misalignment often leads to increased stress, dissatisfaction, and a sense of being lost.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              When you're grounded in your values, you have a reliable framework for making decisions, even when the path forward isn't clear. Values provide stability and meaning when everything else feels uncertain.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Practical Steps to Identify Your Core Values</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Reflect on Peak Experiences</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Think about moments in your life when you felt most fulfilled, energized, and authentic. What were you doing? Who were you with? What values were you honoring in those moments?
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Notice What Bothers You</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your frustrations and irritations often point to values that aren't being honored. If you feel upset when someone is dishonest, integrity is likely one of your core values. If you're frustrated by injustice, fairness might be central to who you are.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Complete a Values Clarification Exercise</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Write down a list of values that resonate with you, then narrow them down to your top five. For each value, write a sentence about what it means to you and how you can embody it in your daily life.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Test Your Values Through Action</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The true test of a value is whether you're willing to take action based on it. If you say you value health but never exercise or eat well, it might not be as important to you as you think. True values show up in your behavior.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Aligning Your Actions with Your Values</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Once you've identified your core values, the next step is to align your daily actions with them. This is where Acceptance and Commitment Therapy (ACT) principles become particularly valuable:
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Practice Values-Based Decision Making</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              When facing a decision, large or small, ask yourself: "Which option best aligns with my core values?" This simple question can cut through confusion and help you make choices you won't regret.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Set Values-Based Goals</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Instead of setting goals based solely on external markers of success, create goals that allow you to live more fully in alignment with your values. If connection is a core value, a goal might be to have meaningful one-on-one time with loved ones each week.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Notice and Adjust</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Regularly check in with yourself to assess whether your actions align with your values. When you notice a misalignment, approach it with curiosity rather than judgment, and gently course-correct.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Navigating Values Conflicts</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Sometimes your values may seem to conflict with each other or with external demands. For example, you might value both family time and career achievement. The key is to find creative ways to honor multiple values rather than seeing them as either/or choices.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Remember that living by your values doesn't mean being rigid. It's about making conscious choices that feel authentic to who you are, while remaining flexible in how you express those values in different contexts.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Role of ACT Coaching</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              An ACT coach can help you clarify your values, identify where you might be stuck or avoiding, and create a practical plan for living more in alignment with what matters most to you. Through guided exercises and compassionate support, coaching provides a structured way to explore and embody your values.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Moving Forward</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Understanding and living by your values is an ongoing journey, not a destination. As you grow and change, your understanding of your values may deepen and evolve. The important thing is to keep checking in, staying curious, and making choices that feel true to who you are.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              In challenging times, your values are your anchor. They remind you of what's truly important and guide you toward actions that bring meaning and fulfillment, even when circumstances are difficult. By taking time to understand and honor your values, you create a foundation for resilience, authenticity, and lasting well-being.
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
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-white font-bold text-lg">ST</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Sarah Thompson</p>
                <p className="text-sm text-gray-600">Lead coach, ACT Coaching for Life</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
