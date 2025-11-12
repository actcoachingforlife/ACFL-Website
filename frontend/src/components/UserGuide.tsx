'use client';

import { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, Circle, CheckCircle2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface GuideStep {
  target: string; // CSS selector for the element to highlight
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface GuideConfig {
  id: string;
  title: string;
  welcomeTitle: string;
  welcomeMessage: string;
  steps: GuideStep[];
  triggerPaths: string[]; // Paths where this guide can auto-trigger
}

interface ChecklistItem {
  id: string;
  label: string;
  guideId?: string; // Optional linked guide
}

interface UserGuideProps {
  userRole: 'client' | 'coach';
}

export default function UserGuide({ userRole }: UserGuideProps) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [currentGuide, setCurrentGuide] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showChecklist, setShowChecklist] = useState(true);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [highlightedElement, setHighlightedElement] = useState<DOMRect | null>(null);
  const pathname = usePathname();
  const observerRef = useRef<MutationObserver | null>(null);

  // Load preferences from localStorage
  useEffect(() => {
    const enabled = localStorage.getItem('userGuideEnabled');
    if (enabled !== null) {
      setIsEnabled(enabled === 'true');
    }

    const completed = localStorage.getItem('completedChecklistItems');
    if (completed) {
      setCompletedItems(JSON.parse(completed));
    }

    const checklistHidden = localStorage.getItem('checklistHidden');
    if (checklistHidden === 'true') {
      setShowChecklist(false);
    }

    // Check if user has seen welcome before
    const hasSeenWelcome = localStorage.getItem(`hasSeenWelcome_${userRole}`);
    if (!hasSeenWelcome && enabled !== 'false') {
      // Auto-show welcome on first visit
      setTimeout(() => {
        if (userRole === 'client') {
          setCurrentGuide('onboarding');
          setShowWelcome(true);
        } else if (userRole === 'coach') {
          setCurrentGuide('coach-onboarding');
          setShowWelcome(true);
        }
      }, 1000);
    }
  }, [userRole]);

  // Listen for changes to userGuideEnabled
  useEffect(() => {
    const interval = setInterval(() => {
      const enabled = localStorage.getItem('userGuideEnabled');
      if (enabled !== null && (enabled === 'true') !== isEnabled) {
        setIsEnabled(enabled === 'true');
        if (enabled === 'false') {
          closeGuide();
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isEnabled]);

  const clientGuides: GuideConfig[] = [
    {
      id: 'onboarding',
      title: 'Platform Tour',
      welcomeTitle: 'Welcome to ACFL Coaching! 🎉',
      welcomeMessage: "We're excited to help you on your journey. Let's take a quick tour to show you around the platform.",
      triggerPaths: ['/clients'],
      steps: [
        {
          target: '[data-guide="find-coaches"]',
          title: 'Find Your Coach',
          content: 'Browse our directory of experienced coaches. You can filter by specialty, availability, and price.',
          placement: 'right'
        },
        {
          target: '[data-guide="appointments"]',
          title: 'Your Appointments',
          content: 'View and manage all your scheduled coaching sessions here.',
          placement: 'right'
        },
        {
          target: '.relative [data-guide="appointments"]',
          title: 'Stay Updated',
          content: 'We\'ll notify you here when you have upcoming appointments or new messages.',
          placement: 'bottom'
        },
        {
          target: '[aria-label="User menu"]',
          title: 'Your Account',
          content: 'Access your profile, settings, and toggle this guide on or off anytime.',
          placement: 'bottom'
        }
      ]
    },
    {
      id: 'book-session',
      title: 'Booking a Session',
      welcomeTitle: 'Ready to Book Your First Session? 📅',
      welcomeMessage: 'Let me show you how easy it is to find and book a session with one of our coaches.',
      triggerPaths: ['/clients/search-coaches'],
      steps: [
        {
          target: '[data-guide="search-filter"]',
          title: 'Filter Coaches',
          content: 'Use these filters to find coaches that match your needs and preferences.',
          placement: 'bottom'
        },
        {
          target: '[data-guide="coach-card"]',
          title: 'Coach Profiles',
          content: 'Each card shows the coach\'s specialties, experience, and hourly rate. Click to view their full profile.',
          placement: 'top'
        },
        {
          target: '[data-guide="view-profile"]',
          title: 'View Details',
          content: 'Click here to see the coach\'s full profile and available time slots.',
          placement: 'left'
        }
      ]
    },
    {
      id: 'join-session',
      title: 'Joining Your Session',
      welcomeTitle: 'Time to Join Your Session! 🎥',
      welcomeMessage: 'Here\'s how to join your scheduled coaching sessions.',
      triggerPaths: ['/clients/appointments'],
      steps: [
        {
          target: '[data-guide="upcoming-appointments"]',
          title: 'Upcoming Sessions',
          content: 'Your scheduled sessions appear here. They become joinable 5 minutes before start time.',
          placement: 'bottom'
        },
        {
          target: '[data-guide="join-btn"]',
          title: 'Join the Call',
          content: 'When it\'s time, click this button to enter the video call with your coach.',
          placement: 'left'
        }
      ]
    }
  ];

  const coachGuides: GuideConfig[] = [
    {
      id: 'coach-onboarding',
      title: 'Coach Platform Tour',
      welcomeTitle: 'Welcome to ACFL Coach Portal! 🎉',
      welcomeMessage: "We're excited to have you here. Let's take a quick tour to show you how to manage your coaching business.",
      triggerPaths: ['/coaches'],
      steps: [
        {
          target: '[data-guide="calendar"]',
          title: 'Your Calendar',
          content: 'Manage all your appointments, bookings, and availability here.',
          placement: 'right'
        },
        {
          target: '[data-guide="billing"]',
          title: 'Earnings & Payouts',
          content: 'Track your earnings and request payouts for completed sessions.',
          placement: 'right'
        },
        {
          target: '.relative [data-guide="calendar"]',
          title: 'Booking Notifications',
          content: 'You\'ll be notified here when clients book sessions with you.',
          placement: 'bottom'
        },
        {
          target: '[aria-label="User menu"]',
          title: 'Your Account',
          content: 'Access your profile, settings, and toggle this guide on or off anytime.',
          placement: 'bottom'
        }
      ]
    },
    {
      id: 'accept-booking',
      title: 'Managing Bookings',
      welcomeTitle: 'Managing Client Bookings 📋',
      welcomeMessage: 'Learn how to review and accept booking requests from clients.',
      triggerPaths: ['/coaches/calendar'],
      steps: [
        {
          target: '[data-guide="pending-bookings"]',
          title: 'Pending Requests',
          content: 'New booking requests appear here. Review the client details and time.',
          placement: 'bottom'
        },
        {
          target: '[data-guide="accept-btn"]',
          title: 'Accept or Decline',
          content: 'Click "Accept" to confirm or "Decline" if unavailable. Clients are notified immediately.',
          placement: 'left'
        }
      ]
    },
    {
      id: 'join-session',
      title: 'Conducting Sessions',
      welcomeTitle: 'Conducting Your Sessions 🎥',
      welcomeMessage: 'Here\'s how to join, conduct, and complete coaching sessions.',
      triggerPaths: ['/coaches/calendar'],
      steps: [
        {
          target: '[data-guide="join-btn"]',
          title: 'Join Session',
          content: 'The button becomes active 5 minutes before scheduled time. Click to join.',
          placement: 'left'
        },
        {
          target: '[data-guide="mark-complete-btn"]',
          title: 'Complete Session',
          content: 'After the call, mark the session as complete to finalize payment processing.',
          placement: 'left'
        }
      ]
    }
  ];

  const clientChecklist: ChecklistItem[] = [
    { id: 'complete-profile', label: 'Complete your profile' },
    { id: 'browse-coaches', label: 'Browse available coaches', guideId: 'book-session' },
    { id: 'book-session', label: 'Book your first session', guideId: 'book-session' },
    { id: 'join-session', label: 'Join a coaching session', guideId: 'join-session' },
    { id: 'send-message', label: 'Send a message to a coach' }
  ];

  const coachChecklist: ChecklistItem[] = [
    { id: 'complete-profile', label: 'Complete your profile' },
    { id: 'set-availability', label: 'Set your availability' },
    { id: 'accept-booking', label: 'Accept your first booking', guideId: 'accept-booking' },
    { id: 'conduct-session', label: 'Conduct a coaching session', guideId: 'join-session' },
    { id: 'request-payout', label: 'Request your first payout' }
  ];

  const guides = userRole === 'client' ? clientGuides : coachGuides;
  const checklist = userRole === 'client' ? clientChecklist : coachChecklist;
  const activeGuide = guides.find(g => g.id === currentGuide);

  const updateHighlight = () => {
    if (!activeGuide || showWelcome) {
      setHighlightedElement(null);
      return;
    }

    const step = activeGuide.steps[currentStep];
    const element = document.querySelector(step.target);

    if (element) {
      const rect = element.getBoundingClientRect();
      setHighlightedElement(rect);

      // Scroll element into view if needed
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      setHighlightedElement(null);
    }
  };

  useEffect(() => {
    updateHighlight();

    // Watch for DOM changes
    if (currentGuide && !showWelcome) {
      observerRef.current = new MutationObserver(updateHighlight);
      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [currentGuide, currentStep, showWelcome]);

  const startGuide = (guideId: string) => {
    setCurrentGuide(guideId);
    setCurrentStep(0);
    setShowWelcome(true);
  };

  const startTour = () => {
    setShowWelcome(false);
    setCurrentStep(0);
    localStorage.setItem(`hasSeenWelcome_${userRole}`, 'true');
  };

  const skipTour = () => {
    localStorage.setItem(`hasSeenWelcome_${userRole}`, 'true');
    closeGuide();
  };

  const nextStep = () => {
    if (activeGuide && currentStep < activeGuide.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeGuide();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeGuide = () => {
    closeGuide();
  };

  const closeGuide = () => {
    setCurrentGuide(null);
    setCurrentStep(0);
    setShowWelcome(false);
    setHighlightedElement(null);
  };

  const toggleChecklistItem = (itemId: string) => {
    const updated = completedItems.includes(itemId)
      ? completedItems.filter(id => id !== itemId)
      : [...completedItems, itemId];

    setCompletedItems(updated);
    localStorage.setItem('completedChecklistItems', JSON.stringify(updated));
  };

  const hideChecklist = () => {
    setShowChecklist(false);
    localStorage.setItem('checklistHidden', 'true');
  };

  const skipChecklistForNow = () => {
    setShowChecklist(false);
    // Don't save to localStorage, so it shows again on next visit
  };

  const completionPercentage = Math.round((completedItems.length / checklist.length) * 100);

  if (!isEnabled) {
    return null;
  }

  const getTooltipPosition = () => {
    if (!highlightedElement || !activeGuide) return {};

    const step = activeGuide.steps[currentStep];
    const placement = step.placement || 'bottom';
    const padding = 20;

    switch (placement) {
      case 'top':
        return {
          left: highlightedElement.left + highlightedElement.width / 2,
          top: highlightedElement.top - padding,
          transform: 'translate(-50%, -100%)'
        };
      case 'bottom':
        return {
          left: highlightedElement.left + highlightedElement.width / 2,
          top: highlightedElement.bottom + padding,
          transform: 'translate(-50%, 0)'
        };
      case 'left':
        return {
          left: highlightedElement.left - padding,
          top: highlightedElement.top + highlightedElement.height / 2,
          transform: 'translate(-100%, -50%)'
        };
      case 'right':
        return {
          left: highlightedElement.right + padding,
          top: highlightedElement.top + highlightedElement.height / 2,
          transform: 'translate(0, -50%)'
        };
      default:
        return {};
    }
  };

  return (
    <>
      {/* Getting Started Checklist */}
      {showChecklist && !currentGuide && (
        <div className="fixed top-20 right-6 z-[9998] w-80 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-2xl text-white">
          <div className="p-4 border-b border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-semibold">Getting Started</h3>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span>{completionPercentage}%</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="w-full bg-blue-800/50 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-xs text-blue-100 mt-2">{completionPercentage}% Complete</p>
          </div>

          <div className="p-3 space-y-2 max-h-80 overflow-y-auto">
            {checklist.map((item) => {
              const isCompleted = completedItems.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.guideId) {
                      startGuide(item.guideId);
                    } else {
                      toggleChecklistItem(item.id);
                    }
                  }}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-blue-300 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${isCompleted ? 'line-through opacity-70' : ''}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-3 border-t border-blue-500/30 flex items-center justify-between text-xs">
            <button
              onClick={skipChecklistForNow}
              className="text-blue-100 hover:text-white transition-colors"
            >
              Skip for now
            </button>
            <button
              onClick={hideChecklist}
              className="text-blue-100 hover:text-white transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Hide
            </button>
          </div>
        </div>
      )}

      {/* Active Guide */}
      {currentGuide && activeGuide && (
        <>
          {/* Overlay with cutout */}
          {!showWelcome && highlightedElement && (
            <div
              className="fixed inset-0 z-[9998] pointer-events-none"
              style={{
                background: `radial-gradient(
                  circle ${Math.max(highlightedElement.width, highlightedElement.height) / 2 + 10}px at ${highlightedElement.left + highlightedElement.width / 2}px ${highlightedElement.top + highlightedElement.height / 2}px,
                  transparent 0,
                  rgba(0, 0, 0, 0.5) ${Math.max(highlightedElement.width, highlightedElement.height) / 2 + 10}px
                )`
              }}
            />
          )}

          {/* Backdrop for welcome */}
          {showWelcome && (
            <div className="fixed inset-0 bg-black/50 z-[9998]" />
          )}

          {/* Welcome Modal */}
          {showWelcome && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
              <button
                onClick={skipTour}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {activeGuide.welcomeTitle}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {activeGuide.welcomeMessage}
                </p>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={skipTour}
                    className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Skip Tour
                  </button>
                  <button
                    onClick={startTour}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                  >
                    Next (Step 1 of {activeGuide.steps.length})
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tooltip */}
          {!showWelcome && highlightedElement && (
            <div
              className="fixed z-[9999] bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-sm border border-gray-200 dark:border-gray-700 pointer-events-auto"
              style={getTooltipPosition()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {activeGuide.steps[currentStep].title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Step {currentStep + 1} of {activeGuide.steps.length}
                    </p>
                  </div>
                  <button
                    onClick={closeGuide}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {activeGuide.steps[currentStep].content}
                </p>

                {/* Progress dots */}
                <div className="flex items-center gap-1 mb-4">
                  {activeGuide.steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full flex-1 transition-colors ${
                        index === currentStep
                          ? 'bg-blue-600'
                          : index < currentStep
                          ? 'bg-blue-300'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <button
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    {currentStep === activeGuide.steps.length - 1 ? 'Finish' : 'Next'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
