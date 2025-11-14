'use client';

import { Step } from 'react-joyride';

export const adminWelcomeTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-2">Welcome to Admin Dashboard! 👋</h2>
        <p className="text-gray-600">
          You now have full control over the ACT Coaching platform. Let's take a quick tour to help you get started.
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="admin-dashboard-stats"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Platform Overview</h3>
        <p className="text-gray-600">
          Monitor key platform metrics at a glance: total users, active coaches, appointments, and revenue.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="admin-navigation"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Admin Navigation</h3>
        <p className="text-gray-600">
          Access all admin features through this menu. Manage users, monitor operations, view analytics, and configure system settings.
        </p>
      </div>
    ),
    placement: 'right',
  },
];

export const userManagementTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">User Management Guide 👥</h2>
        <p className="text-gray-600 mb-3">
          Learn how to manage all users on the platform, from clients to coaches and staff members.
        </p>
        <p className="text-sm text-gray-500">
          You have full control over user accounts and permissions.
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="users-tabs"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">User Type Tabs</h3>
        <p className="text-gray-600 mb-3">
          Switch between different user types to manage them separately. Each tab shows users of that specific role.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="all-users-tab"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">👥 All Users Tab</h3>
        <p className="text-gray-600 mb-3">
          View all users across the platform. Search, filter, and manage any user account from this central view.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: Use the search bar to quickly find specific users.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="clients-tab"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">🎯 Clients Tab</h3>
        <p className="text-gray-600 mb-3">
          View and manage all client accounts. Monitor their activity, appointments, and account status.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: You can activate or deactivate client accounts as needed.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="coaches-tab"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">🏆 Coaches Tab</h3>
        <p className="text-gray-600 mb-3">
          Manage all coach accounts, view their profiles, specializations, and performance metrics.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: Monitor coach ratings and session completion rates here.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="staff-tab"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">⚡ Staff Tab</h3>
        <p className="text-gray-600 mb-3">
          Manage staff members and their permissions. Control what features each staff member can access.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: Staff permissions are managed in the Staff Capabilities page.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2 text-green-600">User Management Complete! ✓</h3>
        <p className="text-gray-600">
          You now know how to manage all user types on the platform effectively.
        </p>
      </div>
    ),
    placement: 'center',
  },
];

export const coachApplicationsTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Coach Applications Guide 📝</h2>
        <p className="text-gray-600 mb-3">
          Review and approve new coaches joining the platform. Quality control starts here!
        </p>
        <p className="text-sm text-gray-500">
          Make informed decisions about coach applications.
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="applications-tabs"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Application Status Tabs</h3>
        <p className="text-gray-600 mb-3">
          Filter applications by their current status: pending review, approved, or rejected.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="pending-tab"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">⏳ Pending Applications</h3>
        <p className="text-gray-600 mb-3">
          Review new applications here. Check qualifications, experience, and specializations before approving.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: Click on any application to view full details.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2 text-green-600">Ready to Review! ✓</h3>
        <p className="text-gray-600">
          You're now ready to review and manage coach applications effectively.
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
        <h2 className="text-xl font-bold mb-3">Appointments Monitoring 📅</h2>
        <p className="text-gray-600 mb-3">
          Monitor all coaching sessions across the platform. Track appointments, view details, and ensure smooth operations.
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="appointments-filters"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">📊 Appointment Filters</h3>
        <p className="text-gray-600 mb-3">
          Filter appointments by status, date range, coach, or client. Find specific sessions quickly.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: Use date filters to analyze appointment trends over time.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2 text-green-600">Monitoring Setup Complete! ✓</h3>
        <p className="text-gray-600">
          You can now effectively monitor all appointments on the platform.
        </p>
      </div>
    ),
    placement: 'center',
  },
];

export const financialsTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Financial Management 💰</h2>
        <p className="text-gray-600 mb-3">
          Manage platform finances, monitor transactions, and process coach payouts.
        </p>
        <p className="text-sm text-gray-500">
          Keep track of all financial activities in one place.
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="financial-tabs"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Financial Management Tabs</h3>
        <p className="text-gray-600 mb-3">
          Navigate between revenue overview, transactions, and payout management.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="revenue-tab"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">📈 Revenue Overview</h3>
        <p className="text-gray-600 mb-3">
          View total platform revenue, trends, and financial metrics at a glance.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: Export reports for accounting purposes.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="payouts-tab"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">💸 Payouts Management</h3>
        <p className="text-gray-600 mb-3">
          Review and approve coach payout requests. Ensure coaches are paid accurately and on time.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: Verify payout amounts before approving.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2 text-green-600">Financial Setup Complete! ✓</h3>
        <p className="text-gray-600">
          You're now ready to manage platform finances and coach payouts.
        </p>
      </div>
    ),
    placement: 'center',
  },
];

export const analyticsTourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Platform Analytics 📊</h2>
        <p className="text-gray-600 mb-3">
          Gain insights into platform performance, user engagement, and growth trends.
        </p>
        <p className="text-sm text-gray-500">
          Make data-driven decisions for the platform.
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="analytics-dashboard"]',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">📈 Analytics Dashboard</h3>
        <p className="text-gray-600 mb-3">
          View key metrics including user growth, session completion rates, revenue trends, and more.
        </p>
        <p className="text-sm text-gray-500">
          💡 Tip: Use date range filters to analyze specific time periods.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: 'body',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2 text-green-600">Analytics Ready! ✓</h3>
        <p className="text-gray-600">
          You can now analyze platform performance and make informed decisions.
        </p>
      </div>
    ),
    placement: 'center',
  },
];
