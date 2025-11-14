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

// ==================== COACH TOURS ====================

// Coach Dashboard Welcome Tour
export const coachWelcomeTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Welcome to ACT Coaching!',
    content: (
      <div>
        <p className="mb-3">
          We're excited to have you as a coach on our platform. Let's take a quick tour to help you get started.
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
        These cards show your key metrics: upcoming sessions, total clients, revenue, and messages.
      </p>
    )
  },
  {
    target: '[data-tour="navigation"]',
    placement: 'right',
    title: 'Main Navigation',
    content: (
      <p>
        Navigate through your coaching dashboard using this menu. Manage your availability, appointments, clients, and earnings.
      </p>
    )
  }
];

// Coach Profile Tour
export const coachProfileTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Complete Your Coach Profile',
    content: (
      <div>
        <p className="mb-3">
          A complete profile helps clients connect with you and builds trust. Let's set up your coaching profile!
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Coaches with complete profiles get 3x more bookings!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="profile-photo"]',
    placement: 'bottom',
    title: 'Upload Your Photo',
    content: (
      <div>
        <p className="mb-3">
          Click here to upload a clear, professional headshot. This will be visible to all clients browsing coaches.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Tip: Use a high-quality image with good lighting.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="basic-info-form"]',
    placement: 'top',
    title: 'Basic Information',
    content: (
      <div>
        <p className="mb-3">
          Fill in your contact details and professional information.
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Full name and contact info</li>
          <li>Professional credentials</li>
          <li>Years of experience</li>
          <li>Location and timezone</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="bio-section"]',
    placement: 'top',
    title: 'Your Bio',
    content: (
      <div>
        <p className="mb-3">
          Write a compelling bio that tells clients about your coaching approach and expertise.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Tip: Share your coaching philosophy and what makes you unique!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="specializations-section"]',
    placement: 'top',
    title: 'Add Specializations',
    content: (
      <div>
        <p className="mb-3">
          Select your areas of expertise to help clients find you for their specific needs.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Tip: Add 3-5 specializations that match your expertise.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="save-profile"]',
    placement: 'left',
    title: 'Save Your Changes',
    content: (
      <p>
        Don't forget to save your profile changes! Click this button whenever you update your information.
      </p>
    )
  }
];

// Coach Availability Tour
export const coachAvailabilityTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Set Your Availability',
    content: (
      <div>
        <p className="mb-3">
          Let clients know when you're available for coaching sessions. Set your schedule here!
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 You can update your availability anytime.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="availability-calendar"]',
    placement: 'bottom',
    title: 'Calendar View',
    content: (
      <div>
        <p className="mb-3">
          View and manage your available time slots on the calendar.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Green = Available, Gray = Unavailable, Blue = Booked
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="time-slots"]',
    placement: 'top',
    title: 'Manage Time Slots',
    content: (
      <div>
        <p className="mb-3">
          Add or remove time slots for specific days. Clients can only book during your available hours.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Tip: Keep your availability up to date for better bookings!
        </p>
      </div>
    )
  }
];

// Coach Calendar Tour
export const coachCalendarTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Manage Your Calendar',
    content: (
      <div>
        <p className="mb-3">
          View all your appointments, manage your schedule, and stay organized with your coaching calendar.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Keep track of upcoming sessions and plan your week!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="calendar-tabs"]',
    placement: 'bottom',
    title: 'Calendar Views',
    content: (
      <div>
        <p className="mb-2">Switch between different views:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Today</strong> - See today's sessions</li>
          <li><strong>Appointments</strong> - View all bookings</li>
          <li><strong>Integration</strong> - Connect external calendars</li>
          <li><strong>Calendar</strong> - Month view of your schedule</li>
        </ul>
      </div>
    )
  }
];

// Coach Payment/Billing Tour
export const coachPaymentTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'Manage Your Earnings',
    content: (
      <div>
        <p className="mb-3">
          Track your coaching income, manage payouts, and view your financial history all in one place.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Get paid for your coaching sessions!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="billing-tabs"]',
    placement: 'bottom',
    title: 'Billing Sections',
    content: (
      <div>
        <p className="mb-2">Manage your finances:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Payouts</strong> - Request and track payments</li>
          <li><strong>History</strong> - View past transactions</li>
          <li><strong>Bank Accounts</strong> - Manage payment methods</li>
        </ul>
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
    target: '[data-tour="admin-navigation"]',
    placement: 'right',
    title: 'Admin Navigation',
    content: (
      <p>
        Access all admin features through this menu. Manage users, monitor operations, view analytics, and configure system settings.
      </p>
    )
  }
];

// Admin User Management Tour
export const adminUserManagementTourSteps: TourStep[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'User Management Guide',
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
    content: (
      <div>
        <p className="mb-2">Use these tabs to filter users by role:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>All Users</strong> - View everyone</li>
          <li><strong>Clients</strong> - Client accounts</li>
          <li><strong>Coaches</strong> - Coach accounts</li>
          <li><strong>Staff</strong> - Admin and staff members</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="all-users-tab"]',
    placement: 'bottom',
    title: 'View All Users',
    content: (
      <div>
        <p className="mb-3">
          The "All Users" tab shows every account on the platform with filtering and search options.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Use the search bar to find specific users quickly!
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
    title: 'Coach Applications',
    content: (
      <div>
        <p className="mb-3">
          Review and approve coach applications. Maintain quality by carefully evaluating each applicant.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 You can approve, reject, or request more information.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="applications-tabs"]',
    placement: 'bottom',
    title: 'Application Status',
    content: (
      <div>
        <p className="mb-2">Filter applications by status:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Pending</strong> - New applications awaiting review</li>
          <li><strong>Approved</strong> - Accepted coaches</li>
          <li><strong>Rejected</strong> - Declined applications</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="pending-tab"]',
    placement: 'bottom',
    title: 'Review Pending Applications',
    content: (
      <div>
        <p className="mb-3">
          Click on any application to view full details including credentials, experience, and references.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 Take your time to review each application thoroughly!
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
    title: 'Monitor All Appointments',
    content: (
      <div>
        <p className="mb-3">
          View and manage all coaching appointments across the platform. Monitor bookings, track status, and ensure quality service.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 You have full oversight of all coaching sessions!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="appointments-filters"]',
    placement: 'bottom',
    title: 'Filter Appointments',
    content: (
      <div>
        <p className="mb-2">Filter appointments by:</p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Status</strong> - Scheduled, completed, cancelled</li>
          <li><strong>Date Range</strong> - View specific time periods</li>
          <li><strong>Coach/Client</strong> - Filter by specific users</li>
        </ul>
      </div>
    )
  }
];
