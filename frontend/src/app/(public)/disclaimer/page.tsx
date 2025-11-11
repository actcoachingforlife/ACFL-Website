"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle, Calendar, CheckCircle, X } from "lucide-react"
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

export default function DisclaimerPage() {
  const [content, setContent] = useState<StaticContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const handleAccept = () => {
    // Save disclaimer acknowledgment to localStorage
    localStorage.setItem('disclaimer-acknowledged', 'true');
    localStorage.setItem('disclaimer-acknowledged-date', new Date().toISOString());

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
      const response = await fetch(`${getApiUrl()}/api/content/public/content?slug=disclaimer`);

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
            <span className="font-medium">Disclaimer acknowledged!</span>
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
                <AlertCircle className="w-12 h-12 text-brand-teal" />
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-ink-dark mb-4 text-center">
                {content?.title || "Disclaimer"}
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
                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">General Information</h2>
                    <p className="text-gray-600 mb-6">
                      The information provided by ACT Coaching For Life ("we," "us," or "our") on this website
                      and through our services is for general informational purposes only. All information is
                      provided in good faith; however, we make no representation or warranty of any kind,
                      express or implied, regarding the accuracy, adequacy, validity, reliability, availability,
                      or completeness of any information on the site or through our services.
                    </p>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">Not Professional Medical or Mental Health Advice</h2>
                    <p className="text-gray-600 mb-6">
                      <strong>IMPORTANT:</strong> The coaching services provided by ACT Coaching For Life are not
                      a substitute for professional medical advice, diagnosis, or treatment. Life coaching is
                      distinct from therapy, counseling, or other mental health services.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>Our coaches are not licensed therapists, psychologists, or medical professionals</li>
                      <li>Coaching services do not diagnose, treat, or cure any mental health conditions</li>
                      <li>If you are experiencing a mental health crisis, please contact emergency services or a mental health professional immediately</li>
                      <li>Always seek the advice of your physician or qualified health provider with any questions regarding a medical condition</li>
                      <li>Never disregard professional medical advice or delay seeking it because of something you have read on this website</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">Crisis Resources</h2>
                    <p className="text-gray-600 mb-4">
                      If you are in crisis or experiencing thoughts of self-harm, please contact:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>National Suicide Prevention Lifeline: 988 (call or text)</li>
                      <li>Crisis Text Line: Text HOME to 741741</li>
                      <li>Emergency Services: 911 (United States)</li>
                      <li>Your local emergency services or mental health crisis line</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">Coaching Relationship</h2>
                    <p className="text-gray-600 mb-6">
                      The coaching relationship is a collaborative partnership focused on:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>Personal development and goal achievement</li>
                      <li>Enhancing self-awareness and life skills</li>
                      <li>Building resilience and coping strategies</li>
                      <li>Facilitating positive behavioral change</li>
                      <li>Supporting your journey toward personal growth</li>
                    </ul>
                    <p className="text-gray-600 mb-6">
                      The success of coaching depends on your willingness to engage in the process, be honest
                      with yourself and your coach, and take action on the insights gained. We cannot guarantee
                      specific results or outcomes from coaching services.
                    </p>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">No Guarantees</h2>
                    <p className="text-gray-600 mb-6">
                      While we strive to provide high-quality coaching services, we make no guarantees,
                      representations, or warranties regarding:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>Specific outcomes or results from coaching sessions</li>
                      <li>The achievement of personal goals or objectives</li>
                      <li>Resolution of personal challenges or issues</li>
                      <li>Compatibility with any particular coach</li>
                      <li>Timeframes for achieving desired changes</li>
                    </ul>
                    <p className="text-gray-600 mb-6">
                      Individual results vary based on many factors including personal circumstances, commitment
                      level, and external factors beyond our control.
                    </p>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">Confidentiality Limitations</h2>
                    <p className="text-gray-600 mb-6">
                      While we maintain confidentiality in accordance with our Privacy Policy, there are
                      legal and ethical limitations to confidentiality. We may be required to disclose
                      information if:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>Required by law or legal process</li>
                      <li>There is an imminent risk of harm to yourself or others</li>
                      <li>Child abuse or elder abuse is suspected</li>
                      <li>Court order or subpoena requires disclosure</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">Website Content</h2>
                    <p className="text-gray-600 mb-6">
                      The content on this website, including but not limited to text, graphics, images,
                      and other material, is provided for informational purposes only and should not be
                      construed as professional advice. We reserve the right to:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>Modify, update, or remove content at any time without notice</li>
                      <li>Correct errors or inaccuracies in the content</li>
                      <li>Make changes to our services, policies, and terms</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">Third-Party Links and Resources</h2>
                    <p className="text-gray-600 mb-6">
                      Our website may contain links to third-party websites, resources, or services that are
                      not owned or controlled by ACT Coaching For Life. We have no control over and assume
                      no responsibility for:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>The content, privacy policies, or practices of third-party sites</li>
                      <li>The accuracy or reliability of information on linked sites</li>
                      <li>Any products or services offered by third parties</li>
                      <li>Any transactions you enter into with third parties</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">Testimonials and Success Stories</h2>
                    <p className="text-gray-600 mb-6">
                      Any testimonials, case studies, or success stories presented on our website or in our
                      marketing materials represent individual experiences and results. These should not be
                      interpreted as:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>Guaranteed or typical results</li>
                      <li>Representative of all client experiences</li>
                      <li>Promises of specific outcomes</li>
                      <li>Medical or therapeutic claims</li>
                    </ul>
                    <p className="text-gray-600 mb-6">
                      Individual results will vary based on personal circumstances, effort, and other factors.
                    </p>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">Limitation of Liability</h2>
                    <p className="text-gray-600 mb-6">
                      Under no circumstance shall ACT Coaching For Life, its officers, directors, employees,
                      coaches, or agents be liable for any direct, indirect, incidental, consequential, or
                      special damages arising out of or in any way connected with:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                      <li>The use or inability to use our services or website</li>
                      <li>Any reliance on information provided through our services</li>
                      <li>Any decisions or actions taken based on coaching sessions</li>
                      <li>Any errors or omissions in the content</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">Acceptance of Terms</h2>
                    <p className="text-gray-600 mb-6">
                      By using our website or services, you acknowledge that you have read and understood
                      this disclaimer and agree to be bound by its terms. If you do not agree with any part
                      of this disclaimer, please do not use our website or services.
                    </p>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">Changes to This Disclaimer</h2>
                    <p className="text-gray-600 mb-6">
                      We reserve the right to modify this disclaimer at any time. Changes will be effective
                      immediately upon posting to the website. Your continued use of our services after any
                      changes constitutes acceptance of the updated disclaimer.
                    </p>

                    <h2 className="text-2xl font-semibold text-ink-dark mb-4">Contact Information</h2>
                    <p className="text-gray-600 mb-6">
                      If you have any questions about this disclaimer, please contact us at:
                      <br />
                      Email: info@actcoachingforlife.com
                      <br />
                      Phone: 1-800-ACT-HELP
                      <br />
                      Address: ACT Coaching For Life, Legal Department
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
