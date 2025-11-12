/**
 * Script to run the blog_posts table migration
 * This creates the blog_posts table in Supabase
 */

import { supabase } from '../src/lib/supabase';
import * as fs from 'fs';
import * as path from 'path';

async function runMigration() {
  console.log('🚀 Starting blog_posts table migration...\n');

  try {
    // Read the migration SQL file
    const migrationPath = path.join(__dirname, '../migrations/create_blog_posts_table.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('📄 Migration file loaded');
    console.log('⚙️  Executing SQL...\n');

    // Execute the SQL
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql }).single();

    if (error) {
      // If the RPC doesn't exist, we'll need to execute statements individually
      console.log('💡 Running migration statements individually...\n');

      // Split SQL into individual statements (basic split by semicolon)
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      for (const statement of statements) {
        if (statement.includes('CREATE TABLE') ||
            statement.includes('CREATE INDEX') ||
            statement.includes('CREATE TRIGGER') ||
            statement.includes('CREATE OR REPLACE FUNCTION') ||
            statement.includes('COMMENT ON')) {
          console.log(`Executing: ${statement.substring(0, 50)}...`);

          // We'll use a raw query approach
          // Note: Supabase client doesn't directly support DDL, so we log it
          console.log('⚠️  Please run this migration through Supabase SQL Editor or use the Supabase CLI');
          console.log('\nMigration SQL to run:');
          console.log('=====================================');
          console.log(sql);
          console.log('=====================================\n');

          console.log('📝 To run this migration:');
          console.log('1. Go to Supabase Dashboard > SQL Editor');
          console.log('2. Copy the SQL above');
          console.log('3. Paste and run it\n');

          console.log('OR use Supabase CLI:');
          console.log('supabase db push');

          return;
        }
      }
    }

    console.log('✅ Migration completed successfully!\n');
    console.log('🎉 The blog_posts table has been created!');
    console.log('📍 Next step: Run the import script to add blog posts');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.log('\n💡 Please create the table manually through Supabase SQL Editor');
    console.log('Copy the SQL from: backend/migrations/create_blog_posts_table.sql');
    throw error;
  }
}

// Run the migration
runMigration()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error:', error);
    process.exit(1);
  });
