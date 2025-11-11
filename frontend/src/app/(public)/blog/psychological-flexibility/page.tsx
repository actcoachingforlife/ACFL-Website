"use client";

import { motion } from "framer-motion";
import { Facebook, Linkedin, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import NavbarLandingPage from "@/components/NavbarLandingPage";

export default function PsychologicalFlexibilityArticle() {
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
            <span className="text-gray-900">Building psychological flexibility</span>
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
                Building psychological flexibility through ACT
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 text-lg mb-6"
              >
                Discover how to adapt to life's challenges while staying aligned with your values
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
                  <span className="text-gray-900 font-medium">November 7, 2025</span>
                </div>
                <div>
                  <span className="text-gray-500">Reviewed by: </span>
                  <span className="text-gray-900 font-medium">Sarah Thompson</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-gray-600 text-white text-xs font-medium px-3 py-1.5 rounded">
                    Stress Management
                  </span>
                  <span className="text-gray-600">7 min read</span>
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
                  src="/images/why-coaching-5.png"
                  alt="Building psychological flexibility through ACT"
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
              Psychological flexibility—the ability to stay present, open up to difficult emotions, and take action guided by your values—is the cornerstone of Acceptance and Commitment Therapy (ACT). It's what allows us to navigate life's inevitable challenges with resilience and purpose, rather than getting stuck in avoidance or struggle.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What Is Psychological Flexibility?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Psychological flexibility is the capacity to be fully present in the moment, open to whatever thoughts and feelings arise, and to choose actions based on your values even when facing difficulty. It's not about eliminating pain or negative emotions—it's about changing your relationship with them so they don't control your behavior.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Think of it as mental agility: the ability to adapt your thinking and behavior to fit the situation at hand, rather than rigidly following unhelpful patterns.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Six Core Processes of ACT</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              ACT builds psychological flexibility through six interconnected processes:
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Instead of struggling against uncomfortable thoughts, feelings, or sensations, acceptance means making room for them. It's acknowledging "This is what I'm experiencing right now" without trying to change, suppress, or avoid it.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Example:</strong> Rather than fighting anxiety before a presentation, you acknowledge it: "I notice anxiety showing up. That's okay—it makes sense given the situation."
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Cognitive Defusion</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              This is about changing your relationship with your thoughts. Instead of believing every thought as truth, defusion helps you see thoughts as just mental events—words and images your mind produces.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Technique:</strong> When you think "I'm a failure," try adding "I'm having the thought that..." before it. This creates distance between you and the thought.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Present Moment Awareness</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Being psychologically present means paying attention to what's happening right now, rather than being lost in worries about the future or regrets about the past.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Practice:</strong> During conversations, notice when your mind wanders to planning what to say next. Gently bring your attention back to truly listening.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Self-as-Context</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              This is recognizing that you are not your thoughts, feelings, or experiences—you are the awareness that notices them. It's the perspective from which you observe your inner world.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              This perspective helps you realize that no matter what thoughts or feelings arise, there's a stable "you" that remains constant—the observer.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Values</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Values are your chosen life directions—what you want to stand for, what gives your life meaning. Unlike goals (which can be achieved), values are ongoing qualities you embody.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Examples:</strong> Being a loving partner, contributing to your community, pursuing growth and learning, living authentically.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Committed Action</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              This means taking concrete steps guided by your values, even when it's uncomfortable. It's about doing what matters, not just what feels good in the moment.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Example:</strong> If you value health but feel tired, committed action might mean going for a walk anyway, because it aligns with what matters to you.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why Psychological Inflexibility Causes Suffering</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              When we lack psychological flexibility, we often fall into these patterns:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Experiential avoidance:</strong> Trying to escape or suppress uncomfortable feelings, which often makes them stronger</li>
              <li><strong>Cognitive fusion:</strong> Believing our thoughts are literal truths rather than mental events</li>
              <li><strong>Being stuck in the past or future:</strong> Missing what's happening now because we're ruminating or worrying</li>
              <li><strong>Attachment to the conceptualized self:</strong> Rigidly defining ourselves ("I'm just an anxious person") in limiting ways</li>
              <li><strong>Lack of values clarity:</strong> Living on autopilot rather than intentionally</li>
              <li><strong>Inaction or impulsive behavior:</strong> Either avoiding what matters or acting without consideration of values</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              These patterns keep us stuck in cycles of suffering, even when we're trying hard to feel better.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Practical Ways to Build Psychological Flexibility</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Start with Small Moments of Acceptance</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              When discomfort arises, practice this: "Can I make space for this feeling? Can I let it be here without needing to fix it right now?" Even five seconds of acceptance builds the skill.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Practice Thought Labeling</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Notice when unhelpful thoughts arise and simply label them: "That's a judging thought," "That's a worry thought," "That's a planning thought." This creates distance without trying to change the thought.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Do a Daily Values Check-In</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Each evening, ask yourself: "Did I take any actions today aligned with my values? Where did I let fear or avoidance drive my choices?" Be curious, not judgmental.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Use the 5-4-3-2-1 Grounding Technique</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              When you're caught in rumination or worry, bring yourself to the present by noticing: 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, 1 thing you can taste.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Take One Small Values-Based Action Daily</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Choose one action each day that aligns with your values, even if it's tiny. Text a friend you've been meaning to reach out to. Take a five-minute walk. Express appreciation to someone. Small actions build momentum.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Psychological Flexibility in Real Life</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">At Work</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your boss sends a critical email. Instead of spiraling into "I'm terrible at my job" (fusion) or avoiding the issue (experiential avoidance), you notice the anxiety, acknowledge it's there, and respond professionally based on your values of competence and integrity.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">In Relationships</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your partner does something that annoys you. Rather than reacting automatically, you pause, notice your irritation, and choose a response aligned with your values of kindness and connection—maybe addressing it calmly or letting it go if it's minor.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">With Personal Goals</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You want to start exercising but feel unmotivated. Psychological flexibility means accepting the lack of motivation (it doesn't have to be there for you to act) and doing the workout anyway because you value health.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Common Obstacles and Solutions</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Obstacle: "Acceptance feels like giving up"</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Solution:</strong> Acceptance isn't resignation. It's acknowledging reality so you can respond effectively. You can accept that you feel anxious while still taking action that matters to you.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Obstacle: "I don't know what my values are"</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Solution:</strong> Start with what bothers you—our frustrations often point to values not being honored. Also ask: "What do I want my life to be about?" and "At my funeral, what would I want people to say about how I lived?"
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Obstacle: "I keep getting hooked by thoughts"</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Solution:</strong> That's normal! The goal isn't to never get hooked, but to notice sooner and unhook more quickly. Each time you notice, you're building the skill.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Long-Term Benefits</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Research shows that psychological flexibility is associated with:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Reduced anxiety and depression</li>
              <li>Better stress management</li>
              <li>Improved relationships</li>
              <li>Greater life satisfaction and well-being</li>
              <li>Enhanced work performance</li>
              <li>More resilience in facing challenges</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              The beautiful thing about psychological flexibility is that it's a skill, not a trait. With practice, anyone can develop it, regardless of their starting point.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Moving Forward</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Building psychological flexibility is a lifelong practice, not a destination. There will be days when you get caught in old patterns—and that's okay. Each moment offers a new opportunity to practice acceptance, defusion, presence, and values-based action.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Remember: You don't need to be perfectly flexible to live a meaningful life. Even small increases in flexibility can create significant changes in your well-being and relationships.
            </p>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-cyan-50 rounded-lg border border-cyan-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Develop Your Psychological Flexibility</h3>
              <p className="text-gray-700 mb-6">
                Work with an ACT coach to build these essential skills and navigate life's challenges with greater ease and purpose.
              </p>
              <a href="/individual-coaching">
                <button className="px-6 py-3 bg-teal-500 text-white font-medium rounded hover:bg-teal-600 transition-colors">
                  Start Your ACT Journey
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
