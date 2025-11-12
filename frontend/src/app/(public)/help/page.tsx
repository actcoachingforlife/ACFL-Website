"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Users, CreditCard, MessageCircle, Shield, FileText, HelpCircle, ChevronDown, MessageSquare, Mail, Phone, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import Footer from "@/components/Footer"
import NavbarLandingPage from "@/components/NavbarLandingPage"
import { useScrollRestoration } from "@/hooks/useScrollRestoration"
import ScrollToTop from "@/components/ScrollToTop"

interface FAQItem {
  question: string
  answer: string
  isOpen?: boolean
}

interface SearchResult {
  type: 'faq' | 'category'
  category?: string
  question?: string
  answer?: string
  title?: string
  description?: string
}

export default function HelpCenterPage() {
  useScrollRestoration('helpScrollPosition');
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const [generalFAQs, setGeneralFAQs] = useState<FAQItem[]>([
    {
      question: "What is ACT Coaching for Life?",
      answer: "ACT Coaching for Life (ACT) is a personal and professional development coaching service grounded in Acceptance and Commitment Therapy (ACT) principles. We help individuals clarify their values, build psychological flexibility, and take meaningful action toward living a more fulfilling life.",
      isOpen: true
    },
    {
      question: "Who can benefit from ACT Coaching?",
      answer: "Anyone looking to improve their mental well-being, overcome challenges, or achieve personal growth can benefit from ACT coaching.",
      isOpen: false
    },
    {
      question: "What's the difference between therapy and coaching?",
      answer: "While both aim to improve well-being, therapy typically focuses on treating mental health conditions, while coaching focuses on personal development and achieving specific goals.",
      isOpen: false
    },
    {
      question: "How many sessions will I need?",
      answer: "The number of sessions varies based on individual needs and goals. We offer flexible packages to suit different requirements.",
      isOpen: false
    },
    {
      question: "Are sessions confidential?",
      answer: "Yes, all coaching sessions are completely confidential and follow strict privacy guidelines.",
      isOpen: false
    },
    {
      question: "Do I need any background in psychology to start?",
      answer: "No background in psychology is required. Our coaches will guide you through the process and explain concepts as needed.",
      isOpen: false
    }
  ])

  const [billingFAQs, setBillingFAQs] = useState<FAQItem[]>([
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit and debit cards, bank transfers, and selected digital payment platforms (such as GCash or PayPal, if applicable). Payment details will be provided during booking confirmation.",
      isOpen: true
    },
    {
      question: "Do you offer refunds or rescheduling?",
      answer: "Yes, we offer flexible rescheduling options and refunds according to our cancellation policy.",
      isOpen: false
    },
    {
      question: "Are there any hidden fees?",
      answer: "No, all fees are transparent and clearly communicated upfront. There are no hidden charges.",
      isOpen: false
    },
    {
      question: "Do you offer packages or discounts?",
      answer: "Yes, we offer various coaching packages and occasional discounts for multiple session bookings.",
      isOpen: false
    }
  ])

  const categories = [
    {
      icon: Users,
      title: "Getting Started",
      description: "Learn how to create an account and find your perfect coach",
      items: [
        "How to sign up",
        "Finding the right coach",
        "Your first session",
        "Platform overview"
      ],
      link: "/individual-coaching"
    },
    {
      icon: CreditCard,
      title: "Billing & Subscriptions",
      description: "Manage your payments and subscription plans",
      items: [
        "Pricing plans",
        "Payment methods",
        "Cancel subscription",
        "Refund policy"
      ],
      link: "/pricing"
    },
    {
      icon: MessageCircle,
      title: "Coaching Sessions",
      description: "Everything about your coaching experience",
      items: [
        "Scheduling sessions",
        "Preparing for coaching",
        "Session guidelines",
        "Changing coaches"
      ],
      link: "/individual-coaching"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "How we protect your information",
      items: [
        "Data security",
        "Confidentiality",
        "Account security",
        "Privacy settings"
      ],
      link: "/privacy"
    },
    {
      icon: FileText,
      title: "ACT Resources",
      description: "Learn more about ACT methodology",
      items: [
        "What is ACT?",
        "Core principles",
        "Exercises & techniques",
        "Recommended reading"
      ],
      link: "/resources"
    },
    {
      icon: HelpCircle,
      title: "Troubleshooting",
      description: "Common issues and solutions",
      items: [
        "Login problems",
        "Technical issues",
        "Video call quality",
        "Mobile app help"
      ],
      link: "/contact"
    }
  ]

  const toggleFAQ = (type: 'general' | 'billing', index: number) => {
    if (type === 'general') {
      setGeneralFAQs(prevFAQs =>
        prevFAQs.map((faq, i) =>
          i === index ? { ...faq, isOpen: !faq.isOpen } : faq
        )
      )
    } else {
      setBillingFAQs(prevFAQs =>
        prevFAQs.map((faq, i) =>
          i === index ? { ...faq, isOpen: !faq.isOpen } : faq
        )
      )
    }
  }

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([])
      setShowSuggestions(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const results: SearchResult[] = []

    // Search in general FAQs
    generalFAQs.forEach(faq => {
      if (faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)) {
        results.push({
          type: 'faq',
          category: 'General',
          question: faq.question,
          answer: faq.answer
        })
      }
    })

    // Search in billing FAQs
    billingFAQs.forEach(faq => {
      if (faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)) {
        results.push({
          type: 'faq',
          category: 'Billing',
          question: faq.question,
          answer: faq.answer
        })
      }
    })

    // Search in categories
    categories.forEach(category => {
      const matchesTitle = category.title.toLowerCase().includes(query)
      const matchesDescription = category.description.toLowerCase().includes(query)
      const matchesItems = category.items.some(item => item.toLowerCase().includes(query))

      if (matchesTitle || matchesDescription || matchesItems) {
        results.push({
          type: 'category',
          title: category.title,
          description: category.description
        })
      }
    })

    setSearchResults(results.slice(0, 5)) // Limit to 5 results
    setShowSuggestions(results.length > 0)
  }, [searchQuery, generalFAQs, billingFAQs])

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'faq') {
      // Open the relevant FAQ
      if (result.category === 'General') {
        const index = generalFAQs.findIndex(faq => faq.question === result.question)
        if (index !== -1) {
          setGeneralFAQs(prevFAQs =>
            prevFAQs.map((faq, i) => ({
              ...faq,
              isOpen: i === index
            }))
          )
          // Scroll to General FAQs section
          setTimeout(() => {
            const element = document.querySelector('.general-faqs-section')
            element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 100)
        }
      } else if (result.category === 'Billing') {
        const index = billingFAQs.findIndex(faq => faq.question === result.question)
        if (index !== -1) {
          setBillingFAQs(prevFAQs =>
            prevFAQs.map((faq, i) => ({
              ...faq,
              isOpen: i === index
            }))
          )
          // Scroll to Billing FAQs section
          setTimeout(() => {
            const element = document.querySelector('.billing-faqs-section')
            element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 100)
        }
      }
    }
    setShowSuggestions(false)
    setSearchQuery('')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav>
        <NavbarLandingPage />
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Looking for Help? Here are our Most{" "}
                <span className="text-red-500">Frequently Asked Questions.</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Find answers to your questions and get the support you need for your coaching journey.
              </p>
            </div>
            <div className="flex-1 w-full max-w-md flex flex-col gap-4">
              <div ref={searchRef} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <Input
                  type="text"
                  placeholder="Search for help topics..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                  className="pl-10 pr-4 py-6 w-full text-lg bg-white border-gray-300 rounded-lg shadow-sm"
                />

                {/* Search Suggestions Dropdown */}
                {showSuggestions && searchResults.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleResultClick(result)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        {result.type === 'faq' ? (
                          <div>
                            <div className="flex items-start gap-2">
                              <HelpCircle className="w-4 h-4 text-cyan-500 mt-1 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 text-sm mb-1">
                                  {result.question}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {result.category} FAQ
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-start gap-2">
                              <FileText className="w-4 h-4 text-cyan-500 mt-1 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 text-sm mb-1">
                                  {result.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {result.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <a href="/contact" className="self-center">
                <Button
                  variant="outline"
                  className="px-8 py-6 text-lg border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-50 rounded-lg whitespace-nowrap"
                >
                  I've Got a Question
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start mb-4">
                    <div className="p-3 bg-cyan-100 rounded-lg">
                      <Icon className="w-6 h-6 text-cyan-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-700">
                        • {item}
                      </li>
                    ))}
                  </ul>
                  <a href={category.link} className="mt-4 text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center">
                    View All <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* General FAQs */}
      <section className="py-16 bg-gray-50 general-faqs-section">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-cyan-500 rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              General FAQ's
            </h2>
            <p className="text-white/90 mb-8">
              Your guide to understanding ACT Coaching and how it can help you live with purpose and balance.
            </p>
            <div className="space-y-0">
              {generalFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="border-t border-white/30"
                >
                  <button
                    onClick={() => toggleFAQ('general', index)}
                    className="w-full py-6 flex justify-between items-start text-left hover:opacity-90 transition-opacity"
                  >
                    <span className="font-semibold text-white pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-white flex-shrink-0 transition-transform mt-1 ${
                        faq.isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {faq.isOpen && (
                    <div className="pb-6 text-white/90 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Billing FAQs */}
      <section className="py-16 bg-gray-50 billing-faqs-section">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-cyan-500 rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Billing FAQs
            </h2>
            <p className="text-white/90 mb-8">
              Learn more about our payment process, session fees, and booking policies.
            </p>
            <div className="space-y-0">
              {billingFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="border-t border-white/30"
                >
                  <button
                    onClick={() => toggleFAQ('billing', index)}
                    className="w-full py-6 flex justify-between items-start text-left hover:opacity-90 transition-opacity"
                  >
                    <span className="font-semibold text-white pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-white flex-shrink-0 transition-transform mt-1 ${
                        faq.isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {faq.isOpen && (
                    <div className="pb-6 text-white/90 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/images/help.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-lg text-white">
              Our support team is here to assist you with any questions or concerns.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Live Chat */}
            <div className="bg-transparent text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500 rounded-lg mb-4">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Live Chat
              </h3>
              <p className="text-gray-300 mb-6">
                Chat with our support team
              </p>
              <Button className="w-full bg-white hover:bg-gray-100 text-cyan-500 font-semibold rounded-md py-5">
                Start Chat
              </Button>
            </div>

            {/* Email Support */}
            <div className="bg-transparent text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500 rounded-lg mb-4">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Email Support
              </h3>
              <p className="text-gray-300 mb-6">
                We'll respond within 24 hours
              </p>
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-gray-100 text-cyan-500 font-semibold border-0 rounded-md py-5"
              >
                support@actcoachingforlife.com
              </Button>
            </div>

            {/* Phone Support */}
            <div className="bg-transparent text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500 rounded-lg mb-4">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Phone Support
              </h3>
              <p className="text-gray-300 mb-6">
                Mon-Fri 9am-6pm EST
              </p>
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-gray-100 text-cyan-500 font-semibold border-0 rounded-md py-5"
              >
                1-800-ACT-HELP
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  )
}