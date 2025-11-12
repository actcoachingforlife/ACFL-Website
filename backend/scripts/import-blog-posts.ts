/**
 * Script to import existing hardcoded blog posts into the CMS database
 *
 * Usage:
 * cd backend
 * ts-node scripts/import-blog-posts.ts
 */

import { supabase } from '../src/lib/supabase';

const blogPosts = [
  {
    title: "Understanding your values in challenging times",
    slug: "understanding-values",
    description: "Learn practical techniques to align your actions with core personal values",
    category: "Wellness",
    read_time: "5 min read",
    image: "/images/coaching-hero.png",
    author_name: "Sarah Thompson",
    author_title: "Lead coach, ACT Coaching for Life",
    author_initials: "ST",
    reviewer_name: "Sarah Thompson",
    last_updated: "2025-11-11",
    meta_description: "Learn practical techniques to align your actions with core personal values through ACT principles",
    is_published: true,
    content: `
      <p class="text-gray-700 leading-relaxed mb-6">
        In times of uncertainty and challenge, understanding and living by your core values becomes more important than ever. Values serve as an internal compass, guiding your decisions and helping you navigate through difficult situations with clarity and purpose.
      </p>

      <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">What Are Personal Values?</h2>
      <p class="text-gray-700 leading-relaxed mb-6">
        Personal values are the fundamental beliefs and principles that matter most to you. They represent what you stand for and what gives your life meaning and direction. Unlike goals, which are specific achievements you work towards, values are ongoing qualities you want to embody in how you live your life.
      </p>

      <p class="text-gray-700 leading-relaxed mb-6">
        Common personal values include:
      </p>
      <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Integrity and honesty</li>
        <li>Compassion and kindness</li>
        <li>Growth and learning</li>
        <li>Connection and relationships</li>
        <li>Autonomy and independence</li>
        <li>Creativity and self-expression</li>
        <li>Health and well-being</li>
      </ul>

      <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Why Values Matter in Challenging Times</h2>
      <p class="text-gray-700 leading-relaxed mb-6">
        During difficult periods, it's easy to lose sight of what truly matters to you. Stress, anxiety, and external pressures can push you to make decisions that don't align with your core beliefs. This misalignment often leads to increased stress, dissatisfaction, and a sense of being lost.
      </p>

      <p class="text-gray-700 leading-relaxed mb-6">
        When you're grounded in your values, you have a reliable framework for making decisions, even when the path forward isn't clear. Values provide stability and meaning when everything else feels uncertain.
      </p>

      <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Practical Steps to Identify Your Core Values</h2>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Reflect on Peak Experiences</h3>
      <p class="text-gray-700 leading-relaxed mb-6">
        Think about moments in your life when you felt most fulfilled, energized, and authentic. What were you doing? Who were you with? What values were you honoring in those moments?
      </p>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Notice What Bothers You</h3>
      <p class="text-gray-700 leading-relaxed mb-6">
        Your frustrations and irritations often point to values that aren't being honored. If you feel upset when someone is dishonest, integrity is likely one of your core values. If you're frustrated by injustice, fairness might be central to who you are.
      </p>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Complete a Values Clarification Exercise</h3>
      <p class="text-gray-700 leading-relaxed mb-6">
        Write down a list of values that resonate with you, then narrow them down to your top five. For each value, write a sentence about what it means to you and how you can embody it in your daily life.
      </p>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Test Your Values Through Action</h3>
      <p class="text-gray-700 leading-relaxed mb-6">
        The true test of a value is whether you're willing to take action based on it. If you say you value health but never exercise or eat well, it might not be as important to you as you think. True values show up in your behavior.
      </p>

      <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Moving Forward</h2>
      <p class="text-gray-700 leading-relaxed mb-6">
        Understanding and living by your values is an ongoing journey, not a destination. As you grow and change, your understanding of your values may deepen and evolve. The important thing is to keep checking in, staying curious, and making choices that feel true to who you are.
      </p>

      <p class="text-gray-700 leading-relaxed mb-6">
        In challenging times, your values are your anchor. They remind you of what's truly important and guide you toward actions that bring meaning and fulfillment, even when circumstances are difficult.
      </p>
    `
  },
  {
    title: "Emotional intelligence in the workplace",
    slug: "emotional-intelligence",
    description: "Develop critical skills for effective communication and team performance",
    category: "Leadership",
    read_time: "6 min read",
    image: "/images/why-coaching-3.png",
    author_name: "ACT Coaching Team",
    author_title: "Lead coach, ACT Coaching for Life",
    author_initials: "ACT",
    reviewer_name: "ACT Coaching Team",
    last_updated: "2025-11-11",
    meta_description: "Learn how to develop emotional intelligence for workplace success",
    is_published: true,
    content: `
      <p class="text-gray-700 leading-relaxed mb-6">
        Emotional intelligence (EI) has become one of the most sought-after skills in today's workplace. It's no longer enough to simply be technically proficient or intellectually sharp. The ability to understand, manage, and effectively use emotions—both your own and others'—is crucial for success in any professional environment.
      </p>

      <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">What Is Emotional Intelligence?</h2>
      <p class="text-gray-700 leading-relaxed mb-6">
        Emotional intelligence is the capacity to recognize, understand, and manage your own emotions while also being attuned to the emotions of others. It involves four key components:
      </p>

      <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li><strong>Self-awareness:</strong> Recognizing and understanding your own emotions and how they affect your thoughts and behavior</li>
        <li><strong>Self-management:</strong> Controlling impulsive feelings and behaviors, managing your emotions in healthy ways, and adapting to changing circumstances</li>
        <li><strong>Social awareness:</strong> Understanding the emotions, needs, and concerns of other people, picking up on emotional cues, and feeling comfortable socially</li>
        <li><strong>Relationship management:</strong> Developing and maintaining good relationships, communicating clearly, inspiring and influencing others, working well in a team, and managing conflict</li>
      </ul>

      <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Why EI Matters in the Workplace</h2>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Enhanced Leadership Effectiveness</h3>
      <p class="text-gray-700 leading-relaxed mb-6">
        Leaders with high emotional intelligence create more engaged, motivated teams. They can read the room, adjust their communication style, and respond to team members' needs effectively. They inspire trust and loyalty because people feel understood and valued.
      </p>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Improved Team Collaboration</h3>
      <p class="text-gray-700 leading-relaxed mb-6">
        Teams with emotionally intelligent members communicate more openly, resolve conflicts more constructively, and work together more effectively. When people can understand and manage their emotional reactions, they're better equipped to navigate the complexities of team dynamics.
      </p>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Better Stress Management</h3>
      <p class="text-gray-700 leading-relaxed mb-6">
        The modern workplace is full of stressors. Employees with high EI can recognize when stress is building, understand what's triggering it, and take proactive steps to manage it before it becomes overwhelming.
      </p>

      <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Developing Your Emotional Intelligence</h2>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Practice Self-Reflection</h3>
      <p class="text-gray-700 leading-relaxed mb-6">
        Take time each day to check in with yourself. What emotions are you experiencing? What triggered them? How did you respond? This regular practice builds self-awareness, the foundation of emotional intelligence.
      </p>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Pause Before Reacting</h3>
      <p class="text-gray-700 leading-relaxed mb-6">
        When faced with a challenging situation or person, resist the urge to react immediately. Take a breath. Ask yourself: "What am I feeling right now? What do I want the outcome to be? How can I respond in a way that aligns with that outcome?"
      </p>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Practice Active Listening</h3>
      <p class="text-gray-700 leading-relaxed mb-6">
        True active listening means focusing entirely on the other person—not just their words, but their tone, body language, and the emotions behind their message. Put away distractions, make eye contact, and ask clarifying questions to ensure you understand.
      </p>

      <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">The Long-Term Impact</h2>
      <p class="text-gray-700 leading-relaxed mb-6">
        Developing emotional intelligence is a lifelong journey, not a destination. As you practice these skills, you'll likely notice improvements in your professional relationships, your ability to handle stress, your leadership effectiveness, and your overall workplace satisfaction.
      </p>

      <p class="text-gray-700 leading-relaxed mb-6">
        The investment in developing your EI pays dividends not just in career advancement but in the quality of your daily work experience and relationships. In an increasingly automated world, emotional intelligence remains uniquely human—and uniquely valuable.
      </p>
    `
  }
];

async function importBlogPosts() {
  console.log('Starting blog posts import...');

  for (const post of blogPosts) {
    try {
      console.log(`\nImporting: ${post.title}`);

      // Check if post already exists
      const { data: existing } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', post.slug)
        .single();

      if (existing) {
        console.log(`  ⚠️  Post with slug "${post.slug}" already exists. Skipping...`);
        continue;
      }

      // Insert the blog post
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(post)
        .select()
        .single();

      if (error) {
        console.error(`  ❌ Error importing "${post.title}":`, error.message);
      } else {
        console.log(`  ✅ Successfully imported: ${post.title}`);
      }
    } catch (error) {
      console.error(`  ❌ Unexpected error:`, error);
    }
  }

  console.log('\n✨ Import completed!');
}

// Run the import
importBlogPosts()
  .then(() => {
    console.log('\n🎉 All done! You can now manage these posts through the CMS at /admin/blog');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  });
