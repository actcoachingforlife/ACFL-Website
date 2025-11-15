'use client';

import { useState, useEffect } from 'react';
import {
  X,
  HelpCircle,
  BookOpen,
  CheckSquare,
  Search,
  Keyboard,
  MessageSquare,
  ChevronRight,
  Play,
  Sparkles,
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  Settings,
  FileText,
  BarChart3,
  Shield,
  Circle,
  CheckCircle2,
  Lightbulb,
  Zap,
  ArrowRight
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import CustomTour from '@/components/onboarding/CustomTour';
import {
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
} from '@/components/onboarding/AdminOnboardingTours';

interface HelpTopic {
  id: string;
  title: string;
  description: string;
  category: 'getting-started' | 'users' | 'coaches' | 'appointments' | 'financials' | 'analytics' | 'settings';
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

interface KeyboardShortcut {
  keys: string[];
  description: string;
  category: string;
}

export default function AdminUserGuide() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'quickstart' | 'faq' | 'shortcuts' | 'checklist'>('quickstart');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTour, setActiveTour] = useState<string | null>(null);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  // Check if on client or coach pages (during impersonation)
  const isOnClientOrCoachPage = pathname.startsWith('/clients') || pathname.startsWith('/coaches');

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

  // Load checklist from localStorage
  useEffect(() => {
    const savedChecklist = localStorage.getItem('adminChecklistProgress');
    if (savedChecklist) {
      setChecklistItems(JSON.parse(savedChecklist));
    } else {
      setChecklistItems(defaultChecklistItems);
    }
  }, []);

  // Save checklist to localStorage
  const saveChecklist = (items: ChecklistItem[]) => {
    setChecklistItems(items);
    localStorage.setItem('adminChecklistProgress', JSON.stringify(items));
  };

  const toggleChecklistItem = (id: string) => {
    const updatedItems = checklistItems.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    saveChecklist(updatedItems);
  };

  const startTour = (tourId: string) => {
    setActiveTour(tourId);
    setIsOpen(false);
  };

  // Help topics organized by category
  const helpTopics: HelpTopic[] = [
    {
      id: 'dashboard-overview',
      title: 'Admin Dashboard Overview',
      description: 'Get familiar with the admin dashboard and key metrics',
      category: 'getting-started',
      icon: BarChart3,
      tourId: 'admin-welcome',
      keywords: ['dashboard', 'overview', 'metrics', 'stats', 'getting started']
    },
    {
      id: 'user-management',
      title: 'Managing Users',
      description: 'Learn how to view, edit, and manage user accounts',
      category: 'users',
      icon: Users,
      tourId: 'user-management',
      keywords: ['users', 'accounts', 'manage', 'edit', 'clients', 'coaches']
    },
    {
      id: 'coach-applications',
      title: 'Reviewing Coach Applications',
      description: 'Review and approve/reject coach applications',
      category: 'coaches',
      icon: UserCheck,
      tourId: 'coach-applications',
      keywords: ['coach', 'applications', 'approve', 'reject', 'review']
    },
    {
      id: 'appointments',
      title: 'Monitoring Appointments',
      description: 'View and manage all platform appointments',
      category: 'appointments',
      icon: Calendar,
      tourId: 'appointments',
      keywords: ['appointments', 'sessions', 'bookings', 'schedule']
    },
    {
      id: 'financials',
      title: 'Financial Management',
      description: 'Track revenue, payments, and manage payouts',
      category: 'financials',
      icon: DollarSign,
      tourId: 'financials',
      keywords: ['financials', 'revenue', 'payments', 'payouts', 'money']
    },
    {
      id: 'analytics',
      title: 'Platform Analytics',
      description: 'View platform metrics and generate reports',
      category: 'analytics',
      icon: BarChart3,
      tourId: 'analytics',
      keywords: ['analytics', 'reports', 'metrics', 'data', 'insights']
    },
    {
      id: 'settings',
      title: 'System Settings',
      description: 'Configure platform settings and permissions',
      category: 'settings',
      icon: Settings,
      tourId: 'settings',
      keywords: ['settings', 'configuration', 'permissions', 'system']
    },
    {
      id: 'blog-management',
      title: 'Blog Management',
      description: 'Create and manage blog posts',
      category: 'settings',
      icon: FileText,
      tourId: 'content',
      keywords: ['blog', 'posts', 'articles', 'writing']
    },
    {
      id: 'page-content',
      title: 'Static Page Content',
      description: 'Edit public pages like About, Contact, Pricing',
      category: 'settings',
      icon: BookOpen,
      tourId: 'page-content',
      keywords: ['content', 'pages', 'static', 'cms', 'about', 'contact']
    },
    {
      id: 'security',
      title: 'Security & Permissions',
      description: 'Manage staff capabilities and access control',
      category: 'settings',
      icon: Shield,
      tourId: 'system-logs',
      keywords: ['security', 'permissions', 'access', 'roles', 'staff']
    }
  ];

  // FAQ items
  const faqItems: FAQ[] = [
    {
      id: 'faq-1',
      question: 'How do I approve a coach application?',
      answer: 'Navigate to Coach Applications from the sidebar, click on a pending application to review their credentials, and use the Approve or Reject buttons. You can also request additional information before making a decision.',
      category: 'Coach Management'
    },
    {
      id: 'faq-2',
      question: 'How can I search for a specific user?',
      answer: 'Go to User Management and use the search bar at the top. You can search by name, email, or user ID. You can also filter by user type (Client, Coach, Staff).',
      category: 'User Management'
    },
    {
      id: 'faq-3',
      question: 'What do the different appointment statuses mean?',
      answer: 'Scheduled: Appointment is confirmed. Pending: Awaiting confirmation. Completed: Session finished. Cancelled: Either party cancelled. No-show: Client didn\'t attend.',
      category: 'Appointments'
    },
    {
      id: 'faq-4',
      question: 'How do I process coach payouts?',
      answer: 'Navigate to Payouts, review pending payout requests, verify the earnings, and approve the payout. The payment will be processed according to the coach\'s payment method on file.',
      category: 'Financials'
    },
    {
      id: 'faq-5',
      question: 'Can I customize staff permissions?',
      answer: 'Yes! Go to Staff Capabilities under System Management. You can create custom roles and assign specific permissions for viewing, editing, and managing different sections of the admin panel.',
      category: 'Settings'
    },
    {
      id: 'faq-6',
      question: 'How do I view system logs?',
      answer: 'Navigate to System Logs under System Management. You can filter by log type, date range, and severity level. Export logs for further analysis if needed.',
      category: 'Settings'
    },
    {
      id: 'faq-7',
      question: 'What reports can I generate?',
      answer: 'Go to Analytics to access various reports including user growth, revenue trends, appointment statistics, coach performance, and platform usage. You can export reports in CSV or PDF format.',
      category: 'Analytics'
    },
    {
      id: 'faq-8',
      question: 'How do I handle user disputes?',
      answer: 'Check the Messages section for user reports. Review appointment history, messages between parties, and any relevant documentation. You can mediate, issue refunds, or take appropriate action based on platform policies.',
      category: 'User Management'
    }
  ];

  // Keyboard shortcuts
  const keyboardShortcuts: KeyboardShortcut[] = [
    { keys: ['Ctrl', 'K'], description: 'Open search', category: 'Navigation' },
    { keys: ['Ctrl', '/'], description: 'Toggle this help panel', category: 'Navigation' },
    { keys: ['Ctrl', 'B'], description: 'Toggle sidebar', category: 'Navigation' },
    { keys: ['Alt', '1'], description: 'Go to Dashboard', category: 'Navigation' },
    { keys: ['Alt', '2'], description: 'Go to Users', category: 'Navigation' },
    { keys: ['Alt', '3'], description: 'Go to Coach Applications', category: 'Navigation' },
    { keys: ['Alt', '4'], description: 'Go to Appointments', category: 'Navigation' },
    { keys: ['Esc'], description: 'Close modal/drawer', category: 'General' },
  ];

  // Default checklist items
  const defaultChecklistItems: ChecklistItem[] = [
    {
      id: 'tour-dashboard',
      title: 'Take the Dashboard Tour',
      description: 'Learn about the admin dashboard and key metrics',
      completed: false,
      tourId: 'admin-welcome'
    },
    {
      id: 'review-users',
      title: 'Review User Management',
      description: 'Understand how to manage users, coaches, and clients',
      completed: false,
      tourId: 'user-management'
    },
    {
      id: 'coach-applications',
      title: 'Learn Coach Application Process',
      description: 'Review how to approve or reject coach applications',
      completed: false,
      tourId: 'coach-applications'
    },
    {
      id: 'monitor-appointments',
      title: 'Monitor Appointments',
      description: 'Learn to view and manage platform appointments',
      completed: false,
      tourId: 'appointments'
    },
    {
      id: 'check-financials',
      title: 'Explore Financial Dashboard',
      description: 'Understand revenue tracking and payout management',
      completed: false,
      tourId: 'financials'
    },
    {
      id: 'view-analytics',
      title: 'Review Platform Analytics',
      description: 'Learn to view metrics and generate reports',
      completed: false,
      tourId: 'analytics'
    },
    {
      id: 'configure-settings',
      title: 'Configure System Settings',
      description: 'Set up permissions and platform configuration',
      completed: false,
      tourId: 'settings'
    },
    {
      id: 'manage-content',
      title: 'Manage Platform Content',
      description: 'Learn to update pages and blog posts',
      completed: false,
      tourId: 'content'
    },
    {
      id: 'review-logs',
      title: 'Review System Logs',
      description: 'Monitor system activity and security',
      completed: false,
      tourId: 'system-logs'
    }
  ];

  // Filter help topics based on search
  const filteredTopics = helpTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter FAQs based on search
  const filteredFAQs = faqItems.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get context-aware help based on current path
  const getContextualHelp = () => {
    if (pathname.includes('/admin/users')) return helpTopics.find(t => t.id === 'user-management');
    if (pathname.includes('/admin/coach-applications')) return helpTopics.find(t => t.id === 'coach-applications');
    if (pathname.includes('/admin/appointments')) return helpTopics.find(t => t.id === 'appointments');
    if (pathname.includes('/admin/financials')) return helpTopics.find(t => t.id === 'financials');
    if (pathname.includes('/admin/analytics')) return helpTopics.find(t => t.id === 'analytics');
    if (pathname.includes('/admin/settings')) return helpTopics.find(t => t.id === 'settings');
    if (pathname.includes('/admin/blog')) return helpTopics.find(t => t.id === 'blog-management');
    if (pathname.includes('/admin/content')) return helpTopics.find(t => t.id === 'page-content');
    if (pathname.includes('/admin/system-logs')) return helpTopics.find(t => t.id === 'security');
    return helpTopics.find(t => t.id === 'dashboard-overview');
  };

  const contextualHelp = getContextualHelp();

  // Calculate progress
  const completedCount = checklistItems.filter(item => item.completed).length;
  const progressPercentage = Math.round((completedCount / checklistItems.length) * 100);

  // Get tour steps based on tour ID
  const getTourSteps = (tourId: string) => {
    switch (tourId) {
      case 'admin-welcome':
        return adminWelcomeTourSteps;
      case 'user-management':
        return adminUserManagementTourSteps;
      case 'coach-applications':
        return adminCoachApplicationsTourSteps;
      case 'appointments':
        return adminAppointmentsTourSteps;
      case 'financials':
        return adminFinancialsTourSteps;
      case 'analytics':
        return adminAnalyticsTourSteps;
      case 'settings':
        return adminSettingsTourSteps;
      case 'content':
        return adminContentTourSteps;
      case 'page-content':
        return adminPageContentTourSteps;
      case 'system-logs':
        return adminSystemLogsTourSteps;
      default:
        return [];
    }
  };

  // Don't render if user guide is disabled
  if (!isEnabled) {
    return null;
  }

  return (
    <>
      {/* Floating Help Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 ${isOnClientOrCoachPage ? 'left-6' : 'right-6'} z-[9997] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 group`}
          aria-label="Open help guide"
        >
          <HelpCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            ?
          </span>
        </button>
      )}

      {/* Help Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-end pt-16">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="relative bg-white dark:bg-gray-900 w-full sm:w-[500px] h-[calc(100%-4rem)] sm:h-[calc(90vh-4rem)] sm:mr-4 sm:my-4 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-in-right border border-gray-200 dark:border-gray-800">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">Admin Guide</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type="text"
                  placeholder="Search help topics, FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>

            {/* Contextual Help Banner */}
            {contextualHelp && !searchQuery && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800 p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      {contextualHelp.title}
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                      {contextualHelp.description}
                    </p>
                    {contextualHelp.tourId && (
                      <button
                        onClick={() => startTour(contextualHelp.tourId!)}
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                      >
                        <Play className="w-4 h-4" />
                        Start Tour
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('quickstart')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'quickstart'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Quick Start
                </button>
                <button
                  onClick={() => setActiveTab('checklist')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'checklist'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <CheckSquare className="w-4 h-4 inline mr-2" />
                  Checklist ({completedCount}/{checklistItems.length})
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'faq'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  FAQ
                </button>
                <button
                  onClick={() => setActiveTab('shortcuts')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'shortcuts'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Keyboard className="w-4 h-4 inline mr-2" />
                  Shortcuts
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Quick Start Tab */}
              {activeTab === 'quickstart' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      Help Topics
                    </h3>
                    <div className="space-y-2">
                      {(searchQuery ? filteredTopics : helpTopics).map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => topic.tourId && startTour(topic.tourId)}
                          className="w-full text-left p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg group-hover:scale-110 transition-transform">
                              <topic.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {topic.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {topic.description}
                              </p>
                            </div>
                            {topic.tourId && (
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                            )}
                          </div>
                        </button>
                      ))}
                      {searchQuery && filteredTopics.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>No help topics found for "{searchQuery}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Checklist Tab */}
              {activeTab === 'checklist' && (
                <div className="space-y-6">
                  {/* Progress */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        Your Progress
                      </span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {progressPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-blue-200 dark:bg-blue-900 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                      {completedCount} of {checklistItems.length} tasks completed
                    </p>
                  </div>

                  {/* Checklist Items */}
                  <div className="space-y-3">
                    {checklistItems.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-lg border transition-all ${
                          item.completed
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                            : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleChecklistItem(item.id)}
                            className="flex-shrink-0 mt-0.5"
                          >
                            {item.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
                            )}
                          </button>
                          <div className="flex-1">
                            <h4 className={`font-medium mb-1 ${
                              item.completed
                                ? 'text-green-900 dark:text-green-100 line-through'
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {item.title}
                            </h4>
                            <p className={`text-sm ${
                              item.completed
                                ? 'text-green-700 dark:text-green-300'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              {item.description}
                            </p>
                            {item.tourId && !item.completed && (
                              <button
                                onClick={() => startTour(item.tourId!)}
                                className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                              >
                                <Play className="w-3.5 h-3.5" />
                                Start Tour
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Tab */}
              {activeTab === 'faq' && (
                <div className="space-y-4">
                  {(searchQuery ? filteredFAQs : faqItems).map((faq) => (
                    <details
                      key={faq.id}
                      className="group p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                    >
                      <summary className="cursor-pointer font-medium text-gray-900 dark:text-white list-none flex items-center justify-between">
                        <span className="flex-1">{faq.question}</span>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {faq.answer}
                        </p>
                        <span className="inline-block mt-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                          {faq.category}
                        </span>
                      </div>
                    </details>
                  ))}
                  {searchQuery && filteredFAQs.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No FAQs found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              )}

              {/* Shortcuts Tab */}
              {activeTab === 'shortcuts' && (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Use these keyboard shortcuts to navigate the admin panel faster.
                  </p>
                  {['Navigation', 'General'].map((category) => (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                        {category}
                      </h3>
                      <div className="space-y-2">
                        {keyboardShortcuts
                          .filter((shortcut) => shortcut.category === category)
                          .map((shortcut, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                            >
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {shortcut.description}
                              </span>
                              <div className="flex items-center gap-1">
                                {shortcut.keys.map((key, keyIndex) => (
                                  <span key={keyIndex}>
                                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-sm">
                                      {key}
                                    </kbd>
                                    {keyIndex < shortcut.keys.length - 1 && (
                                      <span className="mx-1 text-gray-400">+</span>
                                    )}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Need more help?
                </span>
                <a
                  href="mailto:support@acfl.com"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1"
                >
                  Contact Support
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Tour */}
      {activeTour && (
        <CustomTour
          steps={getTourSteps(activeTour)}
          isOpen={true}
          onClose={() => setActiveTour(null)}
          onComplete={() => {
            // Mark related checklist item as complete
            const relatedItem = checklistItems.find(item => item.tourId === activeTour);
            if (relatedItem && !relatedItem.completed) {
              toggleChecklistItem(relatedItem.id);
            }
            setActiveTour(null);
          }}
        />
      )}

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
