import { TourStep } from './CustomTour';

// ==================== CLIENT TOURS ====================

// Client Dashboard Welcome Tour
export const welcomeTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Welcome to ACT Coaching!',
    content: (
      <div>
        <p className="mb-3">
          We're excited to help you on your journey. Let's take a quick tour to show you around the platform.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          You can skip this tour anytime by clicking "Skip Tour".
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="dashboard-stats"]',
    placement: 'bottom',
    title: 'Your Dashboard Overview',
    content: (
      <p>
        These cards show your key metrics: upcoming sessions, saved coaches, completed sessions, and messages.
      </p>
    )
  },
  {
    target: '[data-tour="quick-actions"]',
    placement: 'bottom',
    title: 'Quick Actions',
    content: (
      <p>
        Use these buttons to quickly access the most common tasks: finding coaches, viewing appointments, and checking messages.
      </p>
    )
  },
  {
    target: '[data-tour="navigation"]',
    placement: 'right',
    title: 'Main Navigation',
    content: (
      <p>
        Navigate through the platform using this menu. You can search for coaches, manage appointments, view messages, and more.
      </p>
    )
  }
];

// Search Coaches Tour
export const searchCoachesTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Find Your Perfect Coach!',
    content: (
      <div>
        <p className="mb-3">
          Welcome to the coach search page! Here you can browse and filter through our coaches to find the perfect match.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Let's take a quick tour to show you around!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="tabs"]',
    placement: 'bottom',
    title: 'Discover and Favorites',
    content: (
      <div>
        <p className="mb-2">Switch between two views:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Discover</strong> - Browse all available coaches</li>
          <li><strong>Favorites</strong> - View coaches you've saved</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="search-filters"]',
    placement: 'bottom',
    title: 'Advanced Filters',
    content: (
      <div>
        <p className="mb-3">
          Click "Show Advanced Filters" to narrow your search by specialization, availability, language, and price range.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 The more specific you are, the better your matches!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="coach-cards"]',
    placement: 'top',
    title: 'Coach Profiles',
    content: (
      <div>
        <p className="mb-3">
          Each coach card shows their match score, specializations, experience, and session rate.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Click on any card to view the full profile and book a session!
        </p>
      </div>
    )
  }
];

// Appointments Tour
export const appointmentsTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Manage Your Appointments',
    content: (
      <div>
        <p className="mb-3">
          Welcome to your appointments page! Here you can view all your scheduled coaching sessions, filter by status, and join video calls when it's time.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Let's take a quick tour of the key features!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="filter-tabs"]',
    placement: 'bottom',
    title: 'Filter Your Appointments',
    content: (
      <div>
        <p className="mb-2">Use these tabs to organize your appointments:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Upcoming</strong> - View scheduled sessions</li>
          <li><strong>Past</strong> - Review completed or canceled sessions</li>
          <li><strong>Pending</strong> - See confirmed sessions awaiting payment</li>
          <li><strong>All</strong> - View everything in one place</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="search-input"]',
    placement: 'bottom',
    title: 'Search for Specific Appointments',
    content: (
      <div>
        <p className="mb-2">Need to find a specific session? Use the search bar to filter by:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li>Coach name</li>
          <li>Session notes</li>
          <li>Status</li>
          <li>Date</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ⚡ Search results update instantly as you type
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="appointments-list"]',
    placement: 'top',
    title: 'View Your Appointments',
    content: (
      <div>
        <p className="mb-2">Each appointment card shows:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Coach name and contact info</li>
          <li>Session status (scheduled, confirmed, etc.)</li>
          <li>Date, time, and duration</li>
          <li>Session type and any notes</li>
          <li>Action buttons (join, message)</li>
        </ul>
      </div>
    )
  }
];

// Messages Tour
export const messagesTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Send Messages to Your Coach',
    content: (
      <div>
        <p className="mb-3">
          Welcome to the messaging page! Here you can communicate directly with your coaches.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Let's walk through how to send a message!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="conversations-list"]',
    placement: 'right',
    title: 'View Your Conversations',
    content: (
      <div>
        <p className="mb-3">
          This is your conversations list. All your chats with coaches appear here.
        </p>
        <p className="mb-2">Each conversation shows:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li>Coach's name and profile photo</li>
          <li>Last message preview</li>
          <li>Time of last message</li>
          <li>Unread message count (if any)</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Conversations are sorted by most recent activity!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="messages-area"]',
    placement: 'top',
    title: 'View Message History',
    content: (
      <div>
        <p className="mb-3">
          This is your message thread with the selected coach.
        </p>
        <p className="mb-2"><strong>Message features:</strong></p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li>Your messages appear on the right (blue)</li>
          <li>Coach's messages appear on the left (gray)</li>
          <li>Scroll to view message history</li>
          <li>File attachments can be downloaded</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 New messages appear automatically in real-time!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="message-input"]',
    placement: 'top',
    title: 'Type Your Message',
    content: (
      <div>
        <p className="mb-3">
          Click in this field to start typing your message.
        </p>
        <p className="mb-2"><strong>Tips for messaging:</strong></p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li>Be clear and concise</li>
          <li>Share what you'd like to discuss</li>
          <li>Ask questions about scheduling or sessions</li>
          <li>Press Enter to send (or click the send button)</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Your coach will be notified when you send a message!
        </p>
      </div>
    )
  }
];

