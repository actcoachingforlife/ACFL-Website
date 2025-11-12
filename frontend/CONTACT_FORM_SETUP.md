# Contact Form Setup Guide

## Overview
The contact form has been implemented with full validation, backend integration, and database storage.

## What's Been Implemented

### 1. Contact Form Component
**Location:** `frontend/src/app/(public)/component/ContactForm.tsx`

**Features:**
- ✅ Full form validation (first name, last name, email, message required)
- ✅ Real-time error messages
- ✅ Loading states during submission
- ✅ Success message display
- ✅ Email format validation
- ✅ Terms agreement checkbox
- ✅ Multiple coaching interest checkboxes
- ✅ Optional phone number field

**Form Fields:**
- First Name (required)
- Last Name (required)
- Email (required, validated)
- Phone Number (optional)
- Coaching Interests (checkboxes):
  - Personal growth
  - Professional development
  - Relationship coaching
  - Stress management
  - Leadership skills
  - Other
- Message (required)
- Terms Agreement (required)

### 2. Backend API Endpoint
**Location:** `frontend/src/app/api/contact/route.ts`

**Features:**
- ✅ Server-side validation
- ✅ Email format validation
- ✅ Terms agreement verification
- ✅ Database storage
- ✅ Error handling
- ✅ Success responses

**API Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string (optional)",
  "interests": ["array of strings"],
  "message": "string",
  "agreeToTerms": boolean
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Thank you for your message. We will get back to you soon!",
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

### 3. Updated Contact Section
**Location:** `frontend/src/app/(public)/component/contactUs.tsx`

The contact section now includes:
- Contact information (Email, Phone, Office address)
- Contact form
- Google Maps embed
- Responsive layout (side-by-side on desktop, stacked on mobile)

## Database Setup

### Create the contact_submissions Table in Supabase

Run this SQL in your Supabase SQL Editor:

```sql
-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  interests TEXT[] DEFAULT '{}',
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);

-- Create index on submitted_at for sorting
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for the contact form)
CREATE POLICY "Allow public to insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow admins to read all submissions
CREATE POLICY "Allow authenticated users to read contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow admins to update submissions
CREATE POLICY "Allow authenticated users to update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add comment to table
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the website';
```

## Testing

### Test the Contact Form:

1. **Navigate to any page with the Contact section** (e.g., About, Careers pages)
2. **Scroll down to the Contact section**

### Test Cases:

✅ **Valid Submission:**
- First Name: John
- Last Name: Doe
- Email: john.doe@example.com
- Phone: (optional) +1 234 567 8900
- Interests: Select one or more
- Message: I'm interested in learning more about ACT coaching
- Terms: Check the box
- Expected: Success message, form resets

❌ **Invalid Email:**
- Email: invalid-email
- Expected: "Please enter a valid email address"

❌ **Missing Required Fields:**
- Leave first name empty
- Expected: "First name is required"

❌ **Missing Message:**
- Leave message empty
- Expected: "Message is required"

❌ **Terms Not Agreed:**
- Don't check terms box
- Expected: "You must agree to the terms"

## Viewing Submissions

### In Supabase Dashboard:

1. Go to your Supabase project
2. Navigate to **Table Editor**
3. Select **contact_submissions** table
4. View all submissions with:
   - Name, email, phone
   - Selected interests
   - Message
   - Status (new, read, responded)
   - Submission timestamp

### Query Submissions:

```sql
-- Get all new submissions
SELECT * FROM contact_submissions
WHERE status = 'new'
ORDER BY submitted_at DESC;

-- Get submissions by email
SELECT * FROM contact_submissions
WHERE email = 'john@example.com';

-- Get recent submissions (last 7 days)
SELECT * FROM contact_submissions
WHERE submitted_at >= NOW() - INTERVAL '7 days'
ORDER BY submitted_at DESC;

-- Update submission status
UPDATE contact_submissions
SET status = 'read'
WHERE id = 'submission-uuid-here';
```

## Optional Enhancements

### 1. Email Notifications

Add email notifications when someone submits the form:

```typescript
// In route.ts, add after successful database insert:

import { Resend } from 'resend'; // or your preferred email service

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendContactNotification(formData: any) {
  await resend.emails.send({
    from: 'notifications@yourdomain.com',
    to: 'support@actcoaching.com',
    subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
      <p><strong>Interests:</strong> ${formData.interests.join(', ')}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
    `
  });
}

// Call in the route handler after database insert
await sendContactNotification(body);
```

### 2. Auto-Response Email

Send an automatic reply to the user:

```typescript
async function sendAutoReply(email: string, firstName: string) {
  await resend.emails.send({
    from: 'support@actcoaching.com',
    to: email,
    subject: 'Thank you for contacting ACT Coaching',
    html: `
      <p>Hi ${firstName},</p>
      <p>Thank you for reaching out to us! We've received your message and will get back to you within 24-48 hours.</p>
      <p>In the meantime, feel free to explore our <a href="https://yourdomain.com/blog">blog</a> for helpful resources.</p>
      <p>Best regards,<br>The ACT Coaching Team</p>
    `
  });
}
```

### 3. Rate Limiting

Prevent spam by adding rate limiting:

```typescript
// Install: npm install @upstash/ratelimit @upstash/redis

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 requests per hour
});

// In route handler:
const identifier = request.headers.get("x-forwarded-for") || "anonymous";
const { success } = await ratelimit.limit(identifier);

if (!success) {
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    { status: 429 }
  );
}
```

### 4. reCAPTCHA

Add bot protection:

```typescript
// Add to frontend form:
import ReCAPTCHA from "react-google-recaptcha";

// In component:
const [recaptchaToken, setRecaptchaToken] = useState("");

<ReCAPTCHA
  sitekey="your-recaptcha-site-key"
  onChange={(token) => setRecaptchaToken(token)}
/>

// Send token with form submission
// Verify on backend with Google's API
```

### 5. Admin Dashboard

Create a simple admin page to manage submissions:

```typescript
// app/admin/contact-submissions/page.tsx

export default async function ContactSubmissions() {
  const { data: submissions } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('submitted_at', { ascending: false });

  return (
    <div>
      <h1>Contact Form Submissions</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions?.map((submission) => (
            <tr key={submission.id}>
              <td>{new Date(submission.submitted_at).toLocaleDateString()}</td>
              <td>{submission.first_name} {submission.last_name}</td>
              <td>{submission.email}</td>
              <td>{submission.status}</td>
              <td>
                <button>View</button>
                <button>Mark as Read</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Troubleshooting

### Form not submitting:
1. Check browser console for errors
2. Verify API endpoint is accessible
3. Check network tab for failed requests

### Database errors:
1. Ensure `contact_submissions` table exists in Supabase
2. Verify RLS policies are set correctly
3. Check service role key is set in environment variables

### Email not sending (if implemented):
1. Verify email service API key is correct
2. Check email service dashboard for errors
3. Review email logs

## Security Features

1. **Client-side Validation:** Immediate user feedback
2. **Server-side Validation:** Prevent malicious submissions
3. **Email Format Validation:** Ensure valid email addresses
4. **Terms Agreement:** Legal compliance
5. **RLS Policies:** Database-level security
6. **HTTPS Only:** Secure data transmission

## Summary

The contact form is now fully functional with:
- ✅ Beautiful, user-friendly interface
- ✅ Complete validation (client and server)
- ✅ Database storage in Supabase
- ✅ Error handling and success messages
- ✅ Responsive design
- ✅ Security features
- ✅ Easy to extend with email notifications

Users can now contact you directly from your website, and all submissions are stored securely in your Supabase database!
