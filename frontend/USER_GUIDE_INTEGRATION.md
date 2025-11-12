# User Guide Integration Guide

This document explains how to integrate the User Guide system into your application.

## Overview

The User Guide system provides interactive step-by-step tutorials for clients and coaches. It's already integrated into the client and coach layouts and will automatically show/hide based on the `userGuideEnabled` setting.

## How It Works

1. **Floating Help Button**: When enabled, a blue circular button with a "?" icon appears in the bottom-right corner
2. **Guide Menu**: Clicking the button shows available guides for the current page
3. **Step-by-Step Tutorial**: Selecting a guide starts an interactive walkthrough
4. **Progress Tracking**: Completed guides are marked with a checkmark

## Required Data Attributes

To make the guides work, you need to add `data-guide` attributes to specific UI elements:

### For Clients (`/clients/*` pages)

#### Find Coaches Guide
- `data-guide="find-coaches"` - Add to "Find Coaches" navigation link
- `data-guide="search-filter"` - Add to search/filter section on coaches page
- `data-guide="coach-card"` - Add to coach profile cards

#### Book Session Guide
- `data-guide="find-coaches"` - "Find Coaches" navigation link
- `data-guide="coach-card"` - Coach profile cards
- `data-guide="view-profile"` - "View Profile" or similar button on coach cards
- `data-guide="book-session-btn"` - "Book Session" button on coach profile
- `data-guide="payment-form"` - Payment form container

#### Join Session Guide
- `data-guide="appointments"` - "Appointments" navigation link
- `data-guide="upcoming-appointments"` - Upcoming appointments section/tab
- `data-guide="join-btn"` - "Join Session" button on appointments

#### Request Refund Guide
- `data-guide="appointments"` - "Appointments" navigation link
- `data-guide="past-appointments"` - Past appointments section/tab
- `data-guide="request-refund-btn"` - "Request Refund" button

### For Coaches (`/coaches/*` pages)

#### Accept Booking Guide
- `data-guide="calendar"` - "Calendar & Appointments" navigation link
- `data-guide="pending-bookings"` - Pending bookings section
- `data-guide="accept-btn"` - "Accept" button for bookings

#### Find Sessions Guide
- `data-guide="calendar"` - "Calendar & Appointments" navigation link
- `data-guide="upcoming-sessions"` - Upcoming sessions section
- `data-guide="session-details"` - Session detail card/modal

#### Join Session Guide
- `data-guide="calendar"` - "Calendar & Appointments" navigation link
- `data-guide="join-btn"` - "Join Session" button
- `data-guide="end-session-btn"` - "End Session" button (in video call)
- `data-guide="mark-complete-btn"` - "Mark as Complete" button

#### Request Payout Guide
- `data-guide="billing"` - "Billing & Earnings" navigation link
- `data-guide="available-balance"` - Available balance display
- `data-guide="request-payout-btn"` - "Request Payout" button

## Example Implementation

### Navigation Link
```tsx
<Link
  href="/clients/search-coaches"
  data-guide="find-coaches"
  className="..."
>
  Find Coaches
</Link>
```

### Button
```tsx
<button
  onClick={handleBookSession}
  data-guide="book-session-btn"
  className="..."
>
  Book Session
</button>
```

### Card/Section
```tsx
<div
  data-guide="coach-card"
  className="..."
>
  {/* Coach card content */}
</div>
```

## Features

### Client Guides
1. **How to Book a Session** - Complete walkthrough from finding coaches to payment
2. **How to Join a Session** - Guide for joining scheduled video calls
3. **How to Find Coaches** - Browse and filter coaches
4. **How to Request a Refund** - Request refunds for sessions

### Coach Guides
1. **How to Accept a Booking** - Review and accept client bookings
2. **Where to Find Sessions** - Locate scheduled sessions
3. **How to Join a Session** - Join, conduct, and complete sessions
4. **How to Request Payout** - Request payment for completed work

## User Guide Toggle

Users can enable/disable the guide system via:
- Desktop: User dropdown menu (top-right) → User Guide toggle
- Mobile: User dropdown menu → User Guide toggle

The setting is saved to localStorage as `userGuideEnabled` (true/false).

## Customization

The guide system is in `/src/components/UserGuide.tsx`. You can customize:
- Guide content and steps
- Visual styling
- Trigger conditions
- Progress tracking behavior

## Notes

- Guides only show on relevant pages (based on `triggerPaths`)
- Completed guides are marked with a checkmark
- Progress is saved to localStorage
- The floating button appears in bottom-right corner (z-index: 9998)
- Active guides use an overlay (z-index: 9999)