// Profile Tour
export const profileTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Complete Your Profile',
    content: (
      <div>
        <p className="mb-3">
          Let's set up your profile! A complete profile helps us match you with the best coaches for your needs.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Tip: The more information you provide, the better we can personalize your experience.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="profile-form"]',
    placement: 'top',
    title: 'Fill Out Your Details',
    content: (
      <div>
        <p className="mb-3">
          Your profile is now in editing mode. Complete these fields to help us understand you better:
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Contact Info</strong> - Keep your email and phone up to date</li>
          <li><strong>Personal Details</strong> - Gender identity, ethnicity, and background</li>
          <li><strong>Preferences</strong> - Areas of concern and coach preferences</li>
          <li><strong>Availability</strong> - When you're available for sessions</li>
        </ul>
      </div>
    )
  }
];

// Booking Tour
export const bookingTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Book Your First Session!',
    content: (
      <div>
        <p className="mb-3">
          Let's walk through booking a coaching session. This is quick and easy!
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 You can book sessions directly from coach profiles or the search page.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="calendar-section"]',
    placement: 'right',
    title: 'Step 1: Select a Date',
    content: (
      <div>
        <p className="mb-3">
          Choose your preferred date from the calendar. Available dates are highlighted.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Use the arrows to navigate between months.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="time-slots"]',
    placement: 'top',
    title: 'Step 2: Choose a Time',
    content: (
      <div>
        <p className="mb-3">
          After selecting a date, available time slots will appear here. Pick a time that works best for you.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 All times are shown in your local timezone.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="booking-summary"]',
    placement: 'top',
    title: 'Step 3: Review Details',
    content: (
      <div>
        <p className="mb-3">
          Review your booking details including coach, date, time, and session rate.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 You can add notes about what you'd like to discuss!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="confirm-button"]',
    placement: 'top',
    title: 'Step 4: Confirm Booking',
    content: (
      <div>
        <p className="mb-3">
          Click here to confirm your booking. You'll receive a confirmation email with session details.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 You can cancel or reschedule up to 24 hours before the session.
        </p>
      </div>
    )
  }
];

// Booking Flow - Profile Steps (for booking from coach profile)
export const bookingFlowProfileSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Book a Session with This Coach',
    content: (
      <div>
        <p className="mb-3">
          You've found a great coach! Let's book your first session together.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This will take just a few minutes!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="book-session-button"]',
    placement: 'bottom',
    title: 'Start Booking',
    content: (
      <div>
        <p className="mb-3">
          Click this button to view available times and book a session with this coach.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 You'll see their full availability calendar!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="booking-calendar-container"]',
    placement: 'top',
    title: 'Select Date and Time',
    content: (
      <div>
        <p className="mb-3">
          Choose your preferred date and time from the available slots.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Green slots are available for booking!
        </p>
      </div>
    )
  }
];

// ==================== ADMIN TOURS ====================

// Admin Dashboard Welcome Tour
export const adminWelcomeTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Welcome to Admin Dashboard!',
    navigateTo: '/admin',
    content: (
      <div>
        <p className="mb-3">
          You now have full control over the ACT Coaching platform. Let's take a quick tour to help you get started.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          You can skip this tour anytime by clicking "Skip Tour".
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="admin-dashboard-stats"]',
    placement: 'bottom',
    title: 'Platform Overview',
    content: (
      <p>
        Monitor key platform metrics at a glance: total users, active coaches, appointments, and revenue.
      </p>
    )
  },
  {
    target: '[data-tour="admin-sidebar"]',
    placement: 'right',
    title: 'Admin Navigation',
    content: (
      <div>
        <p className="mb-3">
          Access all admin features through this menu. Manage users, monitor operations, view analytics, and configure system settings.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Tip: Hover over the sidebar to expand it and see all menu options!
        </p>
      </div>
    )
  }
];

// Admin User Management Tour
export const adminUserManagementTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'User Management Guide',
    navigateTo: '/admin/users',
    content: (
      <div>
        <p className="mb-3">
          Learn how to manage all users on the platform, from clients to coaches and staff members.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          You have full control over user accounts and permissions.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="users-tabs"]',
    placement: 'bottom',
    title: 'User Categories',
    navigateTo: '/admin/users',
    content: (
      <div>
        <p className="mb-2">Use these tabs to filter users by role:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>All Users</strong> - View everyone (28 total)</li>
          <li><strong>Clients</strong> - Client accounts only</li>
          <li><strong>Coaches</strong> - Approved coaches</li>
          <li><strong>Staff</strong> - Admin and staff members</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="user-actions"]',
    placement: 'bottom',
    title: 'User Management Actions',
    content: (
      <div>
        <p className="mb-2">Quick actions available:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Add User</strong> - Manually create new accounts</li>
          <li><strong>Import</strong> - Bulk import users from CSV</li>
          <li><strong>Export</strong> - Download user list</li>
          <li><strong>Invite</strong> - Send invitation emails</li>
          <li><strong>Manage Invitations</strong> - Track pending invites</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="filter-users"]',
    placement: 'bottom',
    title: 'Advanced Filtering',
    content: (
      <div>
        <p className="mb-3">
          Use advanced filters to find specific users. Filter by status, joined date, role, and more.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Combine multiple filters for precise results!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="search-users"]',
    placement: 'bottom',
    title: 'Search Functionality',
    content: (
      <div>
        <p className="mb-3">
          Search users by name, email, or role. Results update in real-time as you type.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Use partial names or emails for broader search!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="user-table"]',
    placement: 'top',
    title: 'User List',
    content: (
      <div>
        <p className="mb-2">Each user row shows:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li>Name, email, and phone</li>
          <li>Role badge (Client, Coach, Staff)</li>
          <li>Account status (Active, Suspended, etc.)</li>
          <li>Join date and last login</li>
          <li>Quick actions menu (⋮)</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Click on any row to view full user details!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="user-status"]',
    placement: 'top',
    title: 'User Status Management',
    content: (
      <div>
        <p className="mb-2">Monitor and control user account status:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Active</strong> - Full access to platform</li>
          <li><strong>Suspended</strong> - Temporarily disabled</li>
          <li><strong>Pending</strong> - Email verification needed</li>
          <li><strong>Banned</strong> - Permanently blocked</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="items-per-page"]',
    placement: 'left',
    title: 'Items Per Page',
    content: (
      <div>
        <p className="mb-3">
          Control how many users are displayed per page. Choose from 10, 20, 50, or 100 users at a time.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Tip: Higher values mean less clicking between pages, but slower loading times.
        </p>
      </div>
    )
  }
];

