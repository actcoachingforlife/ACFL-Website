import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const blogPosts = [
  {
    title: 'Taking committed action: Moving toward what matters most',
    slug: 'committed-action',
    description: `Transform your life by aligning your actions with your deepest values, even when it's difficult`,
    content: `<p class="text-xl text-gray-700 leading-relaxed mb-6">Understanding your values, accepting difficult emotions, and defusing from unhelpful thoughts are all important—but none of them create change in your life unless you take action. Committed action, a core component of Acceptance and Commitment Therapy (ACT), is where the rubber meets the road. It's about doing what matters, even when it's uncomfortable.</p><h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">What Is Committed Action?</h2><p class="text-gray-700 leading-relaxed mb-6">Committed action means taking concrete, values-based steps consistently over time, regardless of what thoughts, feelings, or obstacles show up. It's not about motivation, readiness, or perfect conditions—it's about commitment to a valued direction.</p>`,
    category: 'Personal Growth',
    read_time: '7 min read',
    image: '/images/why-coaching-4.png',
    author_name: 'Sarah Thompson',
    author_title: 'Lead coach, ACT Coaching for Life',
    author_initials: 'ST',
    reviewer_name: 'Sarah Thompson',
    last_updated: '2025-11-05',
    meta_description: 'Learn how to take committed action aligned with your values using ACT principles for meaningful life change',
    is_published: true
  },
  {
    title: 'Mastering cognitive defusion: Practical techniques for unhooking from thoughts',
    slug: 'defusion-techniques',
    description: `Learn powerful ACT techniques to reduce the influence of unhelpful thoughts`,
    content: `<p class="text-xl text-gray-700 leading-relaxed mb-6">Our minds produce thousands of thoughts every day—some helpful, many unhelpful. The problem isn't the thoughts themselves; it's when we get "fused" with them, treating them as absolute truths that dictate our actions. Cognitive defusion, a core technique in Acceptance and Commitment Therapy, teaches us to step back from our thoughts and see them for what they really are: just words and images passing through our minds.</p><h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Understanding Cognitive Fusion</h2><p class="text-gray-700 leading-relaxed mb-6">Cognitive fusion is when we're "hooked" by our thoughts—so caught up in them that we experience them as reality rather than mental events. When fused with a thought like "I'm not good enough," we don't just think it; we believe it completely and it influences everything we do.</p>`,
    category: 'Mindfulness',
    read_time: '8 min read',
    image: '/images/why-coaching-1.png',
    author_name: 'Sarah Thompson',
    author_title: 'Lead coach, ACT Coaching for Life',
    author_initials: 'ST',
    reviewer_name: 'Sarah Thompson',
    last_updated: '2025-11-06',
    meta_description: 'Discover cognitive defusion techniques from ACT to reduce the power of unhelpful thoughts and increase psychological flexibility',
    is_published: true
  },
  {
    title: 'Setting meaningful life goals',
    slug: 'life-goals',
    description: `Learn how to create purpose-driven objectives that align with your authentic values`,
    content: `<p class="text-xl text-gray-700 leading-relaxed mb-6">Setting goals is one thing; setting meaningful goals that truly resonate with who you are and what you value is something else entirely. Too often, we adopt goals based on external expectations or societal standards, only to find that achieving them leaves us feeling empty or unfulfilled. The key to lasting satisfaction and genuine success lies in creating purpose-driven objectives that align with your core values and authentic self.</p><h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">The Difference Between Goals and Values</h2><p class="text-gray-700 leading-relaxed mb-6">Before diving into goal-setting, it's important to understand the distinction between goals and values: Goals are specific achievements or outcomes you want to reach, while Values are ongoing qualities you want to embody.</p>`,
    category: 'Personal Growth',
    read_time: '5 min read',
    image: '/images/why-coaching-4.png',
    author_name: 'Sarah Thompson',
    author_title: 'Lead coach, ACT Coaching for Life',
    author_initials: 'ST',
    reviewer_name: 'Sarah Thompson',
    last_updated: '2025-11-08',
    meta_description: 'Create values-based life goals that bring lasting fulfillment using proven ACT coaching strategies',
    is_published: true
  },
  {
    title: 'Breaking through mental barriers',
    slug: 'mental-barriers',
    description: `Discover ACT-based strategies to overcome limiting beliefs and take committed action`,
    content: `<p class="text-xl text-gray-700 leading-relaxed mb-6">Mental barriers are the invisible walls we build in our minds that keep us from pursuing what truly matters. These barriers often manifest as limiting beliefs, fear-based thoughts, or stories we tell ourselves about what's possible. Through Acceptance and Commitment Therapy (ACT), we can learn to recognize these barriers for what they are and move through them with greater ease.</p><h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Common Mental Barriers</h2><p class="text-gray-700 leading-relaxed mb-6">Mental barriers come in many forms: perfectionism that prevents us from starting, fear of failure that keeps us playing small, and beliefs about our limitations that become self-fulfilling prophecies. Understanding these patterns is the first step to breaking free.</p>`,
    category: 'Mindfulness',
    read_time: '6 min read',
    image: '/images/why-coaching-2.png',
    author_name: 'Sarah Thompson',
    author_title: 'Lead coach, ACT Coaching for Life',
    author_initials: 'ST',
    reviewer_name: 'Sarah Thompson',
    last_updated: '2025-11-10',
    meta_description: 'Break through mental barriers and limiting beliefs with ACT techniques for personal transformation',
    is_published: true
  },
  {
    title: 'Building psychological flexibility through ACT',
    slug: 'psychological-flexibility',
    description: `Discover how to adapt to life's challenges while staying aligned with your values`,
    content: `<p class="text-xl text-gray-700 leading-relaxed mb-6">Psychological flexibility is the cornerstone of mental health and wellbeing in Acceptance and Commitment Therapy (ACT). It's the ability to stay present, open up to difficult experiences, and take action aligned with your values, even when facing adversity. Unlike rigid thinking patterns that keep us stuck, psychological flexibility allows us to adapt skillfully to life's inevitable challenges.</p><h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">The Six Core Processes</h2><p class="text-gray-700 leading-relaxed mb-6">ACT identifies six interrelated processes that together create psychological flexibility: acceptance, cognitive defusion, being present, self as context, values, and committed action. Each process supports the others, creating a comprehensive approach to mental wellness.</p>`,
    category: 'Wellness',
    read_time: '7 min read',
    image: '/images/why-coaching-5.png',
    author_name: 'Sarah Thompson',
    author_title: 'Lead coach, ACT Coaching for Life',
    author_initials: 'ST',
    reviewer_name: 'Sarah Thompson',
    last_updated: '2025-11-07',
    meta_description: 'Develop psychological flexibility using ACT principles to navigate challenges while living according to your values',
    is_published: true
  }
];

async function importBlogPosts() {
  console.log('Starting blog posts import...\n');

  for (const post of blogPosts) {
    console.log(`Importing: ${post.title}...`);

    // Check if post already exists
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', post.slug)
      .single();

    if (existing) {
      console.log(`  ⚠️  Post already exists, skipping...\n`);
      continue;
    }

    // Insert the post
    const { error } = await supabase
      .from('blog_posts')
      .insert(post);

    if (error) {
      console.error(`  ❌ Error importing ${post.slug}:`, error.message);
    } else {
      console.log(`  ✅ Successfully imported!\n`);
    }
  }

  console.log('Import complete!');

  // Show summary
  const { data: allPosts, error } = await supabase
    .from('blog_posts')
    .select('title, slug, is_published')
    .order('created_at', { ascending: false });

  if (!error && allPosts) {
    console.log(`\nTotal blog posts in database: ${allPosts.length}`);
    console.log('\nPublished posts:');
    allPosts
      .filter(p => p.is_published)
      .forEach(p => console.log(`  - ${p.title} (/${p.slug})`));
  }
}

importBlogPosts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
  });
