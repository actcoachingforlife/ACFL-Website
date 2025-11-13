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

export const bookingTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Let's Book Your First Session! 📅</h2>
        <p className="text-gray-600 mb-3">
          We've selected a coach for you. Now let's walk through the booking process step by step.
        </p>
        <p className="text-sm text-gray-500">
          This will take just a few minutes!
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="calendar-section"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 1: Select a Date</h3>
        <p className="text-gray-600 mb-3">
          Choose your preferred date from the calendar. Available dates are highlighted.
        </p>
        <p className="text-sm text-gray-500">
          💡 Use the arrows to navigate between months.
        </p>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '[data-tour="time-slots"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 2: Choose a Time</h3>
        <p className="text-gray-600 mb-3">
          After selecting a date, available time slots will appear here. Pick a time that works best for you.
        </p>
        <p className="text-sm text-gray-500">
          💡 All times are shown in your local timezone.
        </p>
      </div>
    ),
    placement: 'left',
  },
  {
    target: '[data-tour="booking-summary"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 3: Review Your Booking</h3>
        <p className="text-gray-600 mb-3">
          This summary shows all the details of your session including coach, date, time, and duration.
        </p>
        <p className="text-sm text-gray-500">
          💡 Double-check everything is correct before confirming.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="session-notes"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 4: Add Session Notes (Optional)</h3>
        <p className="text-gray-600 mb-3">
          Let your coach know what you'd like to focus on or discuss during the session.
        </p>
        <p className="text-sm text-gray-500">
          💡 This helps your coach prepare and personalize your session.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="confirm-button"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 5: Confirm Your Booking</h3>
        <p className="text-gray-600 mb-3">
          Click "Book Session" to finalize your appointment.
        </p>
        <p className="text-sm text-gray-500">
          💡 You'll receive a confirmation email with the meeting link and details.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">What Happens Next?</h3>
        <p className="text-gray-600 mb-3">
          After confirming your booking:
        </p>
        <ol className="text-sm text-gray-600 space-y-2 mb-3 list-decimal list-inside">
          <li><strong>Confirmation Email</strong> - You'll receive an email with all session details</li>
          <li><strong>Calendar Invite</strong> - Add the appointment to your calendar</li>
          <li><strong>Payment</strong> - Complete payment for your session (if required)</li>
          <li><strong>Join Session</strong> - Access the video call link 15 minutes before your appointment</li>
        </ol>
        <p className="text-sm font-medium text-green-600">
          🎉 You're all set! Your coach is excited to meet you.
        </p>
      </div>
    ),
    placement: 'center',
  },
];

