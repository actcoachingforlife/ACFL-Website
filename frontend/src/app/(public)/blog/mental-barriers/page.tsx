"use client";

import { motion } from "framer-motion";
import { Facebook, Linkedin, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import NavbarLandingPage from "@/components/NavbarLandingPage";

export default function MentalBarriersArticle() {
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
            <span className="text-gray-900">Breaking through mental barriers</span>
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
                Breaking through mental barriers
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 text-lg mb-6"
              >
                Discover ACT-based strategies to overcome limiting beliefs and take committed action
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
                  <span className="text-gray-900 font-medium">November 10, 2025</span>
                </div>
                <div>
                  <span className="text-gray-500">Reviewed by: </span>
                  <span className="text-gray-900 font-medium">Sarah Thompson</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-gray-600 text-white text-xs font-medium px-3 py-1.5 rounded">
                    Mindfulness
                  </span>
                  <span className="text-gray-600">6 min read</span>
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
                  src="/images/why-coaching-2.png"
                  alt="Breaking through mental barriers"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              We all face mental barriers that hold us back from reaching our full potential. These invisible obstacles, often rooted in limiting beliefs and fear, can prevent us from pursuing our dreams, taking risks, and living authentically. Understanding and overcoming these barriers is essential for personal growth and meaningful change.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What Are Mental Barriers?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Mental barriers are psychological obstacles that prevent you from taking action or making progress toward your goals. They're the voices in your head that say "I can't," "I'm not good enough," or "What if I fail?" These barriers often feel very real and can be surprisingly powerful, even when we intellectually know they're holding us back.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Common mental barriers include:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Fear of failure or success</li>
              <li>Perfectionism and procrastination</li>
              <li>Impostor syndrome</li>
              <li>Negative self-talk and limiting beliefs</li>
              <li>Fear of judgment or rejection</li>
              <li>Past trauma or negative experiences</li>
              <li>Fixed mindset thinking</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The ACT Approach to Mental Barriers</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Acceptance and Commitment Therapy offers a unique perspective on mental barriers. Instead of trying to eliminate or control difficult thoughts and feelings, ACT teaches us to change our relationship with them. The goal isn't to get rid of mental barriers but to pursue what matters to us despite their presence.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cognitive Defusion</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              This technique helps you see thoughts as just thoughts, rather than absolute truths. When you think "I can't do this," cognitive defusion helps you recognize that this is just a thought your mind is producing, not a fact about reality. You can acknowledge the thought while still choosing to move forward.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Try this exercise: When you notice a limiting thought, say to yourself: "I'm having the thought that..." This small shift creates distance between you and the thought, making it less powerful.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Acceptance Over Control</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Many mental barriers arise from trying to control or avoid uncomfortable thoughts and feelings. Acceptance doesn't mean resignation or giving up; it means acknowledging reality as it is and choosing to act based on your values rather than your fear.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Practical Strategies for Breaking Through</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Identify Your Specific Barriers</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Take time to write down the mental barriers you face. Be specific. Instead of "I'm afraid," write "I'm afraid of being judged if I share my work" or "I'm afraid I'll disappoint people if I change careers." Understanding exactly what's holding you back is the first step to moving forward.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Challenge Your Limiting Beliefs</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Ask yourself: Is this belief absolutely true? What evidence do I have for and against it? What would I tell a friend who had this belief? Often, our limiting beliefs crumble under gentle questioning.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Take Small, Values-Based Actions</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You don't have to eliminate fear or doubt before taking action. Start with small steps aligned with your values. If public speaking terrifies you but leadership is important to you, start by speaking up in a small meeting. Build evidence that you can act despite the fear.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Practice Self-Compassion</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Be kind to yourself when facing mental barriers. Everyone has them. Treating yourself with compassion rather than harsh judgment makes it easier to acknowledge barriers without getting stuck in them.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Reframe Failure as Learning</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Many mental barriers stem from fear of failure. Adopting a growth mindset means viewing failure as valuable feedback rather than a reflection of your worth. Every "failure" is an opportunity to learn and adjust your approach.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Power of Committed Action</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              In ACT, committed action means taking steps toward what matters to you, even when mental barriers show up. It's not about waiting until you feel confident or the fear goes away. It's about acknowledging the fear and choosing to act anyway.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              This might mean:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Applying for the job even though impostor syndrome is shouting at you</li>
              <li>Starting the creative project despite perfectionist thoughts</li>
              <li>Having the difficult conversation even though you're anxious</li>
              <li>Setting a boundary even though you worry about others' reactions</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Common Pitfalls to Avoid</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Waiting for Readiness</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You'll never feel completely ready. Mental barriers will always find new reasons why "now isn't the right time." Recognize this pattern and act anyway.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">All-or-Nothing Thinking</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You don't have to overcome every barrier completely before moving forward. Progress isn't linear. Celebrate small wins and keep going.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Going It Alone</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Mental barriers can feel isolating, but you don't have to face them alone. Working with a coach or therapist can provide support, accountability, and new perspectives that make breakthrough moments possible.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Journey Forward</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Breaking through mental barriers isn't a one-time event; it's an ongoing practice. New barriers may arise as you grow and take on new challenges. That's okay. Each time you practice acknowledging a barrier and choosing to act in alignment with your values, you strengthen your ability to do so in the future.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Remember: The goal isn't to eliminate fear, doubt, or limiting thoughts. The goal is to live a rich, meaningful life despite them. Your mental barriers don't have to shrink for you to grow. You can expand around them, making room for both the discomfort and the action toward what matters most.
            </p>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-cyan-50 rounded-lg border border-cyan-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Break Through Your Barriers?</h3>
              <p className="text-gray-700 mb-6">
                Work with an ACT coach who can help you identify your mental barriers and develop practical strategies for moving forward.
              </p>
              <a href="/individual-coaching">
                <button className="px-6 py-3 bg-teal-500 text-white font-medium rounded hover:bg-teal-600 transition-colors">
                  Get Started Today
                </button>
              </a>
            </div>
          </motion.div>

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
      </article>

      <Footer />
    </div>
  );
}