// Admin Coach Applications Tour
export const adminCoachApplicationsTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Coach Applications Management',
    navigateTo: '/admin/coach-applications',
    content: (
      <div>
        <p className="mb-3">
          Review and approve coach applications. Maintain quality by carefully evaluating each applicant's credentials, experience, and qualifications.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 You can approve, reject, or request more information from applicants.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="applications-tabs"]',
    placement: 'bottom',
    title: 'Application Status Tabs',
    navigateTo: '/admin/coach-applications',
    content: (
      <div>
        <p className="mb-2">Filter applications by status:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Pending</strong> - New applications awaiting review</li>
          <li><strong>Approved</strong> - Accepted coaches (now active)</li>
          <li><strong>Rejected</strong> - Declined applications with reasons</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          💡 Badge numbers show count in each category
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="application-actions"]',
    placement: 'bottom',
    title: 'Application Actions',
    content: (
      <div>
        <p className="mb-2">Available actions:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Search</strong> - Find specific applications</li>
          <li><strong>Filter</strong> - By specialty, experience, date</li>
          <li><strong>Sort</strong> - Order by date, name, status</li>
          <li><strong>Export</strong> - Download application data</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="application-card"]',
    placement: 'top',
    title: 'Application Details',
    content: (
      <div>
        <p className="mb-2">Each application shows:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li>Coach name, photo, and contact info</li>
          <li>Specializations and expertise areas</li>
          <li>Years of experience and certifications</li>
          <li>Hourly rate and availability</li>
          <li>Application date and current status</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Click "View Details" to see full application
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="review-process"]',
    placement: 'center',
    title: 'Review Process',
    content: (
      <div>
        <p className="mb-3">
          When reviewing an application, check:
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li>Professional credentials and certifications</li>
          <li>Relevant coaching experience (minimum 2 years)</li>
          <li>Client testimonials and references</li>
          <li>Background check status</li>
          <li>Sample coaching session video</li>
          <li>Specialization alignment with platform needs</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Maintain high quality standards for best client experience
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="approval-buttons"]',
    placement: 'top',
    title: 'Approval Actions',
    content: (
      <div>
        <p className="mb-2">Decision options:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li><strong>Approve</strong> - Accept and activate coach account</li>
          <li><strong>Reject</strong> - Decline with reason notification</li>
          <li><strong>Request Info</strong> - Ask for additional documents</li>
          <li><strong>Schedule Interview</strong> - Set up video call</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 All decisions send automatic email notifications
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="analytics-link"]',
    placement: 'bottom',
    title: 'Application Analytics',
    content: (
      <div>
        <p className="mb-3">
          View detailed analytics about coach applications including approval rates, processing times, and quality metrics.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Use data to improve your review process!
        </p>
      </div>
    )
  }
];

// Admin Appointments Tour
export const adminAppointmentsTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Appointments Management',
    navigateTo: '/admin/appointments',
    content: (
      <div>
        <p className="mb-3">
          View and manage all coaching appointments across the platform. Monitor bookings, track status, resolve issues, and ensure quality service delivery.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 You have full oversight and control over all coaching sessions!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="appointments-filters"]',
    placement: 'bottom',
    title: 'Appointment Filters',
    navigateTo: '/admin/appointments',
    content: (
      <div>
        <p className="mb-2">Filter appointments by status:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>All</strong> - View all appointments</li>
          <li><strong>Upcoming</strong> - Scheduled future sessions</li>
          <li><strong>In Progress</strong> - Currently active sessions</li>
          <li><strong>Completed</strong> - Finished sessions</li>
          <li><strong>Cancelled</strong> - Cancelled by coach or client</li>
          <li><strong>No-Show</strong> - Missed appointments</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="appointments-search"]',
    placement: 'bottom',
    title: 'Search & Filter',
    content: (
      <div>
        <p className="mb-2">Find specific appointments using:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li>Coach or client name</li>
          <li>Appointment ID</li>
          <li>Date range filters</li>
          <li>Session type</li>
          <li>Payment status</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Combine filters for precise results
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="appointment-list"]',
    placement: 'top',
    title: 'Appointment Details',
    content: (
      <div>
        <p className="mb-2">Each appointment displays:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li>Coach and client names with photos</li>
          <li>Session date, time, and duration</li>
          <li>Session type and topic</li>
          <li>Payment and booking status</li>
          <li>Quick action buttons</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Click any appointment for full details
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="appointment-actions"]',
    placement: 'bottom',
    title: 'Admin Actions',
    content: (
      <div>
        <p className="mb-2">Available actions:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li><strong>View Details</strong> - See full appointment info</li>
          <li><strong>Cancel</strong> - Cancel with refund options</li>
          <li><strong>Reschedule</strong> - Change date/time</li>
          <li><strong>Contact Parties</strong> - Message coach or client</li>
          <li><strong>Process Refund</strong> - Handle payment issues</li>
          <li><strong>Mark Status</strong> - Update appointment status</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Handle disputes and issues promptly
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="appointment-reports"]',
    placement: 'bottom',
    title: 'Reports & Analytics',
    content: (
      <div>
        <p className="mb-3">
          Generate detailed reports on appointment metrics including booking rates, completion rates, cancellation reasons, and revenue by session type.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Export reports for analysis and decision making
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="quality-monitoring"]',
    placement: 'center',
    title: 'Quality Monitoring',
    content: (
      <div>
        <p className="mb-3">Monitor session quality through:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li>Client feedback and ratings</li>
          <li>Session completion rates</li>
          <li>No-show patterns</li>
          <li>Complaint tracking</li>
          <li>Coach performance metrics</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Identify and address quality issues early
        </p>
      </div>
    )
  }
];

