'use client';

import { Step } from 'react-joyride';

export const welcomeTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-2">Welcome to ACT Coaching! 🎉</h2>
        <p className="text-gray-600">
          We're excited to help you on your journey. Let's take a quick tour to show you around the platform.
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="dashboard-stats"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Your Dashboard Overview</h3>
        <p className="text-gray-600">
          These cards show your key metrics: upcoming sessions, saved coaches, completed sessions, and messages.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="quick-actions"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
        <p className="text-gray-600">
          Use these buttons to quickly access the most common tasks: finding coaches, viewing appointments, and checking messages.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="navigation"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Main Navigation</h3>
        <p className="text-gray-600">
          Navigate through the platform using this menu. You can search for coaches, manage appointments, view messages, and more.
        </p>
      </div>
    ),
    placement: 'right',
  },
];

export const searchCoachesTourSteps: Step[] = [
  {
    target: '[data-tour="search-bar"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Search for Coaches</h3>
        <p className="text-gray-600">
          Use the search bar to find coaches by name, specialization, or expertise. Try typing keywords like "anxiety" or "stress management".
        </p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '[data-tour="filters"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Filter Your Search</h3>
        <p className="text-gray-600">
          Narrow down your search using filters like specialization, experience level, price range, and languages. The more specific you are, the better the matches!
        </p>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '[data-tour="match-score"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Understanding Match Scores</h3>
        <p className="text-gray-600">
          Each coach has a match score based on your preferences and assessment responses. Higher scores mean better alignment with your needs.
        </p>
      </div>
    ),
    placement: 'left',
  },
  {
    target: '[data-tour="save-coach"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Save Your Favorites</h3>
        <p className="text-gray-600">
          Click the heart icon to save coaches to your favorites. You can access them later from the "Favorites" tab.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="coach-profile"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">View Full Profile</h3>
        <p className="text-gray-600">
          Click "View Profile" to see detailed information about a coach including their bio, specializations, approach, and client reviews.
        </p>
      </div>
    ),
    placement: 'top',
  },
];

export const bookingTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-2">Ready to Book Your First Session? 📅</h2>
        <p className="text-gray-600 mb-3">
          Let me show you how easy it is to find and book a session with one of our coaches.
        </p>
        <p className="text-sm text-gray-500">
          This will only take a moment. Click "Next" to continue.
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="coach-grid"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 1: Choose Your Coach</h3>
        <p className="text-gray-600 mb-3">
          Browse through our available coaches below. Each card shows their name, email, and bio.
        </p>
        <p className="text-sm font-medium text-blue-600 mb-2">
          👉 Click on any coach card to proceed to the booking calendar.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: Take your time to read their bios and find someone who fits your needs.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
        <p className="text-gray-600 mb-3">
          After selecting a coach, you'll see a calendar where you can:
        </p>
        <ol className="text-sm text-gray-600 space-y-2 mb-3 list-decimal list-inside">
          <li><strong>Pick a date</strong> - Select your preferred day from the calendar</li>
          <li><strong>Choose a time</strong> - Available time slots will appear on the right</li>
          <li><strong>Add notes (optional)</strong> - Let your coach know what you'd like to focus on</li>
          <li><strong>Confirm booking</strong> - Review and confirm your session</li>
        </ol>
        <p className="text-sm text-gray-500">
          🎉 That's it! You'll receive a confirmation email with meeting details.
        </p>
      </div>
    ),
    placement: 'center',
  },
];

export const appointmentsTourSteps: Step[] = [
  {
    target: '[data-tour="appointments-tabs"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Manage Your Appointments</h3>
        <p className="text-gray-600">
          Use these tabs to filter your appointments: Upcoming (scheduled), Past (completed/canceled), Pending (awaiting confirmation), or view All.
        </p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '[data-tour="search-filter"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Search and Filter</h3>
        <p className="text-gray-600">
          Search by coach name or date, and use the date range filter to find specific appointments.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="join-session"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Joining Video Sessions</h3>
        <p className="text-gray-600">
          The "Join Session" button becomes active 15 minutes before your appointment. Click it when it's time to start your video call.
        </p>
      </div>
    ),
    placement: 'left',
  },
  {
    target: '[data-tour="message-coach"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Message Your Coach</h3>
        <p className="text-gray-600">
          Need to communicate before your session? Click here to send a message to your coach.
        </p>
      </div>
    ),
    placement: 'top',
  },
];

export const messagesTourSteps: Step[] = [
  {
    target: '[data-tour="conversations-list"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Your Conversations</h3>
        <p className="text-gray-600">
          All your message threads with coaches appear here. Unread messages are highlighted with a badge showing the count.
        </p>
      </div>
    ),
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '[data-tour="message-search"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Search Conversations</h3>
        <p className="text-gray-600">
          Quickly find a conversation by searching for the coach's name.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="message-input"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Send Messages</h3>
        <p className="text-gray-600">
          Type your message here and click send. You can also attach files like documents or images using the attachment button.
        </p>
      </div>
    ),
    placement: 'top',
  },
];
