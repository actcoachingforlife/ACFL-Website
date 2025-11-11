"use client";

import { motion } from "framer-motion";
import { Facebook, Linkedin, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import NavbarLandingPage from "@/components/NavbarLandingPage";

export default function CommittedActionArticle() {
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
            <span className="text-gray-900">Taking committed action</span>
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
                Taking committed action: Moving toward what matters most
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 text-lg mb-6"
              >
                Transform your life by aligning your actions with your deepest values, even when it's difficult
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
                  <span className="text-gray-900 font-medium">November 5, 2025</span>
                </div>
                <div>
                  <span className="text-gray-500">Reviewed by: </span>
                  <span className="text-gray-900 font-medium">Sarah Thompson</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-gray-600 text-white text-xs font-medium px-3 py-1.5 rounded">
                    Personal Growth
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
                  src="/images/why-coaching-4.png"
                  alt="Taking committed action"
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
              Understanding your values, accepting difficult emotions, and defusing from unhelpful thoughts are all important—but none of them create change in your life unless you take action. Committed action, a core component of Acceptance and Commitment Therapy (ACT), is where the rubber meets the road. It's about doing what matters, even when it's uncomfortable.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What Is Committed Action?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Committed action means taking concrete, values-based steps consistently over time, regardless of what thoughts, feelings, or obstacles show up. It's not about motivation, readiness, or perfect conditions—it's about commitment to a valued direction.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Key characteristics of committed action:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Values-guided:</strong> Your actions are chosen because they align with what's important to you</li>
              <li><strong>Willingness-based:</strong> You're willing to experience discomfort in service of what matters</li>
              <li><strong>Flexible:</strong> When something doesn't work, you adjust and try again</li>
              <li><strong>Persistent:</strong> You keep going despite setbacks or difficult emotions</li>
              <li><strong>Action-focused:</strong> Emphasis is on what you do, not just how you think or feel</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Committed Action vs. Impulsive Action</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Not all action is committed action. There's a crucial difference:
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Impulsive action</strong> is driven by trying to escape or avoid difficult emotions. You act to feel better in the moment, not because the action aligns with your values.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Example:</strong> Quitting a job suddenly because you're anxious, without considering whether this aligns with your values or long-term goals.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Committed action</strong> is chosen because it moves you toward your values, even if it brings up uncomfortable feelings in the short term.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Example:</strong> Leaving a job that doesn't align with your values after thoughtful consideration, even though change is scary.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The SMART Framework for Committed Action</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              ACT uses the SMART acronym, but with a values-based twist:
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Specific</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Define exactly what you'll do, when, and where. Vague intentions ("I'll exercise more") rarely lead to action. Specific commitments ("I'll walk for 20 minutes on Monday, Wednesday, and Friday at 7 AM") do.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Meaningful</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The action must connect to your values. Why does this matter to you? If you can't answer that question, you might be pursuing someone else's goal.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Adaptive</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Be willing to adjust your approach when something isn't working. Committed action is flexible, not rigid. If your 7 AM walks aren't happening, maybe evening walks work better.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Realistic</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Start where you are, not where you wish you were. Committing to run a marathon tomorrow when you haven't exercised in years isn't realistic. Committing to walk 10 minutes today is.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Time-framed</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Give your actions a timeframe. "Someday I'll..." rarely happens. "This week I'll..." has a much better chance.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Overcoming Barriers to Committed Action</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Barrier: "I don't feel motivated"</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Truth:</strong> Motivation often follows action, not the other way around. You don't have to feel motivated to take action. In fact, waiting for motivation is a common avoidance strategy.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Solution:</strong> Ask yourself, "If motivation showed up, what would I do?" Then do that, without waiting for the feeling.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Barrier: "I'm too anxious/scared/tired"</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Truth:</strong> Committed action isn't about feeling comfortable. It's about being willing to feel uncomfortable while doing what matters.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Solution:</strong> Practice willingness. "I notice I feel anxious AND I can still send that email." The "AND" is crucial—both things can be true at once.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Barrier: "What if I fail?"</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Truth:</strong> You might fail at achieving a specific outcome, but you can't fail at living by your values. The attempt itself is an expression of your values.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Solution:</strong> Reframe "failure" as feedback. Each attempt teaches you something that helps you adjust your approach.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Barrier: "I've tried before and it didn't work"</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Truth:</strong> Past attempts that didn't pan out don't predict future ones. Plus, you likely learned something from those experiences.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Solution:</strong> Ask, "What can I do differently this time?" Maybe the goal was too big, or you didn't have support, or circumstances were different. Apply those lessons now.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Building Your Action Plan</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 1: Connect to Your Values</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Before identifying actions, clarify your values. What do you want your life to be about? What kind of person do you want to be? In what domains of life do you want to focus (relationships, work, health, personal growth, etc.)?
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 2: Identify Small, Immediate Actions</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              For each value, identify actions you can take this week. Keep them small enough that you're likely to do them even when obstacles arise.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Value: Connection</strong><br />
              Action: Text one friend I haven't connected with in a while to see how they're doing.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Value: Health</strong><br />
              Action: Prepare a healthy breakfast three mornings this week.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 3: Anticipate Obstacles</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              What might get in the way? Difficult emotions? Unhelpful thoughts? External circumstances? For each obstacle, create an "if-then" plan:
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              "If I feel too tired to walk after work, then I'll walk for just 5 minutes and see how I feel."<br />
              "If my mind says 'This won't make a difference,' then I'll thank my mind and do it anyway."
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 4: Take Action and Reflect</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Do what you committed to, regardless of how you feel. Afterward, reflect:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Did I do what I committed to?</li>
              <li>If yes, how does that feel? Did it connect me to my values?</li>
              <li>If no, what got in the way? What can I learn from this?</li>
              <li>What will I commit to next?</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Committed Action in Different Life Domains</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Relationships</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you value connection, committed action might mean reaching out even when you're anxious about being vulnerable, having difficult conversations instead of avoiding conflict, or showing up consistently for people who matter to you.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Career</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you value growth and contribution, committed action might look like applying for stretch assignments despite impostor syndrome, speaking up in meetings even when nervous, or pursuing further education while managing other responsibilities.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Health</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you value vitality, committed action might mean moving your body regularly regardless of motivation, choosing nourishing foods even when stressed, or prioritizing sleep despite a busy schedule.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Personal Growth</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you value learning, committed action might involve dedicating time to read or learn even when you could be relaxing, seeking feedback even when criticism is uncomfortable, or trying new things despite fear of looking foolish.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">When Committed Action Gets Difficult</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              There will be times when committed action feels impossible. Your inner experience might be screaming "STOP!" This is when ACT's other skills become crucial:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Acceptance:</strong> Make room for the discomfort without needing it to go away first</li>
              <li><strong>Defusion:</strong> Notice unhelpful thoughts ("I can't do this") without being controlled by them</li>
              <li><strong>Present moment:</strong> Focus on this one step, right now, not the entire overwhelming journey</li>
              <li><strong>Self-as-context:</strong> Recognize that you are more than these temporary thoughts and feelings</li>
              <li><strong>Values:</strong> Reconnect to why this matters to you</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Compound Effect of Small Actions</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              One small action might not seem like much. But small actions, taken consistently in valued directions, accumulate into profound life changes. The person who texts one friend per week builds a network of connection. The person who walks 10 minutes daily builds strength and stamina. The person who writes one paragraph each morning eventually writes a book.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Committed action isn't about perfection. It's about persistence. It's about getting up one more time than you fall down. It's about choosing what matters over what's comfortable, again and again.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Your Next Step</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Don't wait to feel ready. Don't wait for the perfect plan. Don't wait until fear or doubt disappear. They might never show up, and you don't need them to.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Right now, identify one small action aligned with your values that you can take today. Not tomorrow. Not next week. Today. And then do it.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              That's committed action. And it's how you build a meaningful life, one choice at a time.
            </p>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-cyan-50 rounded-lg border border-cyan-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Build Your Committed Action Practice</h3>
              <p className="text-gray-700 mb-6">
                Work with an ACT coach to develop a personalized action plan that aligns with your deepest values and creates lasting change.
              </p>
              <a href="/individual-coaching">
                <button className="px-6 py-3 bg-teal-500 text-white font-medium rounded hover:bg-teal-600 transition-colors">
                  Take Your First Step
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