// Admin Financials Tour
export const adminFinancialsTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Financial Management',
    navigateTo: '/admin/financials',
    content: (
      <div>
        <p className="mb-3">
          Track all platform revenue, manage coach payouts, monitor transactions, and generate financial reports.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Complete oversight of platform finances and payments
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="revenue-stats"]',
    placement: 'bottom',
    title: 'Revenue Dashboard',
    navigateTo: '/admin/financials',
    content: (
      <div>
        <p className="mb-2">Key financial metrics:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li>Total monthly revenue</li>
          <li>Platform commission earned</li>
          <li>Coach earnings (to be paid out)</li>
          <li>Pending transactions</li>
          <li>Refunds processed</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Track trends over time with charts
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="transactions-list"]',
    placement: 'top',
    title: 'Transaction History',
    content: (
      <div>
        <p className="mb-2">View all financial transactions:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li>Client payments for sessions</li>
          <li>Coach payout transfers</li>
          <li>Refunds and adjustments</li>
          <li>Platform fees collected</li>
          <li>Failed or disputed payments</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Filter by date, user, or transaction type
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="payout-management"]',
    placement: 'bottom',
    title: 'Coach Payouts',
    content: (
      <div>
        <p className="mb-3">
          Manage coach payout requests. Review pending requests, approve payments, and track payout history.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Set minimum payout thresholds and payment schedules
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="financial-reports"]',
    placement: 'bottom',
    title: 'Reports & Export',
    content: (
      <div>
        <p className="mb-2">Generate detailed reports:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Monthly/quarterly revenue reports</li>
          <li>Coach earnings breakdown</li>
          <li>Tax documentation</li>
          <li>Commission analysis</li>
          <li>Export to CSV/PDF for accounting</li>
        </ul>
      </div>
    )
  }
];

// Admin Analytics Tour
export const adminAnalyticsTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Platform Analytics',
    navigateTo: '/admin/analytics',
    content: (
      <div>
        <p className="mb-3">
          Access comprehensive analytics and insights about platform performance, user behavior, and business metrics.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Data-driven decisions for platform growth
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="analytics-overview"]',
    placement: 'bottom',
    title: 'Key Metrics Dashboard',
    navigateTo: '/admin/analytics',
    content: (
      <div>
        <p className="mb-2">Monitor important KPIs:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>User growth and retention rates</li>
          <li>Session booking trends</li>
          <li>Revenue and conversion metrics</li>
          <li>Platform engagement levels</li>
          <li>Coach performance statistics</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="analytics-charts"]',
    placement: 'bottom',
    title: 'Visual Analytics',
    content: (
      <div>
        <p className="mb-3">
          Interactive charts and graphs showing trends over time. Filter by date range and compare different metrics.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Identify patterns and growth opportunities
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="user-analytics"]',
    placement: 'bottom',
    title: 'User Behavior Analytics',
    content: (
      <div>
        <p className="mb-2">Understand user behavior:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>User acquisition sources</li>
          <li>Feature usage patterns</li>
          <li>Session duration and frequency</li>
          <li>Drop-off points</li>
          <li>Popular coach categories</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="export-analytics"]',
    placement: 'bottom',
    title: 'Export & Reports',
    content: (
      <div>
        <p className="mb-3">
          Export analytics data for deeper analysis. Generate custom reports and share insights with stakeholders.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Schedule automated weekly/monthly reports
        </p>
      </div>
    )
  }
];

// Admin Settings Tour
export const adminSettingsTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'System Settings',
    navigateTo: '/admin/settings',
    content: (
      <div>
        <p className="mb-3">
          Configure platform settings, manage permissions, customize features, and control system behavior.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Careful: Changes here affect the entire platform
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="general-settings"]',
    placement: 'bottom',
    title: 'General Settings',
    navigateTo: '/admin/settings?tab=general',
    content: (
      <div>
        <p className="mb-2">Configure basic platform settings:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Platform name and branding</li>
          <li>Contact information</li>
          <li>Time zone and locale</li>
          <li>Default currency</li>
          <li>Maintenance mode</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="email-settings"]',
    placement: 'bottom',
    title: 'Email & Notifications',
    navigateTo: '/admin/settings?tab=notifications',
    content: (
      <div>
        <p className="mb-2">Configure communication settings:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Email templates</li>
          <li>SMTP configuration</li>
          <li>Notification preferences</li>
          <li>Automated email schedules</li>
          <li>SMS integration</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="security-settings"]',
    placement: 'bottom',
    title: 'Security & Privacy',
    navigateTo: '/admin/settings?tab=security',
    content: (
      <div>
        <p className="mb-2">Enhance platform security:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Two-factor authentication</li>
          <li>Password policies</li>
          <li>Session timeout settings</li>
          <li>API access controls</li>
          <li>Privacy and GDPR compliance</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="payment-settings"]',
    placement: 'bottom',
    title: 'Payment Configuration',
    navigateTo: '/admin/settings?tab=payment',
    content: (
      <div>
        <p className="mb-2">Manage payment settings:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Payment gateway integration</li>
          <li>Commission rates and fees</li>
          <li>Minimum payout amounts</li>
          <li>Refund policies</li>
          <li>Tax settings</li>
        </ul>
      </div>
    )
  }
];

