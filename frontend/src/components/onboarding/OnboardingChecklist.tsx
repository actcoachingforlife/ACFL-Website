'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles
} from 'lucide-react';

export default function OnboardingChecklist() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    clientSteps,
    coachSteps,
    isOnboardingComplete,
    skipOnboarding,
  } = useOnboarding();

  const [isExpanded, setIsExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [userGuideEnabled, setUserGuideEnabled] = useState(true);

  // Check localStorage for userGuideEnabled setting
  useEffect(() => {
    const checkUserGuideEnabled = () => {
      const enabled = localStorage.getItem('userGuideEnabled');
      const shouldShow = enabled !== 'false'; // Show by default if not set
      console.log('OnboardingChecklist - userGuideEnabled check:', { enabled, shouldShow });
      setUserGuideEnabled(shouldShow);
    };

    checkUserGuideEnabled();

    // Poll for changes (in case it's toggled from settings)
    const interval = setInterval(checkUserGuideEnabled, 500);
    return () => clearInterval(interval);
  }, []);

  // Show modal when user guide is toggled on
  useEffect(() => {
    if (userGuideEnabled) {
      console.log('User guide enabled - showing checklist modal');
      setIsVisible(true);
      setIsExpanded(true);
    }
  }, [userGuideEnabled]);

  // Debug logging
  useEffect(() => {
    console.log('OnboardingChecklist visibility state:', {
      isVisible,
      isOnboardingComplete,
      userGuideEnabled,
      willRender: isVisible && !isOnboardingComplete && userGuideEnabled
    });
  }, [isVisible, isOnboardingComplete, userGuideEnabled]);

  const steps = user?.role === 'client' ? clientSteps : coachSteps;

  const handleStepClick = (stepId: string) => {
    // Navigate and start appropriate tour based on step
    switch (stepId) {
      case 'browse-coaches':
        // Redirect to find coaches page with tour
        router.push('/clients/search-coaches?startTour=true');
        break;
      case 'complete-profile':
        router.push('/clients/profile?startTour=true');
        break;
      case 'book-session':
        // Redirect to find coaches page with booking flow tour
        router.push('/clients/search-coaches?startTour=true&flow=booking');
        break;
      case 'send-message':
        router.push('/clients/messages?startTour=true');
        break;
      case 'view-appointments':
        router.push('/clients/appointments?startTour=true');
        break;
      default:
        break;
    }
  };

  // Show modal if user guide is enabled and visible, even if onboarding was skipped
  if (!userGuideEnabled || !isVisible) {
    return null;
  }

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleSkip = () => {
    if (window.confirm('Are you sure you want to skip the onboarding checklist? You can always restart it from your settings.')) {
      skipOnboarding();
      setIsVisible(false);
    }
  };

  return (
    <div className="fixed top-20 right-6 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden max-h-[calc(100vh-120px)]">
      {/* Header */}
      <div
        className="bg-gradient-to-r from-sky-500 to-blue-600 text-white p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <h3 className="font-semibold">Getting Started</h3>
          </div>
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronUp className="h-5 w-5" />
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-220px)]">
          {/* Steps List */}
          <div className="space-y-2">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => !step.completed && handleStepClick(step.id)}
                disabled={step.completed}
                className={`w-full flex items-start p-3 rounded-lg border transition-all text-left ${
                  step.completed
                    ? 'bg-green-50 border-green-200 cursor-default'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-blue-300 cursor-pointer'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm ${
                      step.completed
                        ? 'text-green-700 line-through'
                        : 'text-gray-700 font-medium'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Skip for now
            </button>
            <button
              onClick={handleDismiss}
              className="text-sm text-gray-500 hover:text-gray-700 transition flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Hide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
