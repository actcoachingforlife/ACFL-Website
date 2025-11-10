'use client';

import { useState } from "react";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      const { getApiUrl } = await import('@/lib/api');
      const apiUrl = getApiUrl();

      const response = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed! Check your email for confirmation.');
        setEmail('');

        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Subscription failed. Please try again.');

        // Reset error message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');

      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 border border-gray-200 dark:border-gray-700 p-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-16">
            {/* Logo */}
          <div className="flex flex-col items-center gap-4">
            <img
              src="https://storage.googleapis.com/msgsndr/12p9V9PdtvnTPGSU0BBw/media/672420528abc730356eeaad5.png"
              alt="ACT Coaching for Life logo"
              width={90}
              height={90}
              className="select-none"
            />
            <h2 className="text-2xl font-serif font-bold mb-4 dark:text-white">ACFL</h2>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="/" className="hover:text-gray-900 dark:hover:text-white">Home</a></li>
              <li><span className="text-gray-400 dark:text-gray-500 cursor-not-allowed">Services</span></li>
              <li><span className="text-gray-400 dark:text-gray-500 cursor-not-allowed">Coaches</span></li>
              <li><a href="/resources" className="hover:text-gray-900 dark:hover:text-white">Resources</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="/faq" className="hover:text-gray-900 dark:hover:text-white">FAQ</a></li>
              <li><a href="/contact" className="hover:text-gray-900 dark:hover:text-white">Contact</a></li>
              <li><a href="/help" className="hover:text-gray-900 dark:hover:text-white">Help</a></li>
              <li><span className="text-gray-400 dark:text-gray-500 cursor-not-allowed">Chat</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="/privacy" className="hover:text-gray-900 dark:hover:text-white">Privacy</a></li>
              <li><a href="/terms" className="hover:text-gray-900 dark:hover:text-white">Terms</a></li>
              <li><span className="text-gray-400 dark:text-gray-500 cursor-not-allowed">Cookies</span></li>
              <li><span className="text-gray-400 dark:text-gray-500 cursor-not-allowed">Disclaimer</span></li>
            </ul>
          </div>
          </div>

          {/* Subscribe */}
          <div id="footer-subscribe">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Subscribe</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Get insights and updates on coaching strategies and mental
              wellness.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="w-full sm:w-auto flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="border border-gray-300 dark:border-gray-600 bg-teal-600 hover:bg-teal-700 text-white rounded-md px-4 py-2 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Submitting...' : 'Submit'}
              </button>
            </form>
            {message && (
              <p className={`text-xs mt-3 ${
                status === 'success'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {message}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              By subscribing, you agree to our privacy policy and email terms.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between flex-col lg:flex-row">
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-sm text-gray-600 dark:text-gray-400 gap-4">
            <div className="text-center md:text-left">
              © 2024 ACT Coaching for Life. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <a href="/privacy" className="hover:text-black dark:hover:text-white">
                Privacy policy
              </a>
              <a href="/terms" className="hover:text-black dark:hover:text-white">
                Terms of service
              </a>
              <span className="text-gray-400 dark:text-gray-500 cursor-not-allowed">
                Cookie settings
              </span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end mt-6 space-x-5 text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-black dark:hover:text-white">
              <Facebook />
            </a>
            <a href="#" className="hover:text-black dark:hover:text-white">
              <Instagram />
            </a>
            <a href="#" className="hover:text-black dark:hover:text-white">
              <Twitter />
            </a>
            <a href="#" className="hover:text-black dark:hover:text-white">
              <Linkedin />
            </a>
            <a href="#" className="hover:text-black dark:hover:text-white">
              <Youtube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