// Admin Content Management Tour (Blog)
export const adminContentTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Blog Management',
    navigateTo: '/admin/blog',
    content: (
      <div>
        <p className="mb-3">
          Create, edit, and manage blog posts for your platform. Keep your audience engaged with fresh content.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Quality content drives user engagement and SEO rankings
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="blog-stats"]',
    placement: 'bottom',
    title: 'Blog Statistics',
    navigateTo: '/admin/blog',
    content: (
      <div>
        <p className="mb-2">Track your blog performance:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Total Posts</strong> - All blog posts in the system</li>
          <li><strong>Published</strong> - Live posts visible to users</li>
          <li><strong>Drafts</strong> - Unpublished posts in progress</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          💡 Keep a steady flow of published content
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="create-post"]',
    placement: 'bottom',
    title: 'Create New Post',
    content: (
      <div>
        <p className="mb-3">
          Click here to create a new blog post. You'll be able to add a title, description, content, featured image, and more.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Use rich text formatting for better readability
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="blog-filters"]',
    placement: 'bottom',
    title: 'Search & Filter Posts',
    content: (
      <div>
        <p className="mb-2">Find posts quickly using filters:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li>Search by title, description, or category</li>
          <li>Filter by category (Personal Growth, Mindfulness, etc.)</li>
          <li>Show only published or draft posts</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Combine filters for precise results
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="blog-posts-list"]',
    placement: 'top',
    title: 'Blog Posts List',
    content: (
      <div>
        <p className="mb-2">Each post card shows:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li>Featured image and title</li>
          <li>Category badge and read time</li>
          <li>Author, date, and publish status</li>
          <li>Quick action buttons</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Click on any post to view full details
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="post-actions"]',
    placement: 'top',
    title: 'Post Actions',
    content: (
      <div>
        <p className="mb-2">Manage your posts:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li><strong>Edit</strong> - Update post content and settings</li>
          <li><strong>Publish/Unpublish</strong> - Toggle visibility</li>
          <li><strong>Delete</strong> - Remove post (requires confirmation)</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Draft posts are saved but not visible to users
        </p>
      </div>
    )
  }
];

// Admin Page Content Management Tour
export const adminPageContentTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Page Content Management',
    navigateTo: '/admin/content',
    content: (
      <div>
        <p className="mb-3">
          Manage static page content for your website. Edit public-facing pages like About, Contact, Pricing, and more.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Changes are saved per section and can be published or kept as drafts
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="page-selector"]',
    placement: 'bottom',
    title: 'Page Selector',
    navigateTo: '/admin/content',
    content: (
      <div>
        <p className="mb-2">Select which page you want to edit:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li><strong>Help</strong> - FAQ and support pages</li>
          <li><strong>About</strong> - Company information and mission</li>
          <li><strong>Careers</strong> - Job listings and benefits</li>
          <li><strong>Contact</strong> - Contact information and form</li>
          <li><strong>Press</strong> - Media and press releases</li>
          <li><strong>Resources</strong> - Educational resources</li>
          <li><strong>Pricing</strong> - Pricing plans and features</li>
          <li>And more...</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Click any page template to load its content
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="publish-toggle"]',
    placement: 'left',
    title: 'Publish Status',
    content: (
      <div>
        <p className="mb-3">
          Toggle between Published and Draft status. Draft pages are not visible to the public.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Test your changes as drafts before publishing
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="page-editor"]',
    placement: 'top',
    title: 'Section-Based Editor',
    content: (
      <div>
        <p className="mb-2">Pages are organized into sections:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li><strong>Hero Section</strong> - Page title and subtitle</li>
          <li><strong>Content Sections</strong> - Main page content</li>
          <li><strong>Features/Benefits</strong> - Lists and descriptions</li>
          <li><strong>FAQs</strong> - Questions and answers</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Each section can be edited independently
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="section-actions"]',
    placement: 'left',
    title: 'Section Actions',
    content: (
      <div>
        <p className="mb-2">Manage individual sections:</p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li><strong>Edit</strong> - Modify section content</li>
          <li><strong>Save</strong> - Save changes to this section</li>
          <li><strong>Cancel</strong> - Discard unsaved changes</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Sections are saved individually, not the whole page at once
        </p>
      </div>
    )
  }
];

