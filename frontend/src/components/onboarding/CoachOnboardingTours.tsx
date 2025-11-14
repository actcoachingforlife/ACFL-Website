'use client';

// Re-export all coach tour steps from the unified customTourSteps file
export {
  coachWelcomeTourSteps as welcomeTourSteps,
  coachProfileTourSteps as profileTourSteps,
  coachAvailabilityTourSteps as availabilityTourSteps,
  coachCalendarTourSteps,
  coachPaymentTourSteps
} from './customTourSteps';

// Alias exports for backward compatibility
export {
  coachProfileTourSteps as uploadPhotoTourSteps,
  coachProfileTourSteps as basicInfoTourSteps,
  coachProfileTourSteps as specializationsTourSteps,
  coachCalendarTourSteps as calendarTourSteps,
  coachPaymentTourSteps as paymentTourSteps
} from './customTourSteps';
