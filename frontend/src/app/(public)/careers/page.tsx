"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Briefcase, Heart, Users, Trophy, Clock, MapPin, ChevronRight, Search, Filter, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react"
import GradientText from "@/components/GradientText"
import SpotlightCard from "@/components/SpotlightCard"
import Footer from "@/components/Footer"
import NavbarLandingPage from "@/components/NavbarLandingPage"
import Contact from "../component/contactUs"
import { getApiUrl } from "@/lib/api"

interface ContentData {
  id: string
  title: string
  content: string
  slug: string
  meta_description?: string
}

interface Position {
  title: string
  location: string
  type: string
  department: string
  description: string
  badge?: string
}

export default function CareersPage() {
  const [careersContent, setCareersContent] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Position | null>(null)

  useEffect(() => {
    fetchCareersContent()
  }, [])

  const fetchCareersContent = async () => {
    try {
      const response = await fetch(`${getApiUrl()}/api/content/public/content?slug=careers`)
      if (response.ok) {
        const data = await response.json()
        setCareersContent(data)
      }
    } catch (error) {
      console.error('Error fetching careers content:', error)
    } finally {
      setLoading(false)
    }
  }

  // Default positions matching the image
  const defaultPositions: Position[] = [
    {
      title: "Senior ACT Coach",
      location: "Remote",
      type: "Full-time",
      department: "Coaching",
      description: "Lead individual and group coaching sessions using ACT methodology.",
      badge: "New post"
    },
    {
      title: "Clinical Psychologist",
      location: "Remote / Hybrid",
      type: "Full-time",
      department: "Clinical",
      description: "Lead individual and group coaching sessions using ACT methodology."
    },
    {
      title: "Customer Success Manager",
      location: "Remote",
      type: "Full-time",
      department: "Operations",
      description: "Ensure client satisfaction and successful coaching outcomes."
    },
    {
      title: "Content Marketing Specialist",
      location: "Remote",
      type: "Contract",
      department: "Marketing",
      description: "Create engaging content about ACT therapy and personal growth."
    },
    {
      title: "Clinical Psychologist",
      location: "Remote / Hybrid",
      type: "Full-time",
      department: "Clinical",
      description: "Lead individual and group coaching sessions using ACT methodology."
    },
    {
      title: "Senior ACT Coach",
      location: "Remote",
      type: "Full-time",
      department: "Coaching",
      description: "Lead individual and group coaching sessions using ACT methodology.",
      badge: "New post"
    },
    {
      title: "Clinical Psychologist",
      location: "Remote / Hybrid",
      type: "Full-time",
      department: "Clinical",
      description: "Lead individual and group coaching sessions using ACT methodology."
    }
  ]

  const openPositions = defaultPositions

  // Set first job as selected by default
  useEffect(() => {
    if (openPositions.length > 0 && !selectedJob) {
      setSelectedJob(openPositions[0])
    }
  }, [openPositions])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <nav>
        <NavbarLandingPage />
      </nav>

      {/* Main Job Search Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Find your <span className="text-cyan-500">new job</span> today
            </h1>
            <p className="text-gray-600">
              Thousands of jobs in the computer, engineering and technology sectors are waiting for you.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="What position are you looking for ?"
                className="w-full pl-10 pr-4 py-2 border-0 focus:outline-none text-sm"
              />
            </div>
            <div className="flex-1 relative border-l border-gray-200 md:pl-4">
              <MapPin className="absolute left-3 md:left-7 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-10 md:pl-10 pr-4 py-2 border-0 focus:outline-none text-sm"
              />
            </div>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8">
              Search job
            </Button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-2 space-y-6">
              {/* Location Filters */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Filters</h3>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 text-sm">Location</h4>
                  <label className="flex items-center text-sm text-gray-600">
                    <input type="radio" name="location" className="mr-2 text-cyan-500" />
                    Near me
                  </label>
                  <label className="flex items-center text-sm text-cyan-500">
                    <input type="radio" name="location" className="mr-2" defaultChecked />
                    Remote job
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input type="radio" name="location" className="mr-2" />
                    Exact location
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input type="radio" name="location" className="mr-2" />
                    Within 15 km
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input type="radio" name="location" className="mr-2" />
                    Within 30 km
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input type="radio" name="location" className="mr-2" />
                    Within 50 km
                  </label>
                </div>
              </div>

              {/* Salary Filters */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Salary</h4>
                <div className="flex gap-2 mb-3">
                  <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">Hourly</button>
                  <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">Monthly</button>
                  <button className="px-3 py-1 text-xs bg-cyan-500 text-white rounded">Yearly</button>
                </div>
                <label className="flex items-center text-sm text-cyan-500 mb-2">
                  <input type="radio" name="salary" className="mr-2" defaultChecked />
                  Any
                </label>
                <label className="flex items-center text-sm text-gray-600 mb-2">
                  <input type="radio" name="salary" className="mr-2" />
                  &gt; 30000k
                </label>
                <label className="flex items-center text-sm text-gray-600 mb-2">
                  <input type="radio" name="salary" className="mr-2" />
                  &gt; 50000k
                </label>
                <label className="flex items-center text-sm text-gray-600 mb-2">
                  <input type="radio" name="salary" className="mr-2" />
                  &gt; 80000k
                </label>
                <label className="flex items-center text-sm text-gray-600">
                  <input type="radio" name="salary" className="mr-2" />
                  &gt; 100000k
                </label>
              </div>

              {/* Date of posting */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Date of posting</h4>
                <label className="flex items-center text-sm text-cyan-500 mb-2">
                  <input type="radio" name="date" className="mr-2" defaultChecked />
                  All time
                </label>
                <label className="flex items-center text-sm text-gray-600 mb-2">
                  <input type="radio" name="date" className="mr-2" />
                  Last 24 hours
                </label>
                <label className="flex items-center text-sm text-gray-600 mb-2">
                  <input type="radio" name="date" className="mr-2" />
                  Last 3 days
                </label>
                <label className="flex items-center text-sm text-gray-600">
                  <input type="radio" name="date" className="mr-2" />
                  Last 7 days
                </label>
              </div>

              {/* Work experience */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Work experience</h4>
                <label className="flex items-center text-sm text-cyan-500 mb-2">
                  <input type="radio" name="experience" className="mr-2" defaultChecked />
                  Any experience
                </label>
                <label className="flex items-center text-sm text-gray-600 mb-2">
                  <input type="radio" name="experience" className="mr-2" />
                  Internship
                </label>
                <label className="flex items-center text-sm text-gray-600">
                  <input type="radio" name="experience" className="mr-2" />
                  Work remotely
                </label>
              </div>

              {/* Type of employment */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Type of employment</h4>
                <label className="flex items-center text-sm mb-2">
                  <input type="checkbox" className="mr-2 text-cyan-500" defaultChecked />
                  Full-time
                </label>
                <label className="flex items-center text-sm mb-2">
                  <input type="checkbox" className="mr-2" />
                  Temporary
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Part-time
                </label>
              </div>
            </div>

            {/* Center - Job Listings */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{openPositions.length} Jobs</h2>
                <button className="flex items-center gap-2 text-sm text-gray-600 border border-gray-300 rounded px-3 py-1 hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Filter by
                </button>
              </div>

              <div className="space-y-3">
                {openPositions.map((position, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedJob(position)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedJob?.title === position.title && selectedJob?.location === position.location
                        ? 'border-cyan-500 bg-cyan-50/30'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Job Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-200 via-purple-200 to-cyan-200 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400"></div>
                          </div>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{position.title}</h3>
                            {position.badge && (
                              <span className="inline-block px-2 py-0.5 bg-cyan-500 text-white text-xs rounded">
                                {position.badge}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {position.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            {position.department}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2">{position.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">4</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">5</button>
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Sidebar - Job Details */}
            <div className="lg:col-span-4">
              {selectedJob && (
                <div className="border border-gray-200 rounded-lg p-6 sticky top-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-4">{selectedJob.title}</h3>
                  
                  {selectedJob.badge && (
                    <span className="inline-block px-3 py-1 bg-cyan-500 text-white text-xs rounded mb-4">
                      {selectedJob.badge}
                    </span>
                  )}

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm mb-2">Primary Responsibility:</h4>
                      <p className="text-sm text-gray-600">
                        Deliver high-quality ACT (Acceptance and Commitment Therapy) coaching sessions to clients, both one-on-one and in group settings.
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Monitor and supervise junior coaches and provide guidance on ACT techniques and client engagement strategies.
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Collaborate with the training team to deliver workshops on coaching skills to support client mental well-being, resilience, and performance.
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Conduct assessments, track client progress, and adjust methodologies as needed based on client feedback and outcomes.
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Facilitate workshops, seminars, or online programs focused on ACT principles and mind-fitness.
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Stay updated with the latest ACT research and contribute to improving internal coaching frameworks.
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Maintain professional documentation and uphold confidentiality standards.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 text-sm mb-2">Job Specification:</h4>
                      <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                        <li>Education: Bachelor's or Master's degree in Psychology, Counseling, or a related field (required)</li>
                        <li>Required Experience</li>
                        <li>Certification: Certified ACT Practitioner or equivalent psychological coaching certification (preferred)</li>
                        <li>Skills:</li>
                      </ul>
                      <p className="text-sm text-gray-600 mt-2">
                        • Deep understanding of Acceptance and Commitment Therapy (ACT) frameworks
                      </p>
                      <p className="text-sm text-gray-600">
                        • Excellent communication, empathy, and active listening skills
                      </p>
                      <p className="text-sm text-gray-600">
                        • Strong organizational and mentoring abilities
                      </p>
                      <p className="text-sm text-gray-600">
                        • Proficiency in online coaching platforms and digital communication tools
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Employment Type:</span>
                      <p className="text-gray-600">Full-time</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Work place Type:</span>
                      <p className="text-gray-600">Hybrid</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Salary:</span>
                      <p className="text-gray-600">Commensurate with experience and skills</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Experience Required:</span>
                      <p className="text-gray-600">Minimum 3 Years</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Job Location:</span>
                      <p className="text-gray-600">US</p>
                    </div>
                  </div>

                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                    Apply Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  )
}