// Admin System Logs Tour
export const adminSystemLogsTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'System Logs & Monitoring',
    navigateTo: '/admin/system-logs',
    content: (
      <div>
        <p className="mb-3">
          Monitor system activity, track errors, review audit logs, and troubleshoot issues to ensure platform stability.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Essential for security and troubleshooting
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="log-filters"]',
    placement: 'bottom',
    title: 'Filter Logs',
    navigateTo: '/admin/system-logs',
    content: (
      <div>
        <p className="mb-2">Filter logs by:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Type</strong> - Error, Warning, Info, Debug</li>
          <li><strong>Date Range</strong> - Specific time periods</li>
          <li><strong>User</strong> - Actions by specific users</li>
          <li><strong>Module</strong> - Different system components</li>
          <li><strong>Severity</strong> - Critical to low priority</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="audit-trail"]',
    placement: 'top',
    title: 'Audit Trail',
    content: (
      <div>
        <p className="mb-2">Track all admin actions:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>User account modifications</li>
          <li>Permission changes</li>
          <li>Settings updates</li>
          <li>Content changes</li>
          <li>Financial transactions</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          💡 Complete accountability and transparency
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="error-logs"]',
    placement: 'top',
    title: 'Error Monitoring',
    content: (
      <div>
        <p className="mb-3">
          Monitor system errors and exceptions. Get alerts for critical issues and track resolution status.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Set up email alerts for critical errors
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="export-logs"]',
    placement: 'bottom',
    title: 'Export & Analysis',
    content: (
      <div>
        <p className="mb-3">
          Export logs for detailed analysis or compliance requirements. Download in various formats (CSV, JSON, TXT).
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Retain logs per your data retention policy
        </p>
      </div>
    )
  }
];

// ============================================
// CLIENT TOURS
// ============================================

// Client Dashboard Tour
export const clientDashboardTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Welcome to Your Dashboard',
    navigateTo: '/clients',
    content: (
      <div>
        <p className="mb-3">
          Welcome to your client dashboard! This is your hub for managing your coaching journey, tracking progress, and staying connected with your coach.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Let&apos;s take a quick tour to get you started
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="upcoming-sessions"]',
    placement: 'bottom',
    title: 'Upcoming Sessions',
    navigateTo: '/clients',
    content: (
      <div>
        <p className="mb-2">View your scheduled coaching sessions:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>See session dates and times</li>
          <li>Join video calls when it&apos;s time</li>
          <li>Reschedule if needed</li>
          <li>Prepare notes for your session</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          💡 You&apos;ll receive reminders before each session
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="progress-overview"]',
    placement: 'bottom',
    title: 'Track Your Progress',
    content: (
      <div>
        <p className="mb-3">
          Monitor your coaching journey with visual progress indicators. See session completion, goal achievement, and growth over time.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Regular sessions lead to better outcomes
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="quick-actions"]',
    placement: 'bottom',
    title: 'Quick Actions',
    content: (
      <div>
        <p className="mb-2">Access common actions quickly:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Book a new session</li>
          <li>Message your coach</li>
          <li>View resources</li>
          <li>Update your goals</li>
        </ul>
      </div>
    )
  }
];

// Client Find Coach Tour
export const clientFindCoachTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Find Your Perfect Coach',
    navigateTo: '/clients/search-coaches',
    content: (
      <div>
        <p className="mb-3">
          Browse our directory of certified ACT coaches. Each coach has a unique approach and specialties to match your needs.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Take your time to find the right fit
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="coach-filters"]',
    placement: 'bottom',
    title: 'Filter Coaches',
    navigateTo: '/clients/search-coaches',
    content: (
      <div>
        <p className="mb-2">Narrow down your search:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Filter by specialty</li>
          <li>Sort by rating or experience</li>
          <li>Check availability</li>
          <li>View pricing</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="coach-cards"]',
    placement: 'top',
    title: 'Coach Profiles',
    content: (
      <div>
        <p className="mb-2">Each coach card shows:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Profile photo and name</li>
          <li>Specialties and approach</li>
          <li>Rating and reviews</li>
          <li>Session pricing</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          💡 Click &quot;View Profile&quot; to learn more
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="book-session-btn"]',
    placement: 'top',
    title: 'Book a Session',
    content: (
      <div>
        <p className="mb-3">
          Found the right coach? Click &quot;Book Session&quot; to view their calendar and schedule your first appointment.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Many coaches offer a free introductory call
        </p>
      </div>
    )
  }
];

// Client Appointments Tour
export const clientAppointmentsTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Manage Your Sessions',
    navigateTo: '/clients/appointments',
    content: (
      <div>
        <p className="mb-3">
          View all your past and upcoming coaching sessions. Manage bookings, reschedule if needed, and access session notes.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Stay organized and never miss a session
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="appointment-filters"]',
    placement: 'bottom',
    title: 'Filter Your Sessions',
    navigateTo: '/clients/appointments',
    content: (
      <div>
        <p className="mb-2">Organize your appointments:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>View upcoming or past sessions</li>
          <li>Filter by coach</li>
          <li>See cancelled or rescheduled</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="appointment-list"]',
    placement: 'top',
    title: 'Session Details',
    content: (
      <div>
        <p className="mb-2">Each session shows:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Date, time, and duration</li>
          <li>Coach name and specialty</li>
          <li>Session status</li>
          <li>Video call link (when available)</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="session-actions"]',
    placement: 'left',
    title: 'Session Actions',
    content: (
      <div>
        <p className="mb-2">Manage your sessions:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Join Call</strong> - Start video session</li>
          <li><strong>Reschedule</strong> - Change date/time</li>
          <li><strong>Cancel</strong> - Cancel session</li>
          <li><strong>View Notes</strong> - Access session notes</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          💡 Check cancellation policies before cancelling
        </p>
      </div>
    )
  }
];

