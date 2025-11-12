import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create Supabase admin client for server-side operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, phone, role, verified } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: false, // Set to true if you want to skip email verification for legacy registration
      user_metadata: {
        full_name: `${firstName} ${lastName}`,
        first_name: firstName,
        last_name: lastName,
        user_type: 'coach'
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: authError.message || 'Failed to create account' },
        { status: 500 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Create user profile in users table
    const { error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        user_type: 'coach',
        full_name: `${firstName} ${lastName}`,
        phone: phone || null,
        is_active: true
      });

    if (userError) {
      console.error('User profile error:', userError);
      // Try to clean up auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json(
        { error: 'Failed to create user profile' },
        { status: 500 }
      );
    }

    // Create coach profile
    const { error: coachError } = await supabaseAdmin
      .from('coach_profiles')
      .insert({
        user_id: authData.user.id,
        is_verified: verified === true, // Legacy registrations are unverified by default
        bio: null,
        specialties: null,
        years_experience: null,
        education: null,
        certifications: null,
        languages: ['English'], // Default language
        hourly_rate: null,
        availability: null,
        rating: null,
        total_sessions: 0
      });

    if (coachError) {
      console.error('Coach profile error:', coachError);
      // Try to clean up
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      await supabaseAdmin.from('users').delete().eq('id', authData.user.id);
      return NextResponse.json(
        { error: 'Failed to create coach profile' },
        { status: 500 }
      );
    }

    // Send welcome email (optional - you can implement this later)
    // await sendWelcomeEmail(email, firstName);

    return NextResponse.json(
      {
        success: true,
        message: 'Coach account created successfully',
        data: {
          userId: authData.user.id,
          email,
          verified: verified === true
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
