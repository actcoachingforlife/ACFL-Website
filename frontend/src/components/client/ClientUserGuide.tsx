'use client';

import { useState, useEffect } from 'react';
import {
  X,
  HelpCircle,
  BookOpen,
  CheckSquare,
  Search,
  Play,
  Users,
  Calendar,
  MessageSquare,
  Circle,
  CheckCircle2,
  Lightbulb,
  Video,
  Star
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import CustomTour from '@/components/onboarding/CustomTour';
import {
  clientDashboardTourSteps,
  clientFindCoachTourSteps,
  clientAppointmentsTourSteps,
  clientMessagesTourSteps,
  clientProfileTourSteps
} from '@/components/onboarding/ClientOnboardingTours';

interface HelpTopic {
  id: string;
  title: string;
  description: string;
  category: 'getting-started' | 'coaching' | 'appointments' | 'account';
  icon: React.ElementType;
  tourId?: string;
  keywords: string[];
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  tourId?: string;
}

export default function ClientUserGuide() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'topics' | 'checklist' | 'faq'>('topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTour, setCurrentTour] = useState<string | null>(null);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  // Load user guide preferences
  useEffect(() => {
    const enabled = localStorage.getItem('userGuideEnabled');
    if (enabled !== null) {
      setIsEnabled(enabled === 'true');
    }

    const savedChecklist = localStorage.getItem('clientChecklistProgress');
    if (savedChecklist) {
      setChecklistItems(JSON.parse(savedChecklist));
    } else {
      setChecklistItems(getDefaultChecklist());
    }
  }, []);

  // Save checklist progress
  useEffect(() => {
    if (checklistItems.length > 0) {
      localStorage.setItem('clientChecklistProgress', JSON.stringify(checklistItems));
    }
  }, [checklistItems]);

  const getDefaultChecklist = (): ChecklistItem[] => [
    {
      id: 'explore-dashboard',
      title: 'Explore Your Dashboard',
      description: 'Learn about your dashboard features',
      completed: false,
      tourId: 'dashboard'
    },
    {
      id: 'find-coach',
      title: 'Find a Coach',
      description: 'Browse and select your ideal coach',
      completed: false,
      tourId: 'find-coach'
    },
    {
      id: 'book-session',
      title: 'Book Your First Session',
      description: 'Schedule your first coaching session',
      completed: false,
      tourId: 'appointments'
    },
    {
      id: 'complete-profile',
      title: 'Complete Your Profile',
      description: 'Add details to personalize your experience',
      completed: false,
      tourId: 'profile'
    },
    {
      id: 'send-message',
      title: 'Message Your Coach',
      description: 'Learn how to communicate with your coach',
      completed: false,
      tourId: 'messages'
    }
  ];

  const helpTopics: HelpTopic[] = [
    {
      id: 'dashboard-overview',
      title: 'Dashboard Overview',
      description: 'Get started with your client dashboard',
      category: 'getting-started',
      icon: BookOpen,
      tourId: 'dashboard',
      keywords: ['dashboard', 'overview', 'home', 'start']
    },
    {
      id: 'find-coach',
      title: 'Finding a Coach',
      description: 'Learn how to browse and select coaches',
      category: 'coaching',
      icon: Users,
      tourId: 'find-coach',
      keywords: ['coach', 'find', 'search', 'browse', 'select']
    },
    {
      id: 'booking-sessions',
      title: 'Booking & Managing Sessions',
      description: 'Schedule and manage your coaching appointments',
      category: 'appointments',
      icon: Calendar,
      tourId: 'appointments',
      keywords: ['appointments', 'booking', 'schedule', 'sessions']
    },
    {
      id: 'messaging',
      title: 'Messaging Your Coach',
      description: 'Communicate with your coach between sessions',
      category: 'coaching',
      icon: MessageSquare,
      tourId: 'messages',
      keywords: ['messages', 'chat', 'communication', 'contact']
    },
    {
      id: 'profile-settings',
      title: 'Profile & Settings',
      description: 'Manage your account and preferences',
      category: 'account',
      icon: HelpCircle,
      tourId: 'profile',
      keywords: ['profile', 'settings', 'account', 'preferences']
    }
  ];

  const faqItems: FAQ[] = [
    {
      id: 'faq-1',
      question: 'How do I find the right coach for me?',
      answer: 'Browse our coach directory, filter by specialty, and read reviews. You can also view each coach\'s profile to learn about their approach and experience.',
      category: 'Coaching'
    },
    {
      id: 'faq-2',
      question: 'How do I book a session?',
      answer: 'Visit a coach\'s profile, click "Book Session", select an available time slot, and confirm your booking. You\'ll receive a confirmation email.',
      category: 'Appointments'
    },
    {
      id: 'faq-3',
      question: 'Can I reschedule or cancel a session?',
      answer: 'Yes! Go to My Appointments, find your session, and click "Reschedule" or "Cancel". Please note cancellation policies may vary by coach.',
      category: 'Appointments'
    },
    {
      id: 'faq-4',
      question: 'How do I message my coach?',
      answer: 'Navigate to Messages from the sidebar and select your coach from the conversation list. You can send text messages anytime.',
      category: 'Messaging'
    },
    {
      id: 'faq-5',
      question: 'What happens during my first session?',
      answer: 'Your first session typically involves getting to know your coach, discussing your goals, and creating a coaching plan together.',
      category: 'Coaching'
    }
  ];

  const getTourSteps = (tourId: string) => {
    switch (tourId) {
      case 'dashboard':
        return clientDashboardTourSteps;
      case 'find-coach':
        return clientFindCoachTourSteps;
      case 'appointments':
        return clientAppointmentsTourSteps;
      case 'messages':
        return clientMessagesTourSteps;
      case 'profile':
        return clientProfileTourSteps;
      default:
        return [];
    }
  };

  const startTour = (tourId: string) => {
    setCurrentTour(tourId);
    setIsTourOpen(true);
    setIsOpen(false);
  };

  const toggleChecklistItem = (id: string) => {
    setChecklistItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getContextualHelp = () => {
    if (pathname.includes('/clients/search-coaches')) return helpTopics.find(t => t.id === 'find-coach');
    if (pathname.includes('/clients/appointments')) return helpTopics.find(t => t.id === 'booking-sessions');
    if (pathname.includes('/clients/messages')) return helpTopics.find(t => t.id === 'messaging');
    if (pathname.includes('/clients/profile')) return helpTopics.find(t => t.id === 'profile-settings');
    return helpTopics.find(t => t.id === 'dashboard-overview');
  };

  const contextualHelp = getContextualHelp();

  const filteredTopics = helpTopics.filter(topic =>
    searchQuery === '' ||
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredFAQs = faqItems.filter(faq =>
    searchQuery === '' ||
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = checklistItems.filter(item => item.completed).length;
  const progressPercentage = (completedCount / checklistItems.length) * 100;

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-6 lg:bottom-24 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 z-[9999] group hover:scale-110"
        aria-label="Open User Guide"
      >
        <HelpCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
          {completedCount}/{checklistItems.length}
        </span>
      </button>

      {/* User Guide Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Client User Guide</h2>
                    <p className="text-blue-100 text-sm">Your coaching journey starts here</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Contextual Help Banner */}
              {contextualHelp && !searchQuery && (
                <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <contextualHelp.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{contextualHelp.title}</h3>
                      <p className="text-sm text-blue-100 mb-2">{contextualHelp.description}</p>
                      {contextualHelp.tourId && (
                        <button
                          onClick={() => startTour(contextualHelp.tourId!)}
                          className="text-sm font-medium text-white hover:text-blue-100 flex items-center gap-1"
                        >
                          <Play className="w-4 h-4" />
                          Start Interactive Tour
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex px-6">
                {[
                  { id: 'topics', label: 'Help Topics', icon: BookOpen },
                  { id: 'checklist', label: 'Getting Started', icon: CheckSquare },
                  { id: 'faq', label: 'FAQ', icon: HelpCircle }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.id === 'checklist' && (
                      <span className="ml-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                        {completedCount}/{checklistItems.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            {(activeTab === 'topics' || activeTab === 'faq') && (
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={activeTab === 'topics' ? 'Search help topics...' : 'Search FAQs...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Help Topics */}
              {activeTab === 'topics' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
                      onClick={() => topic.tourId && startTour(topic.tourId)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg group-hover:scale-110 transition-transform">
                          <topic.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{topic.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{topic.description}</p>
                          {topic.tourId && (
                            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium">
                              <Play className="w-4 h-4" />
                              <span>Start Tour</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Checklist */}
              {activeTab === 'checklist' && (
                <div className="space-y-6">
                  {/* Progress */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Your Progress</h3>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {completedCount === checklistItems.length
                        ? '🎉 Congratulations! You\'ve completed all onboarding steps!'
                        : `${checklistItems.length - completedCount} steps remaining`}
                    </p>
                  </div>

                  {/* Checklist Items */}
                  <div className="space-y-3">
                    {checklistItems.map((item) => (
                      <div
                        key={item.id}
                        className={`border rounded-lg p-4 transition-all ${
                          item.completed
                            ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleChecklistItem(item.id)}
                            className="mt-1"
                          >
                            {item.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                          <div className="flex-1">
                            <h4 className={`font-medium mb-1 ${item.completed ? 'text-green-900 dark:text-green-100 line-through' : 'text-gray-900 dark:text-white'}`}>
                              {item.title}
                            </h4>
                            <p className={`text-sm ${item.completed ? 'text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-400'}`}>
                              {item.description}
                            </p>
                            {item.tourId && !item.completed && (
                              <button
                                onClick={() => startTour(item.tourId!)}
                                className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                              >
                                <Play className="w-3 h-3" />
                                Start guided tour
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {activeTab === 'faq' && (
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <details
                      key={faq.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow group"
                    >
                      <summary className="font-medium text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                        <span>{faq.question}</span>
                        <Play className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                      <span className="inline-block mt-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded">
                        {faq.category}
                      </span>
                    </details>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tour Component */}
      {currentTour && (
        <CustomTour
          steps={getTourSteps(currentTour)}
          isOpen={isTourOpen}
          onClose={() => {
            setIsTourOpen(false);
            setCurrentTour(null);
          }}
          onComplete={() => {
            // Mark the corresponding checklist item as completed
            setChecklistItems(prev =>
              prev.map(item =>
                item.tourId === currentTour ? { ...item, completed: true } : item
              )
            );
            setIsTourOpen(false);
            setCurrentTour(null);
          }}
        />
      )}
    </>
  );
}