// Client Messages Tour
export const clientMessagesTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Stay Connected',
    navigateTo: '/clients/messages',
    content: (
      <div>
        <p className="mb-3">
          Message your coach anytime between sessions. Share updates, ask questions, or discuss your progress.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Your coach will respond within 24-48 hours
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="conversation-list"]',
    placement: 'right',
    title: 'Your Conversations',
    navigateTo: '/clients/messages',
    content: (
      <div>
        <p className="mb-2">All your coach conversations in one place:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>See recent messages</li>
          <li>Unread message indicators</li>
          <li>Quick search</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="message-thread"]',
    placement: 'left',
    title: 'Message Thread',
    content: (
      <div>
        <p className="mb-3">
          View your complete message history with your coach. All conversations are private and secure.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="message-input"]',
    placement: 'top',
    title: 'Send Messages',
    content: (
      <div>
        <p className="mb-3">
          Type your message and click send. You can share text messages anytime.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Be clear and specific about what you need help with
        </p>
      </div>
    )
  }
];

// Client Profile Tour
export const clientProfileTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Your Profile',
    navigateTo: '/clients/profile',
    content: (
      <div>
        <p className="mb-3">
          Manage your personal information, preferences, and account settings. Keep your profile up to date for the best experience.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="profile-info"]',
    placement: 'bottom',
    title: 'Personal Information',
    navigateTo: '/clients/profile',
    content: (
      <div>
        <p className="mb-2">Update your details:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Name and contact info</li>
          <li>Profile photo</li>
          <li>Timezone preferences</li>
          <li>Bio and background</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="goals-section"]',
    placement: 'bottom',
    title: 'Your Goals',
    content: (
      <div>
        <p className="mb-3">
          Set and track your coaching goals. Share these with your coach to align your sessions with what matters most to you.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Update goals as your journey progresses
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="preferences"]',
    placement: 'top',
    title: 'Preferences',
    content: (
      <div>
        <p className="mb-2">Customize your experience:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Notification settings</li>
          <li>Email preferences</li>
          <li>Privacy settings</li>
          <li>Language and timezone</li>
        </ul>
      </div>
    )
  }
];

// ============================================
// COACH TOURS
// ============================================

// Coach Dashboard Tour
export const coachDashboardTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Welcome to Your Coach Dashboard',
    navigateTo: '/coaches',
    content: (
      <div>
        <p className="mb-3">
          Welcome to your coach dashboard! Manage your clients, schedule sessions, track earnings, and grow your coaching practice.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Let&apos;s explore the key features
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="upcoming-sessions"]',
    placement: 'bottom',
    title: 'Your Schedule',
    navigateTo: '/coaches',
    content: (
      <div>
        <p className="mb-2">Manage your coaching sessions:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>View today&apos;s and upcoming sessions</li>
          <li>Join video calls</li>
          <li>Reschedule when needed</li>
          <li>Add session notes</li>
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          💡 Prepare notes before each session
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="earnings-overview"]',
    placement: 'bottom',
    title: 'Track Your Earnings',
    content: (
      <div>
        <p className="mb-3">
          Monitor your income with real-time earnings tracking. See total revenue, pending payouts, and financial trends.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Request payouts when you reach the minimum threshold
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="client-stats"]',
    placement: 'left',
    title: 'Client Statistics',
    content: (
      <div>
        <p className="mb-2">Monitor your practice growth:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Total active clients</li>
          <li>Session completion rate</li>
          <li>Client satisfaction ratings</li>
          <li>Practice milestones</li>
        </ul>
      </div>
    )
  }
];

// Coach Clients Tour
export const coachClientsTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Your Clients',
    navigateTo: '/coaches/clients',
    content: (
      <div>
        <p className="mb-3">
          Manage all your clients in one place. View client profiles, track progress, and maintain detailed records of your coaching relationships.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Keep detailed notes for effective coaching
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="client-list"]',
    placement: 'bottom',
    title: 'Client Directory',
    navigateTo: '/coaches/clients',
    content: (
      <div>
        <p className="mb-2">Each client card shows:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Client name and photo</li>
          <li>Coaching goals</li>
          <li>Session history</li>
          <li>Progress indicators</li>
          <li>Last session date</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="client-search"]',
    placement: 'bottom',
    title: 'Search & Filter',
    content: (
      <div>
        <p className="mb-2">Find clients quickly:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Search by name</li>
          <li>Filter by status (active/inactive)</li>
          <li>Sort by recent activity</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="client-actions"]',
    placement: 'top',
    title: 'Client Actions',
    content: (
      <div>
        <p className="mb-2">Quick actions for each client:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>View Profile</strong> - See full details</li>
          <li><strong>Schedule Session</strong> - Book time</li>
          <li><strong>Send Message</strong> - Quick contact</li>
          <li><strong>View Notes</strong> - Access session notes</li>
        </ul>
      </div>
    )
  }
];

// Coach Appointments Tour
// Coach Calendar Tour (for /coaches/calendar page)
export const calendarTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Your Calendar & Appointments',
    navigateTo: '/coaches/calendar',
    content: (
      <div>
        <p className="mb-3">
          Manage your coaching schedule with our integrated calendar. View appointments, set availability, and sync with external calendars.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Keep your calendar updated for smooth operations
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="calendar-tabs"]',
    placement: 'bottom',
    title: 'Calendar Sections',
    navigateTo: '/coaches/calendar',
    content: (
      <div>
        <p className="mb-2">Explore different calendar views:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Today - Quick overview of today&apos;s schedule</li>
          <li>Appointments - Manage all sessions</li>
          <li>Integration - Connect external calendars</li>
          <li>Calendar - Full calendar view</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="today-tab"]',
    placement: 'bottom',
    title: 'Today\'s Overview',
    content: (
      <div>
        <p className="mb-3">
          Get a quick snapshot of today&apos;s appointments and what&apos;s coming up next.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="appointments-tab"]',
    placement: 'bottom',
    title: 'All Appointments',
    content: (
      <div>
        <p className="mb-3">
          View and manage all your scheduled sessions. Filter by status, client, or date range.
        </p>
      </div>
    )
  }
];

