'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface OnboardingStep {
  id: string;
  title: string;
  completed: boolean;
  action?: () => void;
}

interface OnboardingState {
  // Client onboarding steps
  clientSteps: OnboardingStep[];
  // Coach onboarding steps
  coachSteps: OnboardingStep[];
  // Admin onboarding steps
  adminSteps: OnboardingStep[];
  // Tour states
  showWelcomeTour: boolean;
  showDashboardTour: boolean;
  showSearchTour: boolean;
  showBookingTour: boolean;
  showMessagesTour: boolean;
  showProfileTour: boolean;
  showAppointmentsTour: boolean;
  // Onboarding status
  isOnboardingComplete: boolean;
  hasSeenWelcome: boolean;
}

interface OnboardingContextType extends OnboardingState {
  // Tour control
  startWelcomeTour: () => void;
  startDashboardTour: () => void;
  startSearchTour: () => void;
  startBookingTour: () => void;
  startMessagesTour: () => void;
  startProfileTour: () => void;
  startAppointmentsTour: () => void;
  endTour: (tourName: string) => void;
  // Step management
  completeStep: (stepId: string) => void;
  resetOnboarding: () => void;
  skipOnboarding: () => void;
  // Progress
  getProgress: () => number;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const ONBOARDING_VERSION = 2; // Increment this when steps change

const defaultClientSteps: OnboardingStep[] = [
  { id: 'complete-profile', title: 'Complete your profile', completed: false },
  { id: 'browse-coaches', title: 'Browse available coaches', completed: false },
  { id: 'book-session', title: 'Book your first session', completed: false },
  { id: 'send-message', title: 'Send a message to a coach', completed: false },
  { id: 'view-appointments', title: 'View your scheduled appointments', completed: false },
];

const defaultCoachSteps: OnboardingStep[] = [
  { id: 'upload-photo', title: 'Upload your profile photo', completed: false },
  { id: 'complete-basic-info', title: 'Complete basic information', completed: false },
  { id: 'add-specializations', title: 'Add your specializations', completed: false },
  { id: 'set-availability', title: 'Set your availability', completed: false },
  { id: 'configure-payment', title: 'Configure payment settings', completed: false },
  { id: 'view-calendar', title: 'Explore calendar & appointments', completed: false },
];

const defaultAdminSteps: OnboardingStep[] = [
  { id: 'explore-dashboard', title: 'Explore admin dashboard', completed: false },
  { id: 'manage-users', title: 'Learn user management', completed: false },
  { id: 'review-coach-applications', title: 'Review coach applications', completed: false },
  { id: 'monitor-appointments', title: 'Monitor appointments', completed: false },
  { id: 'manage-financials', title: 'Manage financials & payouts', completed: false },
  { id: 'view-analytics', title: 'View platform analytics', completed: false },
];

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [state, setState] = useState<OnboardingState>({
    clientSteps: defaultClientSteps,
    coachSteps: defaultCoachSteps,
    adminSteps: defaultAdminSteps,
    showWelcomeTour: false,
    showDashboardTour: false,
    showSearchTour: false,
    showBookingTour: false,
    showMessagesTour: false,
    showProfileTour: false,
    showAppointmentsTour: false,
    isOnboardingComplete: false,
    hasSeenWelcome: false,
  });

  // Load onboarding state from localStorage on mount
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const storageKey = `onboarding_${user.id}_${user.role}`;
    const versionKey = `onboarding_version_${user.id}_${user.role}`;
    const savedState = localStorage.getItem(storageKey);
    const savedVersion = localStorage.getItem(versionKey);

