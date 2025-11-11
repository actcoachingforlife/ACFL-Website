"use client";

import { motion } from "framer-motion";
import { Facebook, Linkedin, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import NavbarLandingPage from "@/components/NavbarLandingPage";

export default function LifeGoalsArticle() {
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
            <span className="text-gray-900">Setting meaningful life goals</span>
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
                Setting meaningful life goals
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 text-lg mb-6"
              >
                Learn how to create purpose-driven objectives that align with your authentic values
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
                  <span className="text-gray-900 font-medium">November 8, 2025</span>
                </div>
                <div>
                  <span className="text-gray-500">Reviewed by: </span>
                  <span className="text-gray-900 font-medium">Sarah Thompson</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-gray-600 text-white text-xs font-medium px-3 py-1.5 rounded">
                    Personal Growth
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
                  src="/images/why-coaching-4.png"
                  alt="Setting meaningful life goals"
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
              Setting goals is one thing; setting meaningful goals that truly resonate with who you are and what you value is something else entirely. Too often, we adopt goals based on external expectations or societal standards, only to find that achieving them leaves us feeling empty or unfulfilled. The key to lasting satisfaction and genuine success lies in creating purpose-driven objectives that align with your core values and authentic self.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Difference Between Goals and Values</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Before diving into goal-setting, it's important to understand the distinction between goals and values:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Goals</strong> are specific achievements or outcomes you want to reach—things you can complete and check off a list</li>
              <li><strong>Values</strong> are ongoing qualities you want to embody and directions you want to move in—they're never "finished"</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              The most meaningful goals emerge from your values. When you set goals that serve your values, you create a life that feels authentic and purposeful, even before you achieve those specific outcomes.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why So Many Goals Fail</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">They're Not Really Your Goals</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You've adopted goals because they sound impressive, because others expect them of you, or because society tells you they're what success looks like. But if a goal doesn't connect to something you truly value, your motivation will fade when challenges arise.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">They're Too Vague or Too Rigid</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              "Be healthier" is too vague to be actionable. "Lose exactly 20 pounds by March 1st" might be too rigid, setting you up for an all-or-nothing mentality that can lead to giving up if you fall slightly short.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">They Focus Only on Outcomes</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              When you're only focused on the end result, you miss the opportunity to find meaning in the journey. Plus, outcome-focused goals can leave you feeling like a failure if external circumstances prevent you from achieving them, even when you've done everything right.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Creating Values-Based Goals</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 1: Clarify Your Core Values</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Before setting any goal, get clear on your values. What qualities do you want to embody? What matters most to you? Common values include:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Connection and relationships</li>
              <li>Growth and learning</li>
              <li>Health and vitality</li>
              <li>Creativity and self-expression</li>
              <li>Contribution and service</li>
              <li>Adventure and exploration</li>
              <li>Security and stability</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 2: Ask Better Questions</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Instead of "What do I want to achieve?" ask:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>What kind of person do I want to be?</li>
              <li>What relationships do I want to build or deepen?</li>
              <li>What experiences would make my life feel rich and meaningful?</li>
              <li>If I were living by my values, what would I be doing differently?</li>
              <li>What would I regret not doing or trying?</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 3: Create Process-Oriented Goals</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Instead of solely focusing on outcomes, create goals around processes and behaviors you can control:
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Outcome-focused:</strong> "Get promoted to senior manager"<br />
              <strong>Process-focused:</strong> "Demonstrate leadership by mentoring two junior team members and leading one major project this quarter"
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              The process-focused version is within your control and allows you to live your values (leadership, contribution) regardless of the promotion outcome.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The SMART Framework, Enhanced</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The traditional SMART goals framework (Specific, Measurable, Achievable, Relevant, Time-bound) is useful, but we can enhance it with values-alignment:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Specific:</strong> What exactly will you do?</li>
              <li><strong>Measurable:</strong> How will you track progress?</li>
              <li><strong>Achievable:</strong> Is this realistic given your current circumstances?</li>
              <li><strong>Relevant:</strong> How does this connect to your core values? (This is the crucial addition)</li>
              <li><strong>Time-bound:</strong> What's your timeframe?</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Different Types of Meaningful Goals</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Growth Goals</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Focus on developing new skills, knowledge, or capacities. These goals are about becoming rather than just achieving.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Experience Goals</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Center around experiences you want to have—travel, adventures, events, or activities that align with your values.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Relationship Goals</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Focus on the quality of your connections—deepening existing relationships or building new meaningful ones.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contribution Goals</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Involve making a positive impact—how you want to contribute to your community, profession, or causes you care about.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Common Pitfalls and How to Avoid Them</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Setting Too Many Goals</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Solution:</strong> Choose 2-3 key areas to focus on at a time. It's better to make meaningful progress in a few areas than to be overwhelmed trying to transform everything at once.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Not Planning for Obstacles</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Solution:</strong> For each goal, ask "What could get in the way?" and create an if-then plan: "If [obstacle] happens, then I will [specific action]."
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Going It Alone</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Solution:</strong> Share your goals with supportive people. Consider working with a coach who can provide accountability, guidance, and encouragement.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Reviewing and Adjusting Your Goals</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Goals aren't set in stone. Life changes, priorities shift, and you grow. Schedule regular check-ins (monthly or quarterly) to assess:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Is this goal still meaningful to me?</li>
              <li>Am I making progress?</li>
              <li>What's working? What needs to change?</li>
              <li>Am I enjoying the process, or do I need to adjust my approach?</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              It's okay to modify or even abandon goals that no longer serve you. This isn't failure—it's wisdom.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Journey Is the Destination</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Perhaps the most important insight about meaningful goals is this: the real value isn't just in achieving them, but in who you become and what you learn along the way. When your goals are rooted in your values, every step you take toward them is an expression of what matters most to you.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              You don't have to wait until you achieve your goals to feel successful. When you're moving in a valued direction, you're already living a meaningful life.
            </p>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-cyan-50 rounded-lg border border-cyan-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Set Meaningful Goals?</h3>
              <p className="text-gray-700 mb-6">
                Work with an ACT coach to clarify your values and create purpose-driven goals that truly resonate with who you are.
              </p>
              <a href="/individual-coaching">
                <button className="px-6 py-3 bg-teal-500 text-white font-medium rounded hover:bg-teal-600 transition-colors">
                  Begin Your Journey
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