export const coachAppointmentsTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Manage Appointments',
    navigateTo: '/coaches/calendar',
    content: (
      <div>
        <p className="mb-3">
          View and manage all your coaching sessions. Keep track of your schedule, prepare for sessions, and maintain session records.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Set your availability to control bookings
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="calendar-view"]',
    placement: 'bottom',
    title: 'Calendar View',
    navigateTo: '/coaches/calendar?activeTab=calendar',
    content: (
      <div>
        <p className="mb-3">
          Visualize your schedule with calendar and list views. Toggle between daily, weekly, and monthly perspectives.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="appointment-filters"]',
    placement: 'bottom',
    title: 'Filter Sessions',
    navigateTo: '/coaches/calendar?activeTab=appointments',
    content: (
      <div>
        <p className="mb-2">Organize appointments:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Upcoming vs completed</li>
          <li>Filter by client</li>
          <li>View cancellations</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="availability-settings"]',
    placement: 'left',
    title: 'Set Availability',
    navigateTo: '/coaches/calendar?activeTab=overview',
    content: (
      <div>
        <p className="mb-3">
          Control when clients can book sessions by setting your available hours, blocking time off, and managing your coaching schedule.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Update availability regularly to avoid conflicts
        </p>
      </div>
    )
  }
];

// Coach Earnings Tour
export const coachEarningsTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Your Earnings',
    navigateTo: '/coaches/revenue',
    content: (
      <div>
        <p className="mb-3">
          Track your coaching income, view transaction history, and manage payouts. Stay on top of your coaching business finances.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Earnings are updated in real-time after each session
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="earnings-summary"]',
    placement: 'bottom',
    title: 'Earnings Summary',
    navigateTo: '/coaches/revenue',
    content: (
      <div>
        <p className="mb-2">Financial overview:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Total earnings (all time)</li>
          <li>This month&apos;s revenue</li>
          <li>Pending payouts</li>
          <li>Available for withdrawal</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="transaction-history"]',
    placement: 'top',
    title: 'Transaction History',
    content: (
      <div>
        <p className="mb-3">
          View detailed transaction records including session payments, refunds, and platform fees. Download statements for your records.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="payout-request"]',
    placement: 'left',
    title: 'Request Payout',
    content: (
      <div>
        <p className="mb-3">
          Request withdrawals when you reach the minimum threshold. Funds are typically transferred within 3-5 business days.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Ensure your payment details are up to date
        </p>
      </div>
    )
  }
];

// Coach Profile Tour
// Coach Profile - Upload Photo Tour
export const uploadPhotoTourSteps: TourStep[] = [
  {
    target: '[data-tour="profile-photo"]',
    placement: 'bottom',
    title: 'Upload Your Photo',
    content: (
      <div>
        <p className="mb-3">
          Add a professional photo to help clients connect with you. A clear, friendly photo builds trust and makes your profile more inviting.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Use a high-quality headshot with good lighting
        </p>
      </div>
    )
  }
];

// Coach Profile - Basic Info Tour
export const basicInfoTourSteps: TourStep[] = [
  {
    target: '[data-tour="basic-info-form"]',
    placement: 'bottom',
    title: 'Complete Your Basic Info',
    content: (
      <div>
        <p className="mb-3">
          Fill in your name, title, and bio. This information helps clients understand who you are and what you offer.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Be clear and authentic about your coaching approach
        </p>
      </div>
    )
  }
];

// Coach Profile - Specializations Tour
export const specializationsTourSteps: TourStep[] = [
  {
    target: '[data-tour="specializations-section"]',
    placement: 'bottom',
    title: 'Add Your Specializations',
    content: (
      <div>
        <p className="mb-3">
          Select your areas of expertise and specialties. This helps clients find you when they&apos;re searching for specific coaching services.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Choose specializations that match your experience
        </p>
      </div>
    )
  }
];

export const coachProfileTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Your Coach Profile',
    navigateTo: '/coaches/profile',
    content: (
      <div>
        <p className="mb-3">
          Manage your professional profile, credentials, and preferences. Your profile is what clients see when they&apos;re looking for a coach.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 A complete profile attracts more clients
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="profile-header"]',
    placement: 'bottom',
    title: 'Profile Header',
    navigateTo: '/coaches/profile',
    content: (
      <div>
        <p className="mb-2">Make a great first impression:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Professional photo</li>
          <li>Your name and title</li>
          <li>Specialties and approach</li>
          <li>Rating and reviews</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="bio-section"]',
    placement: 'bottom',
    title: 'Your Bio',
    navigateTo: '/coaches/profile?tab=basic',
    content: (
      <div>
        <p className="mb-3">
          Share your story, qualifications, and coaching philosophy. Help clients understand your unique approach and expertise.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Be authentic and specific about what you offer
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="credentials"]',
    placement: 'bottom',
    title: 'Credentials & Certifications',
    navigateTo: '/coaches/profile?tab=professional',
    content: (
      <div>
        <p className="mb-3">
          Add your certifications, training, and professional credentials. Build trust by showcasing your qualifications.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="session-pricing"]',
    placement: 'top',
    title: 'Session Pricing',
    navigateTo: '/coaches/profile?tab=basic',
    content: (
      <div>
        <p className="mb-3">
          Set your session rates and package pricing. You have full control over your pricing structure.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Consider offering package discounts
        </p>
      </div>
    )
  }
];
