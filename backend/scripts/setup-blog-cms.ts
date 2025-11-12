/**
 * Setup script for Blog CMS
 * 1. Checks if blog_posts table exists
 * 2. Provides migration instructions if needed
 * 3. Imports blog posts
 */

import { supabase } from '../src/lib/supabase';
import * as fs from 'fs';
import * as path from 'path';

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
    content: `<p class="text-gray-700 leading-relaxed mb-6">In times of uncertainty and challenge, understanding and living by your core values becomes more important than ever. Values serve as an internal compass, guiding your decisions and helping you navigate through difficult situations with clarity and purpose.</p><h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">What Are Personal Values?</h2><p class="text-gray-700 leading-relaxed mb-6">Personal values are the fundamental beliefs and principles that matter most to you. They represent what you stand for and what gives your life meaning and direction. Unlike goals, which are specific achievements you work towards, values are ongoing qualities you want to embody in how you live your life.</p><p class="text-gray-700 leading-relaxed mb-6">Common personal values include:</p><ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2"><li>Integrity and honesty</li><li>Compassion and kindness</li><li>Growth and learning</li><li>Connection and relationships</li><li>Autonomy and independence</li><li>Creativity and self-expression</li><li>Health and well-being</li></ul><h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Why Values Matter in Challenging Times</h2><p class="text-gray-700 leading-relaxed mb-6">During difficult periods, it's easy to lose sight of what truly matters to you. Stress, anxiety, and external pressures can push you to make decisions that don't align with your core beliefs. This misalignment often leads to increased stress, dissatisfaction, and a sense of being lost.</p><p class="text-gray-700 leading-relaxed mb-6">When you're grounded in your values, you have a reliable framework for making decisions, even when the path forward isn't clear. Values provide stability and meaning when everything else feels uncertain.</p><h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Moving Forward</h2><p class="text-gray-700 leading-relaxed mb-6">Understanding and living by your values is an ongoing journey, not a destination. As you grow and change, your understanding of your values may deepen and evolve. The important thing is to keep checking in, staying curious, and making choices that feel true to who you are.</p><p class="text-gray-700 leading-relaxed mb-6">In challenging times, your values are your anchor. They remind you of what's truly important and guide you toward actions that bring meaning and fulfillment, even when circumstances are difficult.</p>`
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
    content: `<p class="text-gray-700 leading-relaxed mb-6">Emotional intelligence (EI) has become one of the most sought-after skills in today's workplace. It's no longer enough to simply be technically proficient or intellectually sharp. The ability to understand, manage, and effectively use emotions—both your own and others'—is crucial for success in any professional environment.</p><h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">What Is Emotional Intelligence?</h2><p class="text-gray-700 leading-relaxed mb-6">Emotional intelligence is the capacity to recognize, understand, and manage your own emotions while also being attuned to the emotions of others. It involves four key components:</p><ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2"><li><strong>Self-awareness:</strong> Recognizing and understanding your own emotions and how they affect your thoughts and behavior</li><li><strong>Self-management:</strong> Controlling impulsive feelings and behaviors, managing your emotions in healthy ways, and adapting to changing circumstances</li><li><strong>Social awareness:</strong> Understanding the emotions, needs, and concerns of other people, picking up on emotional cues, and feeling comfortable socially</li><li><strong>Relationship management:</strong> Developing and maintaining good relationships, communicating clearly, inspiring and influencing others, working well in a team, and managing conflict</li></ul><h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Why EI Matters in the Workplace</h2><h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Enhanced Leadership Effectiveness</h3><p class="text-gray-700 leading-relaxed mb-6">Leaders with high emotional intelligence create more engaged, motivated teams. They can read the room, adjust their communication style, and respond to team members' needs effectively. They inspire trust and loyalty because people feel understood and valued.</p><h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Improved Team Collaboration</h3><p class="text-gray-700 leading-relaxed mb-6">Teams with emotionally intelligent members communicate more openly, resolve conflicts more constructively, and work together more effectively. When people can understand and manage their emotional reactions, they're better equipped to navigate the complexities of team dynamics.</p><h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">The Long-Term Impact</h2><p class="text-gray-700 leading-relaxed mb-6">Developing emotional intelligence is a lifelong journey, not a destination. As you practice these skills, you'll likely notice improvements in your professional relationships, your ability to handle stress, your leadership effectiveness, and your overall workplace satisfaction.</p><p class="text-gray-700 leading-relaxed mb-6">The investment in developing your EI pays dividends not just in career advancement but in the quality of your daily work experience and relationships. In an increasingly automated world, emotional intelligence remains uniquely human—and uniquely valuable.</p>`
  }
];

async function checkTableExists(): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .select('id')
      .limit(1);

    return !error;
  } catch (error) {
    return false;
  }
}

async function importBlogPosts() {
  console.log('\n📝 Importing blog posts...\n');

  for (const post of blogPosts) {
    try {
      // Check if post already exists
      const { data: existing } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', post.slug)
        .single();

      if (existing) {
        console.log(`  ⚠️  "${post.title}" already exists. Skipping...`);
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
        console.log(`  ✅ Imported: ${post.title}`);
      }
    } catch (error: any) {
      console.error(`  ❌ Error:`, error.message);
    }
  }

  console.log('\n✨ Import completed!\n');
}

async function setup() {
  console.log('🎬 Blog CMS Setup\n');
  console.log('==========================================\n');

  // Check if table exists
  console.log('1️⃣  Checking if blog_posts table exists...');
  const tableExists = await checkTableExists();

  if (!tableExists) {
    console.log('❌ blog_posts table does not exist!\n');
    console.log('📋 Please run the migration first:\n');
    console.log('OPTION 1: Through Supabase Dashboard');
    console.log('  1. Go to: https://supabase.com/dashboard');
    console.log('  2. Select your project');
    console.log('  3. Go to SQL Editor');
    console.log('  4. Copy the SQL from: backend/migrations/create_blog_posts_table.sql');
    console.log('  5. Paste and run it\n');

    console.log('OPTION 2: Read the SQL file here:');
    const migrationPath = path.join(__dirname, '../migrations/create_blog_posts_table.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    console.log('\n' + '='.repeat(60));
    console.log(sql);
    console.log('='.repeat(60) + '\n');

    console.log('After running the migration, run this script again.');
    process.exit(1);
  }

  console.log('✅ blog_posts table exists!\n');

  // Import blog posts
  console.log('2️⃣  Importing blog posts...');
  await importBlogPosts();

  console.log('==========================================');
  console.log('🎉 Setup completed!\n');
  console.log('📍 Next steps:');
  console.log('  1. Visit: http://localhost:4000/admin/blog');
  console.log('  2. Manage your blog posts through the CMS');
  console.log('  3. Visit: http://localhost:4000/blog to see them live\n');
}

// Run setup
setup()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  });
