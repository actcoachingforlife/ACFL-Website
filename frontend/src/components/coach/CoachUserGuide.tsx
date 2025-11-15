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
  coachDashboardTourSteps,
  coachClientsTourSteps,
  coachAppointmentsTourSteps,
  coachEarningsTourSteps,
  coachProfileTourSteps
} from '@/components/onboarding/CoachOnboardingTours';

interface HelpTopic {
  id: string;
  title: string;
  description: string;
  category: 'getting-started' | 'business' | 'clients' | 'account';
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

export default function CoachUserGuide() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'topics' | 'checklist' | 'faq'>('topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTour, setCurrentTour] = useState<string | null>(null);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  // Check if user guide is enabled
  useEffect(() => {
    const checkEnabled = () => {
      const enabled = localStorage.getItem('userGuideEnabled');
      setIsEnabled(enabled === null || enabled === 'true');
    };

    checkEnabled();

    // Listen for changes to userGuideEnabled
    const interval = setInterval(checkEnabled, 500);
    return () => clearInterval(interval);
  }, []);

  // Load checklist progress
  useEffect(() => {
    const savedChecklist = localStorage.getItem('coachChecklistProgress');
    if (savedChecklist) {
      setChecklistItems(JSON.parse(savedChecklist));
    } else {
      setChecklistItems(getDefaultChecklist());
    }
  }, []);

  // Save checklist progress
  useEffect(() => {
    if (checklistItems.length > 0) {
      localStorage.setItem('coachChecklistProgress', JSON.stringify(checklistItems));
    }
  }, [checklistItems]);

  const getDefaultChecklist = (): ChecklistItem[] => [
    {
      id: 'explore-dashboard',
      title: 'Explore Your Dashboard',
      description: 'Learn about your coach dashboard features',
      completed: false,
      tourId: 'dashboard'
    },
    {
      id: 'complete-profile',
      title: 'Complete Your Profile',
      description: 'Set up your professional coach profile',
      completed: false,
      tourId: 'profile'
    },
    {
      id: 'set-availability',
      title: 'Set Your Availability',
      description: 'Configure when clients can book sessions',
      completed: false,
      tourId: 'appointments'
    },
    {
      id: 'manage-clients',
      title: 'View Your Clients',
      description: 'Learn to manage your client relationships',
      completed: false,
      tourId: 'clients'
    },
    {
      id: 'track-earnings',
      title: 'Track Your Earnings',
      description: 'Understand your income and payouts',
      completed: false,
      tourId: 'earnings'
    }
  ];

  const helpTopics: HelpTopic[] = [
    {
      id: 'dashboard-overview',
      title: 'Dashboard Overview',
      description: 'Get started with your coach dashboard',
      category: 'getting-started',
      icon: BookOpen,
      tourId: 'dashboard',
      keywords: ['dashboard', 'overview', 'home', 'start']
    },
    {
      id: 'client-management',
      title: 'Managing Clients',
      description: 'Learn how to manage your client relationships',
      category: 'clients',
      icon: Users,
      tourId: 'clients',
      keywords: ['clients', 'manage', 'relationships', 'notes']
    },
    {
      id: 'appointments-scheduling',
      title: 'Appointments & Scheduling',
      description: 'Manage sessions and set your availability',
      category: 'business',
      icon: Calendar,
      tourId: 'appointments',
      keywords: ['appointments', 'schedule', 'availability', 'sessions']
    },
    {
      id: 'earnings-payouts',
      title: 'Earnings & Payouts',
      description: 'Track income and request payouts',
      category: 'business',
      icon: Star,
      tourId: 'earnings',
      keywords: ['earnings', 'income', 'payouts', 'money', 'revenue']
    },
    {
      id: 'profile-settings',
      title: 'Profile & Settings',
      description: 'Manage your professional profile and preferences',
      category: 'account',
      icon: HelpCircle,
      tourId: 'profile',
      keywords: ['profile', 'settings', 'account', 'credentials']
    }
  ];

  const faqItems: FAQ[] = [
    {
      id: 'faq-1',
      question: 'How do I set my availability?',
      answer: 'Go to Appointments and click "Set Availability". Define your available hours for each day of the week. Clients can only book during these times.',
      category: 'Scheduling'
    },
    {
      id: 'faq-2',
      question: 'How do I get paid for sessions?',
      answer: 'Payments are processed automatically after each completed session. Your earnings accumulate in your account, and you can request payouts once you reach the minimum threshold.',
      category: 'Earnings'
    },
    {
      id: 'faq-3',
      question: 'Can I set my own session prices?',
      answer: 'Yes! Go to your Profile settings to set your session rates. You can offer different pricing for individual sessions, packages, or specialties.',
      category: 'Pricing'
    },
    {
      id: 'faq-4',
      question: 'How do I manage client notes?',
      answer: 'Navigate to Clients, select a client, and add notes after each session. Notes are private and help you track progress over time.',
      category: 'Client Management'
    },
    {
      id: 'faq-5',
      question: 'What if I need to cancel a session?',
      answer: 'Go to Appointments, find the session, and click "Cancel". Notify your client as soon as possible. Frequent cancellations may affect your rating.',
      category: 'Scheduling'
    }
  ];

  const getTourSteps = (tourId: string) => {
    switch (tourId) {
      case 'dashboard':
        return coachDashboardTourSteps;
      case 'clients':
        return coachClientsTourSteps;
      case 'appointments':
        return coachAppointmentsTourSteps;
      case 'earnings':
        return coachEarningsTourSteps;
      case 'profile':
        return coachProfileTourSteps;
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
    if (pathname.includes('/coaches/clients')) return helpTopics.find(t => t.id === 'client-management');
    if (pathname.includes('/coaches/calendar')) return helpTopics.find(t => t.id === 'appointments-scheduling');
    if (pathname.includes('/coaches/revenue')) return helpTopics.find(t => t.id === 'earnings-payouts');
    if (pathname.includes('/coaches/profile')) return helpTopics.find(t => t.id === 'profile-settings');
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
                    <h2 className="text-2xl font-bold">Coach User Guide</h2>
                    <p className="text-blue-100 text-sm">Build your coaching practice</p>
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
