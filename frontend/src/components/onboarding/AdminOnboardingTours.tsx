'use client';

// Re-export all admin tour steps from the unified customTourSteps file
export {
  adminWelcomeTourSteps,
  adminUserManagementTourSteps,
  adminCoachApplicationsTourSteps,
  adminAppointmentsTourSteps,
  adminFinancialsTourSteps,
  adminAnalyticsTourSteps,
  adminSettingsTourSteps,
  adminContentTourSteps,
  adminPageContentTourSteps,
  adminSystemLogsTourSteps
} from './customTourSteps';

// Alias exports for backward compatibility
export {
  adminUserManagementTourSteps as userManagementTourSteps,
  adminCoachApplicationsTourSteps as coachApplicationsTourSteps,
  adminAppointmentsTourSteps as appointmentsTourSteps
} from './customTourSteps';