    if (savedState && savedVersion === String(ONBOARDING_VERSION)) {
      try {
        const parsed = JSON.parse(savedState);
        // Ensure the saved steps match the current default steps structure
        if (user.role === 'client') {
          parsed.clientSteps = defaultClientSteps.map(defaultStep => {
            const savedStep = parsed.clientSteps?.find((s: OnboardingStep) => s.id === defaultStep.id);
            return savedStep || defaultStep;
          });
        } else if (user.role === 'coach') {
          parsed.coachSteps = defaultCoachSteps.map(defaultStep => {
            const savedStep = parsed.coachSteps?.find((s: OnboardingStep) => s.id === defaultStep.id);
            return savedStep || defaultStep;
          });
        } else if (user.role === 'admin' || user.role === 'staff') {
          parsed.adminSteps = defaultAdminSteps.map(defaultStep => {
            const savedStep = parsed.adminSteps?.find((s: OnboardingStep) => s.id === defaultStep.id);
            return savedStep || defaultStep;
          });
        }
        setState((prev) => ({
          ...prev,
          ...parsed,
        }));
      } catch (error) {
        console.error('Failed to parse onboarding state:', error);
        // Clear invalid data
        localStorage.removeItem(storageKey);
        localStorage.removeItem(versionKey);
      }
    } else {
      // Version mismatch or first time user - reset onboarding
      console.log('Onboarding version mismatch or first time user, resetting...');
      localStorage.removeItem(storageKey);
      localStorage.setItem(versionKey, String(ONBOARDING_VERSION));

      // First time user - show welcome tour
      if (user.role === 'client' || user.role === 'coach' || user.role === 'admin' || user.role === 'staff') {
        setState((prev) => ({ ...prev, showWelcomeTour: true }));
      }
    }
  }, [isAuthenticated, user]);

  // Save onboarding state to localStorage whenever it changes
  useEffect(() => {
    if (!user) return;

    const storageKey = `onboarding_${user.id}_${user.role}`;
    const versionKey = `onboarding_version_${user.id}_${user.role}`;
    localStorage.setItem(storageKey, JSON.stringify(state));
    localStorage.setItem(versionKey, String(ONBOARDING_VERSION));
  }, [state, user]);

  const startWelcomeTour = () => {
    setState((prev) => ({ ...prev, showWelcomeTour: true }));
  };

  const startDashboardTour = () => {
    setState((prev) => ({ ...prev, showDashboardTour: true }));
  };

  const startSearchTour = () => {
    setState((prev) => ({ ...prev, showSearchTour: true }));
  };

  const startBookingTour = () => {
    setState((prev) => ({ ...prev, showBookingTour: true }));
  };

  const startMessagesTour = () => {
    setState((prev) => ({ ...prev, showMessagesTour: true }));
  };

  const startProfileTour = () => {
    setState((prev) => ({ ...prev, showProfileTour: true }));
  };

  const startAppointmentsTour = () => {
    setState((prev) => ({ ...prev, showAppointmentsTour: true }));
  };

  const endTour = (tourName: string) => {
    setState((prev) => ({
      ...prev,
      [`show${tourName.charAt(0).toUpperCase() + tourName.slice(1)}Tour`]: false,
      hasSeenWelcome: tourName === 'welcome' ? true : prev.hasSeenWelcome,
    }));
  };

  const completeStep = (stepId: string) => {
    setState((prev) => {
      const role = user?.role;
      if (role === 'client') {
        const updatedSteps = prev.clientSteps.map((step) =>
          step.id === stepId ? { ...step, completed: true } : step
        );
        const allComplete = updatedSteps.every((step) => step.completed);
        return {
          ...prev,
          clientSteps: updatedSteps,
          isOnboardingComplete: allComplete,
        };
      } else if (role === 'coach') {
        const updatedSteps = prev.coachSteps.map((step) =>
          step.id === stepId ? { ...step, completed: true } : step
        );
        const allComplete = updatedSteps.every((step) => step.completed);
        return {
          ...prev,
          coachSteps: updatedSteps,
          isOnboardingComplete: allComplete,
        };
      } else if (role === 'admin' || role === 'staff') {
        const updatedSteps = prev.adminSteps.map((step) =>
          step.id === stepId ? { ...step, completed: true } : step
        );
        const allComplete = updatedSteps.every((step) => step.completed);
        return {
          ...prev,
          adminSteps: updatedSteps,
          isOnboardingComplete: allComplete,
        };
      }
      return prev;
    });
  };

  const resetOnboarding = () => {
    setState({
      clientSteps: defaultClientSteps,
      coachSteps: defaultCoachSteps,
      adminSteps: defaultAdminSteps,
      showWelcomeTour: false,
      showDashboardTour: false,
      showSearchTour: false,
      showBookingTour: false,
      showMessagesTour: false,
      showProfileTour: false,
      showAppointmentsTour: false,
      isOnboardingComplete: false,
      hasSeenWelcome: false,
    });

    // Clear from localStorage
    if (user) {
      const storageKey = `onboarding_${user.id}_${user.role}`;
      const versionKey = `onboarding_version_${user.id}_${user.role}`;
      localStorage.removeItem(storageKey);
      localStorage.removeItem(versionKey);
    }
  };

  const skipOnboarding = () => {
    setState((prev) => ({
      ...prev,
      showWelcomeTour: false,
      showDashboardTour: false,
      showSearchTour: false,
      showBookingTour: false,
      showMessagesTour: false,
      showProfileTour: false,
      showAppointmentsTour: false,
      isOnboardingComplete: true,
      hasSeenWelcome: true,
    }));
  };

  const getProgress = (): number => {
    const role = user?.role;
    if (role === 'client') {
      const completed = state.clientSteps.filter((step) => step.completed).length;
      return Math.round((completed / state.clientSteps.length) * 100);
    } else if (role === 'coach') {
      const completed = state.coachSteps.filter((step) => step.completed).length;
      return Math.round((completed / state.coachSteps.length) * 100);
    } else if (role === 'admin' || role === 'staff') {
      const completed = state.adminSteps.filter((step) => step.completed).length;
      return Math.round((completed / state.adminSteps.length) * 100);
    }
    return 0;
  };

  const value: OnboardingContextType = {
    ...state,
    startWelcomeTour,
    startDashboardTour,
    startSearchTour,
    startBookingTour,
    startMessagesTour,
    startProfileTour,
    startAppointmentsTour,
    endTour,
    completeStep,
    resetOnboarding,
    skipOnboarding,
    getProgress,
  };

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