export const appointmentsTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Manage Your Appointments 📅</h2>
        <p className="text-gray-600 mb-3">
          Welcome to your appointments page! Here you can view all your scheduled coaching sessions, filter by status, and join video calls when it's time.
        </p>
        <p className="text-sm text-gray-500">
          Let's take a quick tour of the key features!
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="filter-tabs"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 1: Filter Your Appointments</h3>
        <p className="text-gray-600 mb-3">
          Use these tabs to organize your appointments:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-3 list-disc list-inside">
          <li><strong>Upcoming</strong> - View scheduled sessions</li>
          <li><strong>Past</strong> - Review completed or canceled sessions</li>
          <li><strong>Pending</strong> - See confirmed sessions awaiting payment</li>
          <li><strong>All</strong> - View everything in one place</li>
        </ul>
        <p className="text-xs text-gray-500">
          💡 Each tab shows a count of appointments in that category
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="search-input"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 2: Search for Specific Appointments</h3>
        <p className="text-gray-600 mb-3">
          Need to find a specific session? Use the search bar to filter by:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-3 list-disc list-inside">
          <li>Coach name</li>
          <li>Session notes</li>
          <li>Status (scheduled, confirmed, etc.)</li>
          <li>Date</li>
        </ul>
        <p className="text-xs text-gray-500">
          ⚡ Search results update instantly as you type
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="date-filter"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 3: Filter by Date Range</h3>
        <p className="text-gray-600 mb-3">
          Narrow down appointments by time period:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-2 list-disc list-inside">
          <li><strong>This Week</strong> - Sessions within 7 days</li>
          <li><strong>This Month</strong> - Current month sessions</li>
          <li><strong>Last 3 Months</strong> - Recent history</li>
          <li><strong>All Time</strong> - Everything</li>
        </ul>
      </div>
    ),
    placement: 'left',
  },
  {
    target: '[data-tour="sort-controls"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 4: Sort Your Appointments</h3>
        <p className="text-gray-600 mb-3">
          Organize appointments by your preference:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-3 list-disc list-inside">
          <li><strong>Date Added</strong> - Sort by appointment creation date</li>
          <li><strong>Coach Name</strong> - Alphabetical order</li>
        </ul>
        <p className="text-xs text-gray-500">
          ↕️ Click again to toggle between ascending and descending order
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="appointments-list"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 5: View Your Appointments</h3>
        <p className="text-gray-600 mb-3">
          Each appointment card shows:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-3 list-disc list-inside">
          <li>Coach name and contact info</li>
          <li>Session status (scheduled, confirmed, etc.)</li>
          <li>Date, time, and duration</li>
          <li>Session type and any notes</li>
          <li>Action buttons (join, message)</li>
        </ul>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="appointment-card"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 6: Appointment Details</h3>
        <p className="text-gray-600 mb-3">
          Each card provides all the information you need for your session. The status badge shows whether it's scheduled, confirmed, or completed.
        </p>
        <p className="text-xs text-gray-500">
          📋 Review your appointment details before joining
        </p>
      </div>
    ),
    placement: 'left',
  },
  {
    target: '[data-tour="join-session-button"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 7: Join Your Video Session 🎥</h3>
        <p className="text-gray-600 mb-3">
          When it's time for your appointment, click the <strong>"Join Session"</strong> button to enter the video call.
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-3 list-disc list-inside">
          <li>Button becomes active during your session time</li>
          <li>You'll see a countdown timer before it starts</li>
          <li>Joins a secure video room with your coach</li>
        </ul>
        <p className="text-xs text-gray-500">
          ⏰ Available during your scheduled session time
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="message-coach-button"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 8: Message Your Coach 💬</h3>
        <p className="text-gray-600 mb-3">
          Need to communicate before, during, or after your session? Click the <strong>"Message"</strong> button to chat with your coach.
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-2 list-disc list-inside">
          <li>Ask questions before your session</li>
          <li>Share updates or reschedule</li>
          <li>Follow up after your appointment</li>
        </ul>
      </div>
    ),
    placement: 'top',
  },
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3 text-green-600">You're All Set! 🎉</h2>
        <p className="text-gray-600 mb-3">
          You now know how to manage all your appointments effectively!
        </p>
        <p className="text-sm text-gray-600 mb-3">
          <strong>Quick tips:</strong>
        </p>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Check your upcoming appointments regularly</li>
          <li>Join sessions on time for the best experience</li>
          <li>Message your coach if you have questions</li>
          <li>Use filters to stay organized</li>
        </ul>
      </div>
    ),
    placement: 'center',
  },
];

export const profileTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Complete Your Profile 📝</h2>
        <p className="text-gray-600 mb-3">
          Let's set up your profile! A complete profile helps us match you with the best coaches for your needs.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: The more information you provide, the better we can personalize your experience.
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="edit-profile-btn"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Edit Your Information</h3>
        <p className="text-gray-600">
          Click the "Edit Profile" button to update your personal information, preferences, and bio.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="profile-form"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Fill Out Your Details</h3>
        <p className="text-gray-600 mb-3">
          Complete these fields to help us understand you better:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-2 list-disc list-inside">
          <li><strong>Contact Info</strong> - Keep your email and phone up to date</li>
          <li><strong>Personal Details</strong> - Gender identity, ethnicity, and background</li>
          <li><strong>Preferences</strong> - Areas of concern and coach preferences</li>
          <li><strong>Availability</strong> - When you're available for sessions</li>
        </ul>
      </div>
    ),
    placement: 'top',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Save Your Changes</h3>
        <p className="text-gray-600 mb-3">
          After filling out your information, scroll down and click "Save Changes" to update your profile.
        </p>
        <p className="text-sm text-gray-500">
          🎉 Once saved, you'll be one step closer to finding the perfect coach!
        </p>
      </div>
    ),
    placement: 'center',
  },
];

