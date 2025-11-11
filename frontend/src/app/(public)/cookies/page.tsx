"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Cookie, Calendar, CheckCircle, X } from "lucide-react"
import Footer from "@/components/Footer"
import NavbarLandingPage from "@/components/NavbarLandingPage"
import { useState, useEffect } from "react"
import { getApiUrl } from "@/lib/api"

interface StaticContent {
  id: string;
  slug: string;
  title: string;
  content: string;
  content_type: string;
  meta_description?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export default function CookiesPage() {
  const [content, setContent] = useState<StaticContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const handleAccept = () => {
    // Save cookie consent to localStorage
    localStorage.setItem('cookies-consent', 'accepted');
    localStorage.setItem('cookies-consent-date', new Date().toISOString());

    // Show toast notification
    setShowToast(true);

    // Navigate back after showing toast
    setTimeout(() => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/';
      }
    }, 1500);
  };

  const fetchContent = async () => {
    try {
      const response = await fetch(`${getApiUrl()}/api/content/public/content?slug=cookies-policy`);

      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <nav>
          <NavbarLandingPage />
        </nav>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-teal"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white ">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg bg-green-500 text-white"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Cookie policy acknowledged!</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-2 hover:opacity-80 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add custom styles for CMS content */}
      <style jsx global>{`
        .cms-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 1rem;
          margin-top: 1.5rem;
        }
        .cms-content p {
          color: #4b5563;
          margin-bottom: 1.5rem;
          line-height: 1.75;
        }
        .cms-content ul {
          list-style-type: disc;
          list-style-position: inside;
          color: #4b5563;
          margin-bottom: 1.5rem;
        }
        .cms-content ul li {
          margin-bottom: 0.5rem;
        }
        .cms-content br {
          display: block;
          margin-bottom: 0.5rem;
        }
      `}</style>

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
                <Cookie className="w-12 h-12 text-brand-teal" />
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-ink-dark mb-4 text-center">
                {content?.title || "Cookie Policy"}
              </h1>

              <div className="text-center mb-12">
                {content?.updated_at && (
                  <div className="flex items-center justify-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      Last updated: {new Date(content.updated_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                {content?.meta_description && (
                  <p className="text-gray-600 mt-2">
                    {content.meta_description}
                  </p>
                )}
              </div>

              <div className="prose prose-gray max-w-none">
                {content?.content ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content.content
                    }}
                    className="cms-content"
                  />
                ) : (
                  // Fallback content if CMS is not available
                  <>
                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">1. What Are Cookies?</h2>
                    <p className="text-gray-600 mb-6">
                      Cookies are small text files that are placed on your device when you visit our website.
                      They help us provide you with a better experience by remembering your preferences and
                      understanding how you use our services.
                    </p>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">2. Types of Cookies We Use</h2>

                    <h3 className="text-xl font-semibold text-ink-dark mb-3 mt-4">Essential Cookies</h3>
                    <p className="text-gray-600 mb-4">
                      These cookies are necessary for the website to function properly. They enable core
                      functionality such as security, network management, and accessibility.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>Authentication and session management</li>
                      <li>Security and fraud prevention</li>
                      <li>Load balancing</li>
                      <li>Remember your cookie preferences</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-ink-dark mb-3 mt-4">Functional Cookies</h3>
                    <p className="text-gray-600 mb-4">
                      These cookies allow us to remember choices you make and provide enhanced, personalized features.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>Remember your login details</li>
                      <li>Store your language preferences</li>
                      <li>Remember your theme selection (light/dark mode)</li>
                      <li>Personalize content based on your preferences</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-ink-dark mb-3 mt-4">Analytics Cookies</h3>
                    <p className="text-gray-600 mb-4">
                      These cookies help us understand how visitors interact with our website by collecting
                      and reporting information anonymously.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>Page views and navigation patterns</li>
                      <li>Time spent on pages</li>
                      <li>Click tracking and user interactions</li>
                      <li>Error tracking and performance monitoring</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-ink-dark mb-3 mt-4">Marketing Cookies</h3>
                    <p className="text-gray-600 mb-4">
                      These cookies are used to track visitors across websites to display relevant advertisements.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>Track advertising campaign effectiveness</li>
                      <li>Deliver personalized advertisements</li>
                      <li>Limit the number of times you see an ad</li>
                      <li>Measure ad performance and engagement</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">3. Third-Party Cookies</h2>
                    <p className="text-gray-600 mb-6">
                      We use services from trusted third-party providers who may also set cookies. These include:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>Google Analytics - for website analytics</li>
                      <li>Payment processors - for secure transactions</li>
                      <li>Social media platforms - for social sharing features</li>
                      <li>Customer support tools - for live chat functionality</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">4. How Long Do Cookies Last?</h2>

                    <h3 className="text-xl font-semibold text-ink-dark mb-3 mt-4">Session Cookies</h3>
                    <p className="text-gray-600 mb-4">
                      These are temporary cookies that expire when you close your browser. They help us maintain
                      your session as you navigate through our website.
                    </p>

                    <h3 className="text-xl font-semibold text-ink-dark mb-3 mt-4">Persistent Cookies</h3>
                    <p className="text-gray-600 mb-6">
                      These cookies remain on your device for a set period or until you delete them. They help
                      us remember your preferences for future visits. Our persistent cookies typically last:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>Authentication cookies: 30 days</li>
                      <li>Preference cookies: 1 year</li>
                      <li>Analytics cookies: 2 years</li>
                      <li>Marketing cookies: 90 days</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">5. Managing Your Cookie Preferences</h2>
                    <p className="text-gray-600 mb-6">
                      You have control over which cookies you accept. You can manage your preferences through:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>Our cookie consent banner when you first visit the site</li>
                      <li>Your browser settings to block or delete cookies</li>
                      <li>The cookie settings on this page</li>
                      <li>Opting out of third-party advertising cookies</li>
                    </ul>
                    <p className="text-gray-600 mb-6">
                      Please note that blocking certain cookies may impact your experience and limit some
                      features of our website.
                    </p>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">6. Browser Cookie Settings</h2>
                    <p className="text-gray-600 mb-6">
                      Most browsers allow you to control cookies through their settings. Here's how to manage
                      cookies in popular browsers:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>Chrome: Settings &gt; Privacy and security &gt; Cookies</li>
                      <li>Firefox: Settings &gt; Privacy & Security &gt; Cookies and Site Data</li>
                      <li>Safari: Preferences &gt; Privacy &gt; Cookies and website data</li>
                      <li>Edge: Settings &gt; Privacy, search, and services &gt; Cookies</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">7. Do Not Track Signals</h2>
                    <p className="text-gray-600 mb-6">
                      Some browsers support "Do Not Track" signals. When enabled, these signals indicate you
                      prefer not to be tracked. We respect these preferences and honor Do Not Track signals
                      where technically feasible.
                    </p>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">8. Updates to This Policy</h2>
                    <p className="text-gray-600 mb-6">
                      We may update this Cookie Policy from time to time to reflect changes in technology,
                      legislation, or our practices. We will notify you of significant changes through our
                      website or via email.
                    </p>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">9. Contact Us</h2>
                    <p className="text-gray-600 mb-6">
                      If you have questions about our use of cookies or this policy, please contact us at:
                      <br />
                      Email: privacy@actcoachingforlife.com
                      <br />
                      Phone: 1-800-ACT-HELP
                      <br />
                      Address: ACT Coaching For Life, Privacy Department
                    </p>
                  </>
                )}
              </div>

              <div className="mt-12 text-center">
                <Button
                  onClick={handleAccept}
                  className="bg-brand-teal hover:bg-brand-teal/90 text-white"
                >
                  I Understand
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
