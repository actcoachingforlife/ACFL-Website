"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import NavbarLandingPage from "@/components/NavbarLandingPage"
import Footer from "@/components/Footer"
import Contact from "../component/contactUs"
import { useScrollRestoration } from "@/hooks/useScrollRestoration"
import {
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react"

export default function PricingPage() {
  useScrollRestoration('pricingScrollPosition');
  const [isYearly, setIsYearly] = useState(false)
  const [activeTab, setActiveTab] = useState('qualified')

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <nav>
        <NavbarLandingPage />
      </nav>

      {/* Hero Section */}
      <section className="relative h-[400px]">
        <img
          src="/images/Pricing_img1.png"
          alt="Pricing"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Text Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm md:text-base text-white/90 uppercase tracking-wider mb-4"
            >
              Invest
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Flexible coaching plans
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto"
            >
              Affordable ACT coaching solutions designed to fit your lifestyle and support your personal growth journey
            </motion.p>
          </div>
        </div>
      </section>

      {/* Coaching Plans Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">INVEST</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Coaching plans
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Transform your life with personalized ACT coaching
            </p>

            {/* Toggle Buttons */}
            <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-8 py-2 font-medium transition-colors ${
                  !isYearly
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-8 py-2 font-medium transition-colors border-l border-gray-300 ${
                  isYearly
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Monthly Sessions Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm"
            >
              <p className="text-sm text-teal-600 uppercase tracking-wider mb-4 font-medium">
                MONTHLY SESSIONS
              </p>

              <div className="mb-6">
                <div className="text-5xl font-bold text-red-500 mb-2">
                  ${isYearly ? '1,079.40' : '99.95'}
                </div>
                <p className="text-gray-600 text-sm">
                  Launch your dream site in days, not months.
                </p>
              </div>

              <a href="/contact">
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-medium mb-8 transition-colors">
                  START MONTHLY PLAN
                </button>
              </a>

              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-4">Features :</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Qualified ACT coach matching</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Unlimited messaging support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Flexible session scheduling</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-900">ACT COACHING FOR LIFE</span>
              </div>
            </motion.div>

            {/* Weekly Sessions Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm"
            >
              <p className="text-sm text-teal-600 uppercase tracking-wider mb-4 font-medium">
                WEEKLY SESSIONS
              </p>

              <div className="mb-6">
                <div className="text-5xl font-bold text-red-500 mb-2">
                  ${isYearly ? '1,619.40' : '149.95'}
                </div>
                <p className="text-gray-600 text-sm">
                  Launch your dream site in days, not months.
                </p>
              </div>

              <a href="/contact">
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-medium mb-8 transition-colors">
                  START WEEKLY PLAN
                </button>
              </a>

              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-4">Features :</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Priority coach matching</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Unlimited messaging support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Advanced progress tracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Priority support and booking</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Everything Included Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">BENEFITS</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything included in both plans
            </h2>
            <p className="text-gray-600 text-lg mb-10 max-w-3xl mx-auto">
              Our comprehensive coaching approach ensures you receive holistic support across every session.
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-12">
              <a href="/about">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  Learn more
                </button>
              </a>
              <a href="/individual-coaching">
                <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
            </div>

            {/* Tab Links with Underline */}
            <div className="flex flex-wrap justify-center gap-12 mb-12">
              <button
                onClick={() => setActiveTab('qualified')}
                className={`text-base font-medium transition-colors pb-2 ${
                  activeTab === 'qualified'
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Qualified professionals
              </button>
              <button
                onClick={() => setActiveTab('messaging')}
                className={`text-base font-medium transition-colors pb-2 ${
                  activeTab === 'messaging'
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                24/7 messaging
              </button>
              <button
                onClick={() => setActiveTab('scheduling')}
                className={`text-base font-medium transition-colors pb-2 ${
                  activeTab === 'scheduling'
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Flexible scheduling
              </button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              {activeTab === 'qualified' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">EXPERT COACHES</p>
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Vetted ACT practitioners
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    Each coach undergoes rigorous certification and continuous professional development to ensure highest quality support.
                  </p>
                  <div className="flex gap-4">
                    <a href="/about">
                      <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                        Details
                      </button>
                    </a>
                    <a href="/blog">
                      <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                        Discover
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </a>
                  </div>
                </motion.div>
              )}
              {activeTab === 'messaging' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">ALWAYS AVAILABLE</p>
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    24/7 messaging support
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    Connect with your coach anytime through our secure messaging platform for continuous support between sessions.
                  </p>
                  <div className="flex gap-4">
                    <a href="/about">
                      <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                        Details
                      </button>
                    </a>
                    <a href="/blog">
                      <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                        Discover
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </a>
                  </div>
                </motion.div>
              )}
              {activeTab === 'scheduling' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">YOUR SCHEDULE</p>
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Flexible scheduling
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    Book and reschedule sessions at times that work for you with our easy-to-use scheduling system.
                  </p>
                  <div className="flex gap-4">
                    <a href="/about">
                      <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                        Details
                      </button>
                    </a>
                    <a href="/blog">
                      <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                        Discover
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="order-1 md:order-2">
              <img
                src={activeTab === 'qualified' ? '/images/Pricing_img2.png' : activeTab === 'messaging' ? '/images/pricing-247.png' : '/images/pricing-flex.png'}
                alt="Coaching benefit"
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-400 mb-8 leading-tight">
                  Ready to transform your team's potential
                </h2>
                <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                  Discover personalized group coaching solutions designed to unlock collective growth and performance.
                </p>
                <div className="flex gap-4">
                  <a href="/assessment">
                    <button className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-3 rounded-lg font-medium transition-colors">
                      Start now
                    </button>
                  </a>
                  <a href="/group-coaching">
                    <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-10 py-3 rounded-lg font-medium transition-colors">
                      Learn more
                    </button>
                  </a>
                </div>
              </motion.div>
            </div>

            <div>
              <img
                src="/images/Pricing_img3.png"
                alt="Team transformation"
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Client Stories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Client stories
            </h2>
            <p className="text-gray-600">
              Real people, real transformations through ACT coaching
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                My coach helped me work through anxiety that was holding me back for years. The ACT approach really clicked with me, and I finally feel like I'm living authentically. Highly recommend!
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">SM</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Sarah Martinez</div>
                  <div className="text-xs text-gray-500">Google • 3 months ago</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                The matching process was incredible - they found me a coach who understood my specific challenges. Three months later, I feel more confident and focused than ever. Worth every penny.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">MR</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Michael Rodriguez</div>
                  <div className="text-xs text-gray-500">Google • 2 months ago</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                I was skeptical about online coaching, but the platform made it so easy to connect. The flexibility to message between sessions has been a game-changer. Amazing service!
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">JL</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Jennifer Lee</div>
                  <div className="text-xs text-gray-500">Google • 1 month ago</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      <Footer />
    </div>
  )
}