export const bookingFlowTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Complete Booking Guide 📅</h2>
        <p className="text-gray-600 mb-3">
          We'll walk you through the entire process of booking and paying for your first coaching session.
        </p>
        <p className="text-sm text-gray-500">
          This guide covers everything from finding a coach to completing payment!
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="tabs"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 1: Choose Your View</h3>
        <p className="text-gray-600 mb-3">
          Start on the <strong>"Discover"</strong> tab to see all available coaches.
        </p>
        <p className="text-sm text-gray-500">
          💡 You can switch to "Favorites" later to see coaches you've saved.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="search-filters"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 2: Filter Coaches (Optional)</h3>
        <p className="text-gray-600 mb-3">
          Use filters to narrow down your search:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-2 list-disc list-inside">
          <li>Specialization (anxiety, depression, etc.)</li>
          <li>Price range (based on your budget)</li>
          <li>Language preferences</li>
          <li>Availability</li>
        </ul>
        <p className="text-sm text-gray-500">
          💡 Click "Show Advanced Filters" for more options!
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="coach-cards"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 3: Browse Coach Profiles</h3>
        <p className="text-gray-600 mb-3">
          Each coach card displays important information:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-3 list-disc list-inside">
          <li><strong>Match Score</strong> - How well they fit your needs (0-100%)</li>
          <li><strong>Specializations</strong> - Their areas of expertise</li>
          <li><strong>Experience</strong> - Years of practice</li>
          <li><strong>Session Rate</strong> - Price per hour</li>
          <li><strong>Rating & Reviews</strong> - Feedback from other clients</li>
        </ul>
        <p className="text-sm text-gray-500">
          💡 Higher match scores mean the coach better aligns with your preferences!
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="coach-cards"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 4: Select a Coach</h3>
        <p className="text-gray-600 mb-3">
          When you find a coach you like, <strong>click on their card</strong> to view their full profile.
        </p>
        <p className="text-gray-600 mb-3">
          The profile shows:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-2 list-disc list-inside">
          <li>Detailed bio and approach</li>
          <li>Education & certifications</li>
          <li>Client testimonials</li>
          <li>Availability calendar</li>
        </ul>
        <p className="text-sm font-medium text-blue-600">
          👉 Click a coach card to continue!
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 5: Coach Profile Page</h3>
        <p className="text-gray-600 mb-3">
          Great! You're now viewing the coach's full profile.
        </p>
        <p className="text-gray-600 mb-3">
          Take a moment to review:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-3 list-disc list-inside">
          <li>Their bio and coaching approach</li>
          <li>Experience and certifications</li>
          <li>Session rates and available slots</li>
          <li>Client ratings and reviews</li>
        </ul>
        <p className="text-sm text-gray-500">
          💡 Scroll down to see more details about the coach!
        </p>
      </div>
    ),
    placement: 'center',
  },
  {
    target: '[data-tour="book-session-button"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 6: Book a Session</h3>
        <p className="text-gray-600 mb-3">
          Ready to book? Click the <strong>"Book Paid Session"</strong> button to start the booking process.
        </p>
        <p className="text-gray-600 mb-3">
          This will open the booking calendar where you can:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-3 list-disc list-inside">
          <li>Select your preferred date</li>
          <li>Choose an available time slot</li>
          <li>Add notes for your coach</li>
          <li>Complete payment securely</li>
        </ul>
        <p className="text-sm font-medium text-blue-600">
          👉 Click this button to continue!
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="booking-calendar-container"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 7: Complete Your Booking 📅</h3>
        <p className="text-gray-600 mb-3">
          Perfect! The booking calendar is now open. Follow these steps to complete your booking:
        </p>
        <ol className="text-sm text-gray-600 space-y-2 mb-3 list-decimal list-inside">
          <li><strong>Select a date</strong> - Click on an available date (highlighted)</li>
          <li><strong>Choose a time</strong> - Pick your preferred time slot</li>
          <li><strong>Add notes</strong> (optional) - Share what you'd like to discuss</li>
          <li><strong>Review details</strong> - Check coach, date, time, and cost</li>
          <li><strong>Complete payment</strong> - Pay securely with card, PayPal, or insurance</li>
        </ol>
        <p className="text-sm text-gray-500 mb-2">
          💡 All times are shown in your local timezone.
        </p>
        <p className="text-sm text-gray-500">
          🔒 Payments are encrypted and secure using industry-standard SSL technology.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 8: Confirmation & Next Steps ✅</h3>
        <p className="text-gray-600 mb-3">
          After successful payment, you'll receive:
        </p>
        <ol className="text-sm text-gray-600 space-y-2 mb-3 list-decimal list-inside">
          <li><strong>Confirmation Email</strong> - Receipt and session details</li>
          <li><strong>Calendar Invite</strong> - Add to Google Calendar, Outlook, etc.</li>
          <li><strong>Video Call Link</strong> - Access 15 minutes before your session</li>
          <li><strong>Reminder Notifications</strong> - 24 hours and 1 hour before</li>
        </ol>
        <p className="text-gray-600 mb-3">
          <strong>Before your session:</strong>
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-3 list-disc list-inside">
          <li>Test your camera and microphone</li>
          <li>Find a quiet, private space</li>
          <li>Have your questions/topics ready</li>
        </ul>
        <p className="text-sm font-medium text-green-600">
          🎉 You're all set! Your coach is looking forward to meeting you.
        </p>
      </div>
    ),
    placement: 'center',
  },
];

