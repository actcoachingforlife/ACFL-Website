# Coach Registration Setup Guide

## Overview
This document explains the legacy coach registration system implementation on the Careers page.

## What's Been Implemented

### 1. Frontend Form (Careers Page)
**Location:** `frontend/src/app/(public)/careers/page.tsx`

**Features:**
- ✅ Full form validation (first name, last name, email, password, confirm password, phone)
- ✅ Real-time error messages
- ✅ Loading states during submission
- ✅ Password strength requirements (minimum 8 characters)
- ✅ Email format validation
- ✅ Password matching validation
- ✅ Error handling with user-friendly messages
- ✅ HIPAA compliance notice
- ✅ Emergency contact information

**Form Fields:**
- First Name (required)
- Last Name (required)
- Email (required, must be valid format)
- Phone Number (optional)
- Password (required, minimum 8 characters)
- Confirm Password (required, must match)

### 2. Backend API Endpoint
**Location:** `frontend/src/app/api/register/coach/route.ts`

**Features:**
- ✅ Server-side validation
- ✅ Duplicate email checking
- ✅ Supabase authentication integration
- ✅ User profile creation
- ✅ Coach profile creation with default values
- ✅ Error handling with rollback on failure
- ✅ Proper HTTP status codes

**API Endpoint:** `POST /api/register/coach`

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string (optional)",
  "role": "coach",
  "verified": false
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Coach account created successfully",
  "data": {
    "userId": "uuid",
    "email": "coach@example.com",
    "verified": false
  }
}
```

**Error Responses:**
- 400: Invalid input data
- 409: Email already exists
- 500: Server error

## Setup Requirements

### Environment Variables
You need to add the following environment variable to your `.env` file:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**How to get your Service Role Key:**
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the `service_role` key (⚠️ Keep this secret!)
4. Add it to your `.env` file

### Database Tables Required
The API uses the following Supabase tables:
1. **`users`** - Main user profiles table
2. **`coach_profiles`** - Coach-specific information

These should already exist based on your current Supabase schema.

## User Flow

### Legacy Registration Flow:
1. User visits `/careers` page
2. Clicks "Prefer to use the old registration method?"
3. Fills out the registration form
4. Clicks "Create Coach Account"
5. Form validates inputs client-side
6. If valid, sends POST request to `/api/register/coach`
7. Server validates again and creates:
   - Supabase auth user
   - User profile in `users` table
   - Coach profile in `coach_profiles` table with `is_verified: false`
8. On success, redirects to `/register/coach/pending`
9. On error, displays error message

### New Registration Flow (Main):
1. User clicks "Register as Coach" button
2. Redirects to `/register/coach/verification`
3. User completes verification process
4. Creates verified coach account

## Testing

### Test the Registration Form:

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to:**
   ```
   http://localhost:3000/careers
   ```

3. **Test Cases:**

   ✅ **Valid Registration:**
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@example.com
   - Password: TestPass123
   - Confirm Password: TestPass123
   - Expected: Success, redirect to pending page

   ❌ **Invalid Email:**
   - Email: invalid-email
   - Expected: "Please enter a valid email address"

   ❌ **Short Password:**
   - Password: Test123
   - Expected: "Password must be at least 8 characters long"

   ❌ **Password Mismatch:**
   - Password: TestPass123
   - Confirm Password: DifferentPass123
   - Expected: "Passwords do not match"

   ❌ **Missing Fields:**
   - Leave any required field empty
   - Expected: "[Field name] is required"

   ❌ **Duplicate Email:**
   - Use an email that already exists
   - Expected: "An account with this email already exists"

## Security Features

1. **Password Requirements:** Minimum 8 characters
2. **Email Validation:** Regex pattern matching
3. **Server-side Validation:** All inputs validated on server
4. **Duplicate Prevention:** Checks for existing accounts
5. **Error Handling:** Rollback on partial failures
6. **HIPAA Compliance:** Notice displayed to users
7. **Secure Storage:** Passwords hashed by Supabase Auth

## Next Steps (Optional Enhancements)

### 1. Email Verification
Add email verification for legacy registrations:
```typescript
// In route.ts, set email_confirm: true
email_confirm: true
```

### 2. Welcome Email
Implement welcome email functionality:
```typescript
async function sendWelcomeEmail(email: string, firstName: string) {
  // Use your email service (SendGrid, Resend, etc.)
  // Send welcome email with next steps
}
```

### 3. Rate Limiting
Add rate limiting to prevent abuse:
```typescript
import { rateLimit } from '@/lib/rate-limit'

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})

await limiter.check(request, 10, 'CACHE_TOKEN') // 10 requests per minute
```

### 4. CAPTCHA
Add reCAPTCHA or similar to prevent bots:
```typescript
// Verify CAPTCHA token before processing registration
```

### 5. Logging
Add comprehensive logging for debugging:
```typescript
// Log all registration attempts (success and failure)
// Monitor for suspicious patterns
```

## Troubleshooting

### Common Issues:

**1. "Failed to create account" error:**
- Check that `SUPABASE_SERVICE_ROLE_KEY` is set in `.env`
- Verify Supabase credentials are correct
- Check Supabase dashboard for auth policies

**2. "Failed to create user profile" error:**
- Verify `users` table exists in Supabase
- Check Row Level Security (RLS) policies
- Ensure service role has proper permissions

**3. "Failed to create coach profile" error:**
- Verify `coach_profiles` table exists
- Check foreign key constraints
- Review RLS policies

**4. Form not submitting:**
- Open browser console to check for errors
- Verify network requests are being made
- Check if validation is passing

**5. Redirect not working:**
- Ensure `/register/coach/pending` page exists
- Check browser console for navigation errors

## Database Schema

### users table:
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  user_type VARCHAR CHECK (user_type IN ('member', 'coach', 'admin')),
  full_name VARCHAR,
  phone VARCHAR,
  avatar_url VARCHAR,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### coach_profiles table:
```sql
CREATE TABLE coach_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  specialties TEXT[],
  years_experience INTEGER,
  education TEXT[],
  certifications TEXT[],
  languages TEXT[],
  hourly_rate DECIMAL,
  availability JSONB,
  video_url VARCHAR,
  is_verified BOOLEAN DEFAULT false,
  rating DECIMAL,
  total_sessions INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Support

If you encounter issues:
1. Check the browser console for errors
2. Review server logs for API errors
3. Verify Supabase configuration
4. Ensure all environment variables are set
5. Check database table structure and policies

## Summary

The legacy coach registration system is now fully functional with:
- Complete client-side validation
- Secure server-side processing
- Proper error handling
- User-friendly interface
- HIPAA compliance notices
- Integration with existing Supabase infrastructure

The form will create unverified coach accounts that can be reviewed and approved later through your admin dashboard.
