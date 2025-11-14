'use client';

import { Step } from 'react-joyride';

export const welcomeTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-2">Welcome to ACT Coaching! 🎉</h2>
        <p className="text-gray-600">
          We're excited to have you as a coach on our platform. Let's take a quick tour to help you get started.
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
          These cards show your key metrics: upcoming sessions, total clients, revenue, and messages.
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
          Navigate through your coaching dashboard using this menu. Manage your availability, appointments, clients, and earnings.
        </p>
      </div>
    ),
    placement: 'right',
  },
];

export const uploadPhotoTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Upload Your Profile Photo 📸</h2>
        <p className="text-gray-600 mb-3">
          A professional profile photo helps clients connect with you and builds trust.
        </p>
        <p className="text-sm text-gray-500">
          Let's add your photo now!
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="profile-photo"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Upload Your Photo</h3>
        <p className="text-gray-600 mb-3">
          Click here to upload a clear, professional headshot. This will be visible to all clients browsing coaches.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: Use a high-quality image with good lighting.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2 text-green-600">Great Job! ✓</h3>
        <p className="text-gray-600">
          Once you've uploaded your photo, you'll be one step closer to completing your profile!
        </p>
      </div>
    ),
    placement: 'center',
  },
];

export const basicInfoTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Complete Your Basic Information ✍️</h2>
        <p className="text-gray-600 mb-3">
          Fill in your basic details so clients can learn more about you and your coaching style.
        </p>
        <p className="text-sm text-gray-500">
          This should only take a few minutes!
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="basic-info-form"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Your Personal Details</h3>
        <p className="text-gray-600 mb-3">
          Enter your name, professional title, and other essential information here.
        </p>
        <p className="text-sm text-gray-500">
          💡 Make sure all fields are accurate and professional.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="bio-section"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Your Biography</h3>
        <p className="text-gray-600 mb-3">
          Write a compelling bio that highlights your experience, qualifications, and coaching philosophy.
        </p>
        <p className="text-sm text-gray-500">
          💡 A good bio helps clients understand your unique approach.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="save-profile"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Save Your Changes</h3>
        <p className="text-gray-600">
          Don't forget to click this button to save your profile information!
        </p>
      </div>
    ),
    placement: 'top',
  },
];

export const specializationsTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Add Your Specializations 🎯</h2>
        <p className="text-gray-600 mb-3">
          Let clients know what areas you specialize in so they can find the right coach for their needs.
        </p>
        <p className="text-sm text-gray-500">
          You can add multiple specializations!
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="specializations-section"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Your Coaching Areas</h3>
        <p className="text-gray-600 mb-3">
          Select or add the areas where you have expertise. This helps clients find you when searching for specific coaching services.
        </p>
        <p className="text-sm text-gray-500">
          💡 Examples: Life Coaching, Career Coaching, Health & Wellness, etc.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2 text-green-600">Excellent! ✓</h3>
        <p className="text-gray-600">
          Your specializations will help clients discover you when they search for coaches in your areas of expertise.
        </p>
      </div>
    ),
    placement: 'center',
  },
];

export const availabilityTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Set Your Availability ⏰</h2>
        <p className="text-gray-600 mb-3">
          Define when you're available for coaching sessions. This allows clients to book appointments at times that work for you.
        </p>
        <p className="text-sm text-gray-500">
          You can always update this later!
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="availability-calendar"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Your Availability Calendar</h3>
        <p className="text-gray-600 mb-3">
          Use this calendar to set your available days and time slots. Clients will only see times when you're available.
        </p>
        <p className="text-sm text-gray-500">
          💡 You can set different availability for different days.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="time-slots"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Add Time Slots</h3>
        <p className="text-gray-600 mb-3">
          Click here to add specific time slots when you're available for sessions.
        </p>
        <p className="text-sm text-gray-500">
          💡 Consider your timezone and peak booking times.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2 text-green-600">Perfect! ✓</h3>
        <p className="text-gray-600">
          Your availability is now set. Clients can book sessions during your available time slots.
        </p>
      </div>
    ),
    placement: 'center',
  },
];

export const paymentTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Configure Payment Settings 💳</h2>
        <p className="text-gray-600 mb-3">
          Set up your payment information to receive earnings from your coaching sessions.
        </p>
        <p className="text-sm text-gray-500">
          This is the final step to complete your profile!
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="billing-tabs"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Billing Management Tabs</h3>
        <p className="text-gray-600 mb-3">
          These tabs help you manage different aspects of your earnings and payments. Let's explore each one!
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="payouts-tab"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">💰 Payouts Tab</h3>
        <p className="text-gray-600 mb-3">
          Request withdrawals of your earnings here. You can transfer your available balance to your connected bank account.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: You can request payouts anytime your balance is above the minimum threshold.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="history-tab"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">📊 History Tab</h3>
        <p className="text-gray-600 mb-3">
          View all your past transactions, completed sessions, and payment history. Track your earnings over time.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: Use this for tax records and financial tracking.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="bank-accounts-tab"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">🏦 Bank Accounts Tab</h3>
        <p className="text-gray-600 mb-3">
          Connect and manage your bank accounts here. This is where payouts will be sent when you request them.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: You must add a bank account before you can receive payouts.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2 text-green-600">All Set! 🎉</h3>
        <p className="text-gray-600 mb-3">
          You're now ready to start accepting clients and earning from your coaching sessions!
        </p>
        <p className="text-sm text-gray-500">
          Don't forget to add your bank account in the "Bank Accounts" tab to receive payments.
        </p>
      </div>
    ),
    placement: 'center',
  },
];

export const calendarTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Calendar & Appointments Guide 📅</h2>
        <p className="text-gray-600 mb-3">
          Learn how to manage your appointments and calendar integrations in one convenient place.
        </p>
        <p className="text-sm text-gray-500">
          Let's explore the different sections!
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="calendar-tabs"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Calendar Management Tabs</h3>
        <p className="text-gray-600 mb-3">
          These tabs organize all your calendar and appointment management features. Let's walk through each one!
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="today-tab"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">📋 Today Tab</h3>
        <p className="text-gray-600 mb-3">
          View your schedule for today at a glance. See upcoming appointments, quick actions, and integration status all in one place.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: This is your command center for daily appointment management.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="appointments-tab"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">📅 All Appointments Tab</h3>
        <p className="text-gray-600 mb-3">
          View and manage all your appointments across all time periods. Filter by status, search for specific clients, and see detailed appointment information.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: Use filters to find past, upcoming, or pending appointments quickly.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="integration-tab"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">🔗 Integration Tab</h3>
        <p className="text-gray-600 mb-3">
          Connect external calendars like Google Calendar to automatically sync your coaching appointments. Keep all your schedules in one place!
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: Syncing with Google Calendar helps prevent double-booking and keeps you organized.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="calendar-view-tab"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">📆 Calendar View Tab</h3>
        <p className="text-gray-600 mb-3">
          See your appointments in a traditional monthly calendar layout. Navigate between months and view appointment details at a glance.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: Click on any date to see detailed appointment information for that day.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2 text-green-600">You're All Set! 🎉</h3>
        <p className="text-gray-600 mb-3">
          You now know how to manage your calendar and appointments effectively!
        </p>
        <p className="text-sm text-gray-500">
          Explore each tab to get familiar with all the features available to you.
        </p>
      </div>
    ),
    placement: 'center',
  },
];