export const searchCoachesTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Find Your Perfect Coach! 🔍</h2>
        <p className="text-gray-600 mb-3">
          Welcome to the coach search page! Here you can browse and filter through our coaches to find the perfect match.
        </p>
        <p className="text-sm text-gray-500">
          Let's take a quick tour to show you around!
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="tabs"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Discover and Favorites</h3>
        <p className="text-gray-600 mb-3">
          Switch between two views:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-2 list-disc list-inside">
          <li><strong>Discover</strong> - Browse all available coaches</li>
          <li><strong>Favorites</strong> - View coaches you've saved</li>
        </ul>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="search-filters"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Advanced Filters</h3>
        <p className="text-gray-600 mb-3">
          Click "Show Advanced Filters" to narrow your search by specialization, availability, language, and price range.
        </p>
        <p className="text-sm text-gray-500">
          💡 The more specific you are, the better your matches!
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="coach-cards"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Coach Profiles</h3>
        <p className="text-gray-600 mb-3">
          Each coach card shows their match score, specializations, experience, and session rate.
        </p>
        <p className="text-sm text-gray-500">
          💡 Click on any card to view the full profile and book a session!
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="favorites-tab"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Save Your Favorites</h3>
        <p className="text-gray-600 mb-3">
          Click the heart icon on any coach card to save them. Access your saved coaches anytime by clicking here!
        </p>
        <p className="text-sm text-gray-500">
          🎉 You're all set! Start browsing and find your perfect coach.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
];

