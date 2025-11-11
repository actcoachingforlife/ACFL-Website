"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Settings, Check, X, CheckCircle, Info } from "lucide-react"
import Footer from "@/components/Footer"
import NavbarLandingPage from "@/components/NavbarLandingPage"
import { useState, useEffect } from "react"

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface Toast {
  message: string;
  type: 'success' | 'info';
}

export default function CookieSettingsPage() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always enabled
    functional: true,
    analytics: true,
    marketing: true,
  });
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedPreferences = localStorage.getItem('cookie-preferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({
          essential: true, // Always enabled
          functional: parsed.functional ?? true,
          analytics: parsed.analytics ?? true,
          marketing: parsed.marketing ?? true,
        });
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleToggle = (category: keyof CookiePreferences) => {
    if (category === 'essential') return; // Cannot disable essential cookies

    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleAcceptAll = () => {
    const allEnabled = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allEnabled);
    savePreferences(allEnabled, 'All cookies accepted!');
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    savePreferences(essentialOnly, 'Only essential cookies enabled!');
  };

  const handleSavePreferences = () => {
    savePreferences(preferences, 'Preferences saved successfully!');
  };

  const savePreferences = (prefs: CookiePreferences, message: string) => {
    localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
    localStorage.setItem('cookie-preferences-date', new Date().toISOString());
    localStorage.setItem('cookies-consent', 'accepted');
    localStorage.setItem('cookies-consent-date', new Date().toISOString());

    showToast(message, 'success');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg"
            style={{
              backgroundColor: toast.type === 'success' ? '#10b981' : '#3b82f6',
              color: 'white'
            }}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Info className="w-5 h-5" />
            )}
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 hover:opacity-80 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav>
        <NavbarLandingPage />
      </nav>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="flex items-center justify-center mb-8">
                <Settings className="w-12 h-12 text-brand-teal" />
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-ink-dark mb-4 text-center">
                Cookie Settings
              </h1>

              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Manage your cookie preferences. You can enable or disable different types of cookies
                below. Note that essential cookies cannot be disabled as they are necessary for the
                website to function properly.
              </p>

              {/* Cookie Categories */}
              <div className="space-y-6 mb-8">
                {/* Essential Cookies */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-ink-dark mb-2">
                        Essential Cookies
                      </h3>
                      <p className="text-sm text-gray-600">
                        These cookies are necessary for the website to function and cannot be disabled.
                        They enable core functionality such as security, authentication, and basic features.
                      </p>
                    </div>
                    <div className="ml-4 flex items-center">
                      <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium cursor-not-allowed">
                        Always Active
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Examples: Session management, authentication, security tokens
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-ink-dark mb-2">
                        Functional Cookies
                      </h3>
                      <p className="text-sm text-gray-600">
                        These cookies enable personalized features and remember your preferences such as
                        language settings, theme preferences, and region selection.
                      </p>
                    </div>
                    <div className="ml-4 flex items-center">
                      <button
                        onClick={() => handleToggle('functional')}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                          preferences.functional ? 'bg-brand-teal' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            preferences.functional ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Examples: Language preferences, theme settings, personalized content
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-ink-dark mb-2">
                        Analytics Cookies
                      </h3>
                      <p className="text-sm text-gray-600">
                        These cookies help us understand how visitors interact with our website by collecting
                        and reporting information anonymously. This helps us improve our website performance.
                      </p>
                    </div>
                    <div className="ml-4 flex items-center">
                      <button
                        onClick={() => handleToggle('analytics')}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                          preferences.analytics ? 'bg-brand-teal' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            preferences.analytics ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Examples: Google Analytics, page views, user journey tracking
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-ink-dark mb-2">
                        Marketing Cookies
                      </h3>
                      <p className="text-sm text-gray-600">
                        These cookies track your activity across websites to deliver more relevant advertisements
                        and limit how many times you see the same ad.
                      </p>
                    </div>
                    <div className="ml-4 flex items-center">
                      <button
                        onClick={() => handleToggle('marketing')}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                          preferences.marketing ? 'bg-brand-teal' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            preferences.marketing ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Examples: Advertising networks, retargeting, social media advertising
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <Button
                  onClick={handleRejectAll}
                  variant="outline"
                  className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject All
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="w-full sm:w-auto bg-brand-teal hover:bg-brand-teal/90 text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto bg-brand-teal hover:bg-brand-teal/90 text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Accept All
                </Button>
              </div>

              {/* Additional Information */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  For more information about how we use cookies, please read our{' '}
                  <a href="/cookies" className="text-brand-teal hover:underline">
                    Cookie Policy
                  </a>
                  . If you have any questions, please{' '}
                  <a href="/contact" className="text-brand-teal hover:underline">
                    contact us
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
