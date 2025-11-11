"use client";

import { motion } from "framer-motion";
import { Facebook, Linkedin, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import NavbarLandingPage from "@/components/NavbarLandingPage";

export default function DefusionTechniquesArticle() {
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
            <span className="text-gray-900">Mastering cognitive defusion</span>
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
                Mastering cognitive defusion: Practical techniques for unhooking from thoughts
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 text-lg mb-6"
              >
                Learn powerful ACT techniques to reduce the influence of unhelpful thoughts
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
                  <span className="text-gray-900 font-medium">November 6, 2025</span>
                </div>
                <div>
                  <span className="text-gray-500">Reviewed by: </span>
                  <span className="text-gray-900 font-medium">Sarah Thompson</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-gray-600 text-white text-xs font-medium px-3 py-1.5 rounded">
                    Mindfulness
                  </span>
                  <span className="text-gray-600">8 min read</span>
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
                  src="/images/why-coaching-1.png"
                  alt="Mastering cognitive defusion"
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
              Our minds produce thousands of thoughts every day—some helpful, many unhelpful. The problem isn't the thoughts themselves; it's when we get "fused" with them, treating them as absolute truths that dictate our actions. Cognitive defusion, a core technique in Acceptance and Commitment Therapy, teaches us to step back from our thoughts and see them for what they really are: just words and images passing through our minds.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Understanding Cognitive Fusion</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Cognitive fusion is when we're "hooked" by our thoughts—so caught up in them that we experience them as reality rather than mental events. When fused with a thought like "I'm not good enough," we don't just think it; we believe it completely and it influences everything we do.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Signs you're fused with a thought:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>You automatically believe it's true</li>
              <li>It triggers strong emotional reactions</li>
              <li>It leads you to avoid situations or opportunities</li>
              <li>You can't see alternative perspectives</li>
              <li>Your behavior is driven by the thought, not your values</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What Is Cognitive Defusion?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Defusion means creating psychological distance from your thoughts. It's not about challenging or changing them (like cognitive restructuring in CBT), but rather about changing your relationship with them.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              When you're defused from a thought, you can observe it without automatically believing or acting on it. The thought might still be there, but it has less power over you.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Powerful Defusion Techniques</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. "I'm Having the Thought That..."</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              When a troublesome thought appears, add the prefix "I'm having the thought that..." before it.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Example:</strong><br />
              Fused thought: "I'm going to fail this presentation."<br />
              Defused: "I'm having the thought that I'm going to fail this presentation."
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Notice how this creates distance. You're not denying the thought—you're simply recognizing it as a thought your mind is producing.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Thank Your Mind</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              When an unhelpful thought shows up, simply acknowledge it with gentle humor: "Thanks, Mind, for that thought," or "There goes my mind again, trying to protect me."
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              This technique recognizes that your mind is often trying to help (even when it's not actually helpful) and creates a playful distance from the thought.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Name the Story</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Many of our thoughts form patterns—recurring stories our mind tells. Give these stories names:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>"The I'm Not Good Enough Story"</li>
              <li>"The Everyone's Judging Me Story"</li>
              <li>"The Something Bad Will Happen Story"</li>
              <li>"The It's Too Late Story"</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              When you notice these thoughts arising, simply label them: "Oh, there's the I'm Not Good Enough Story again." This helps you recognize it as a familiar pattern rather than a truth.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Sing It or Say It in a Silly Voice</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Take the troublesome thought and sing it to the tune of "Happy Birthday" or say it in a cartoon character voice (Mickey Mouse, Darth Vader, etc.).
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              This might seem silly (it is!), but it's remarkably effective at reducing the thought's emotional impact. It's hard to take a thought seriously when it's sung to a birthday tune.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Imagine Thoughts as Leaves on a Stream</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Visualize sitting beside a gentle stream. As thoughts arise, imagine placing each one on a leaf and watching it float downstream. Don't try to push the leaves away or hold onto them—just observe them floating by.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              This exercise reinforces that thoughts come and go naturally; you don't have to engage with or act on each one.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Notice the Thought's Physical Form</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Instead of engaging with the content of the thought, observe its qualities as if it were a physical object:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>What speed is it moving?</li>
              <li>What shape does it have?</li>
              <li>If it had a color, what would it be?</li>
              <li>Is it loud or quiet?</li>
              <li>Where in your mind does it seem to be located?</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              This shifts you from being caught in the thought to observing it from the outside.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Wear the Thought on a T-Shirt</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Imagine wearing a t-shirt with the troublesome thought printed on it. Would you let that t-shirt prevent you from going to a party? Meeting new people? Pursuing a goal?
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              This technique helps you see that you can carry the thought with you and still do what matters—the thought doesn't have to stop you.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. The Computer Screen Technique</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Visualize the thought appearing as text on a computer screen. Now imagine changing the font to Comic Sans, making it pink, shrinking it, making it scroll sideways, or having it bounce around the screen.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Playing with how the thought appears (rather than its content) reduces its grip on you.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">When to Use Defusion Techniques</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Defusion is most helpful when:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>You notice a thought is stopping you from doing something important</li>
              <li>You're caught in rumination or worry loops</li>
              <li>A thought is causing intense emotional distress</li>
              <li>You're about to avoid a values-aligned action because of a thought</li>
              <li>You recognize a familiar unhelpful thought pattern</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Common Mistakes to Avoid</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Mistake: Using defusion to get rid of thoughts</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Reality:</strong> Defusion isn't about eliminating thoughts. It's about changing your relationship with them. The thought might still be there—you're just not controlled by it anymore.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Mistake: Only practicing when you're calm</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Reality:</strong> Defusion works best when practiced both during calm moments and in real-time when difficult thoughts arise. Start with low-stakes practice, then use it when you really need it.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Mistake: Expecting immediate results</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Reality:</strong> Like any skill, defusion improves with practice. You might not feel dramatically different the first time you try it, but over time you'll notice thoughts have less power over you.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Defusion in Daily Life</h2>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Morning Anxiety</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You wake up and immediately think "I have so much to do; I'll never get it all done." Instead of letting this thought set the tone for your day, you notice: "There's the Overwhelm Story. Thanks, Mind. I'll start with one task at a time."
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Social Situations</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              At a networking event, you think "Everyone here is more accomplished than me; I don't belong." Rather than leaving, you recognize: "I'm having the thought that I don't belong. I can carry this thought and still introduce myself to someone new."
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Difficult Conversations</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Before a tough talk with your partner, you think "This is going to turn into a fight." You defuse: "There's the Catastrophizing Story. I don't know what will happen. I can have this thought and still speak honestly about my feelings."
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Science Behind Defusion</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Research shows that cognitive defusion techniques can:
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Reduce the believability and discomfort of negative thoughts</li>
              <li>Decrease experiential avoidance</li>
              <li>Improve psychological flexibility</li>
              <li>Reduce symptoms of anxiety and depression</li>
              <li>Increase willingness to engage in values-based behavior</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              The power of defusion lies not in changing thought content, but in fundamentally shifting how you relate to your inner experience.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Building Your Defusion Practice</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Start small. Choose one or two defusion techniques that resonate with you and practice them daily for a week. Notice what happens when you use them—not just whether the thought disappears, but whether you feel less controlled by it.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Remember, the goal isn't to become perfect at defusion. It's to develop a toolbox of techniques you can use when thoughts are getting in the way of living according to your values. Each time you practice, even imperfectly, you're building the skill.
            </p>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-cyan-50 rounded-lg border border-cyan-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Master Defusion with ACT Coaching</h3>
              <p className="text-gray-700 mb-6">
                Work with an experienced ACT coach to develop personalized defusion strategies that work for your unique thought patterns and challenges.
              </p>
              <a href="/individual-coaching">
                <button className="px-6 py-3 bg-teal-500 text-white font-medium rounded hover:bg-teal-600 transition-colors">
                  Begin Your Practice
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