export const messagesTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Send Messages to Your Coach 💬</h2>
        <p className="text-gray-600 mb-3">
          Welcome to the messaging page! Here you can communicate directly with your coaches.
        </p>
        <p className="text-sm text-gray-500">
          Let's walk through how to send a message!
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="conversations-list"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 1: View Your Conversations</h3>
        <p className="text-gray-600 mb-3">
          This is your conversations list. All your chats with coaches appear here.
        </p>
        <p className="text-gray-600 mb-3">
          Each conversation shows:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-2 list-disc list-inside">
          <li>Coach's name and profile photo</li>
          <li>Last message preview</li>
          <li>Time of last message</li>
          <li>Unread message count (if any)</li>
        </ul>
        <p className="text-sm text-gray-500">
          💡 Conversations are sorted by most recent activity!
        </p>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '[data-tour="conversation-item"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 2: Select a Coach</h3>
        <p className="text-gray-600 mb-3">
          Click on a conversation to open the chat with that coach.
        </p>
        <p className="text-gray-600 mb-3">
          The selected conversation will be highlighted, and their messages will appear on the right.
        </p>
        <p className="text-sm font-medium text-blue-600">
          👉 Click on a conversation to continue!
        </p>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '[data-tour="messages-area"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 3: View Message History</h3>
        <p className="text-gray-600 mb-3">
          This is your message thread with the selected coach.
        </p>
        <p className="text-gray-600 mb-3">
          <strong>Message features:</strong>
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-3 list-disc list-inside">
          <li>Your messages appear on the right (blue)</li>
          <li>Coach's messages appear on the left (gray)</li>
          <li>Scroll to view message history</li>
          <li>File attachments can be downloaded</li>
        </ul>
        <p className="text-sm text-gray-500">
          💡 New messages appear automatically in real-time!
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="message-input"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 4: Type Your Message</h3>
        <p className="text-gray-600 mb-3">
          Click in this field to start typing your message.
        </p>
        <p className="text-gray-600 mb-3">
          <strong>Tips for messaging:</strong>
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-3 list-disc list-inside">
          <li>Be clear and concise</li>
          <li>Share what you'd like to discuss</li>
          <li>Ask questions about scheduling or sessions</li>
          <li>Press Enter to send (or click the send button)</li>
        </ul>
        <p className="text-sm text-gray-500">
          💡 Your coach will be notified when you send a message!
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="attach-button"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 5: Attach Files (Optional)</h3>
        <p className="text-gray-600 mb-3">
          Need to share a file? Click this button to attach documents, images, or other files.
        </p>
        <p className="text-gray-600 mb-3">
          <strong>Supported file types:</strong>
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-2 list-disc list-inside">
          <li>Images (PNG, JPG, etc.)</li>
          <li>Documents (PDF, Word, etc.)</li>
          <li>Audio and video files</li>
          <li>Compressed files (ZIP)</li>
        </ul>
        <p className="text-sm text-gray-500">
          💡 This is great for sharing journal entries, worksheets, or forms!
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="send-button"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Step 6: Send Your Message</h3>
        <p className="text-gray-600 mb-3">
          Once you've typed your message, click this button to send it to your coach.
        </p>
        <p className="text-gray-600 mb-3">
          <strong>What happens next:</strong>
        </p>
        <ol className="text-sm text-gray-600 space-y-1 mb-3 list-decimal list-inside">
          <li>Your message appears immediately in the chat</li>
          <li>Your coach receives a notification</li>
          <li>They'll respond when available</li>
          <li>You'll be notified of their reply</li>
        </ol>
        <p className="text-sm font-medium text-blue-600">
          👉 Click to send your message!
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">You're Ready to Message! ✅</h3>
        <p className="text-gray-600 mb-3">
          You now know how to communicate with your coaches through messages.
        </p>
        <p className="text-gray-600 mb-3">
          <strong>Quick tips:</strong>
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mb-3 list-disc list-inside">
          <li>Check messages regularly for coach responses</li>
          <li>Use messages for quick questions and updates</li>
          <li>Be respectful and professional</li>
          <li>Response times may vary by coach availability</li>
        </ul>
        <p className="text-sm font-medium text-green-600">
          🎉 Start messaging and stay connected with your coach!
        </p>
      </div>
    ),
    placement: 'center',
  },
];
