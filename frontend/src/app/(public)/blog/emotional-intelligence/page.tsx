"use client";

import { motion } from "framer-motion";
import { Facebook, Linkedin, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import NavbarLandingPage from "@/components/NavbarLandingPage";

export default function EmotionalIntelligenceArticle() {
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
            <span className="text-gray-900">Emotional intelligence in the workplace</span>
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
                Emotional intelligence in the workplace
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 text-lg mb-6"
              >
                Master the essential skill that transforms professional relationships and leadership effectiveness
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
                  <span className="text-gray-900 font-medium">November 9, 2025</span>
                </div>
                <div>
                  <span className="text-gray-500">Reviewed by: </span>
                  <span className="text-gray-900 font-medium">Sarah Thompson</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-gray-600 text-white text-xs font-medium px-3 py-1.5 rounded">
                    Leadership
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
                  src="/images/why-coaching-3.png"
                  alt="Emotional intelligence in the workplace"
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
              Emotional intelligence (EI) has become one of the most sought-after skills in today's workplace. It's no longer enough to simply be technically proficient or intellectually sharp. The ability to understand, manage, and effectively use emotions—both your own and others'—is crucial for success in any professional environment.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What Is Emotional Intelligence?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Emotional intelligence is the capacity to recognize, understand, and manage your own emotions while also being attuned to the emotions of others. It involves four key components:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Self-awareness:</strong> Recognizing and understanding your own emotions and how they affect your thoughts and behavior</li>
              <li><strong>Self-management:</strong> Controlling impulsive feelings and behaviors, managing your emotions in healthy ways, and adapting to changing circumstances</li>
              <li><strong>Social awareness:</strong> Understanding the emotions, needs, and concerns of other people, picking up on emotional cues, and feeling comfortable socially</li>
              <li><strong>Relationship management:</strong> Developing and maintaining good relationships, communicating clearly, inspiring and influencing others, working well in a team, and managing conflict</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why EI Matters in the Workplace</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Enhanced Leadership Effectiveness</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Leaders with high emotional intelligence create more engaged, motivated teams. They can read the room, adjust their communication style, and respond to team members' needs effectively. They inspire trust and loyalty because people feel understood and valued.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Improved Team Collaboration</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Teams with emotionally intelligent members communicate more openly, resolve conflicts more constructively, and work together more effectively. When people can understand and manage their emotional reactions, they're better equipped to navigate the complexities of team dynamics.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Better Stress Management</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The modern workplace is full of stressors. Employees with high EI can recognize when stress is building, understand what's triggering it, and take proactive steps to manage it before it becomes overwhelming.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Enhanced Customer Relations</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Whether you're in sales, customer service, or any client-facing role, emotional intelligence helps you understand customer needs, handle complaints gracefully, and build stronger, more trusting relationships.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Developing Your Emotional Intelligence</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Practice Self-Reflection</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Take time each day to check in with yourself. What emotions are you experiencing? What triggered them? How did you respond? This regular practice builds self-awareness, the foundation of emotional intelligence.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Try keeping an emotion journal where you note:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>What happened (the situation)</li>
              <li>What you felt</li>
              <li>How you responded</li>
              <li>What you learned</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Pause Before Reacting</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              When faced with a challenging situation or person, resist the urge to react immediately. Take a breath. Ask yourself: "What am I feeling right now? What do I want the outcome to be? How can I respond in a way that aligns with that outcome?"
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              This pause creates space for a thoughtful response rather than an emotional reaction.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Practice Active Listening</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              True active listening means focusing entirely on the other person—not just their words, but their tone, body language, and the emotions behind their message. Put away distractions, make eye contact, and ask clarifying questions to ensure you understand.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Seek Feedback</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Ask trusted colleagues, friends, or mentors for honest feedback about your emotional intelligence. How do you come across in difficult situations? How well do you read others' emotions? This outside perspective can reveal blind spots.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Develop Empathy</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Practice putting yourself in others' shoes. When a colleague is frustrated or upset, try to understand their perspective. What pressures might they be under? What needs aren't being met? Empathy doesn't mean agreeing with everyone, but it does mean trying to understand where they're coming from.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Applying EI in Common Workplace Scenarios</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Giving Critical Feedback</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              High EI means recognizing that feedback, even when constructive, can trigger defensive emotions. Deliver it with empathy, focus on specific behaviors rather than character, and create a safe space for the person to respond.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Managing Conflict</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              When conflict arises, emotionally intelligent people acknowledge the emotions involved (both their own and others'), seek to understand different perspectives, and work toward solutions that respect everyone's needs.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Leading Through Change</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Change often triggers fear and resistance. Leaders with high EI anticipate these reactions, communicate transparently about what's changing and why, and provide support as people adapt.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The ACT Connection</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Acceptance and Commitment Therapy principles align beautifully with emotional intelligence. ACT teaches us to:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Notice and accept our emotions without being controlled by them</li>
              <li>Defuse from unhelpful thoughts</li>
              <li>Connect with our values</li>
              <li>Take committed action despite discomfort</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              These skills directly support the development of emotional intelligence, particularly self-awareness and self-management.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Common EI Challenges and Solutions</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Challenge: Emotional Overwhelm</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Solution:</strong> Develop a toolkit of quick emotional regulation techniques: deep breathing, brief walks, mindfulness exercises, or talking to a trusted colleague.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Challenge: Difficulty Reading Others</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Solution:</strong> Pay more attention to nonverbal cues—facial expressions, body language, tone of voice. Ask more questions and check your understanding rather than assuming.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Challenge: Taking Things Personally</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Solution:</strong> Practice cognitive defusion. Remind yourself that others' reactions often have more to do with their own experiences and emotions than with you personally.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Long-Term Impact</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Developing emotional intelligence is a lifelong journey, not a destination. As you practice these skills, you'll likely notice improvements in your professional relationships, your ability to handle stress, your leadership effectiveness, and your overall workplace satisfaction.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              The investment in developing your EI pays dividends not just in career advancement but in the quality of your daily work experience and relationships. In an increasingly automated world, emotional intelligence remains uniquely human—and uniquely valuable.
            </p>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-cyan-50 rounded-lg border border-cyan-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Develop Your Leadership Skills</h3>
              <p className="text-gray-700 mb-6">
                Work with an ACT coach to enhance your emotional intelligence and become a more effective leader.
              </p>
              <a href="/individual-coaching">
                <button className="px-6 py-3 bg-teal-500 text-white font-medium rounded hover:bg-teal-600 transition-colors">
                  Start Your Journey
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
