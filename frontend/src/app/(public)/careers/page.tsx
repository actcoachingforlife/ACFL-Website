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
import { useScrollRestoration } from "@/hooks/useScrollRestoration"

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
  primaryResponsibilities?: string[]
  jobSpecifications?: {
    education?: string[]
    experience?: string[]
    certification?: string[]
    skills?: string[]
  }
  employmentDetails?: {
    employmentType?: string
    workplaceType?: string
    salary?: string
    experienceRequired?: string
    jobLocation?: string
  }
}

export default function CareersPage() {
  useScrollRestoration('careersScrollPosition');
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

  // Default positions with comprehensive hardcoded data
  const defaultPositions: Position[] = [
    {
      title: "Senior ACT Coach",
      location: "Remote",
      type: "Full-time",
      department: "Coaching",
      description: "Lead individual and group coaching sessions using ACT methodology.",
      badge: "New post",
      primaryResponsibilities: [
        "Deliver high-quality ACT (Acceptance and Commitment Therapy) coaching sessions to clients, both one-on-one and in group settings.",
        "Monitor and supervise junior coaches and provide guidance on ACT techniques and client engagement strategies.",
        "Collaborate with the training team to deliver workshops on coaching skills to support client mental well-being, resilience, and performance.",
        "Conduct assessments, track client progress, and adjust methodologies as needed based on client feedback and outcomes.",
        "Facilitate workshops, seminars, or online programs focused on ACT principles and mind-fitness.",
        "Stay updated with the latest ACT research and contribute to improving internal coaching frameworks.",
        "Maintain professional documentation and uphold confidentiality standards."
      ],
      jobSpecifications: {
        education: ["Education: Bachelor's or Master's degree in Psychology, Counseling, or a related field (required)"],
        experience: ["Required Experience: Minimum 3 years of coaching experience using ACT or related therapeutic approaches"],
        certification: ["Certification: Certified ACT Practitioner or equivalent psychological coaching certification (preferred)"],
        skills: [
          "Deep understanding of Acceptance and Commitment Therapy (ACT) frameworks",
          "Excellent communication, empathy, and active listening skills",
          "Strong organizational and mentoring abilities",
          "Proficiency in online coaching platforms and digital communication tools"
        ]
      },
      employmentDetails: {
        employmentType: "Full-time",
        workplaceType: "Hybrid",
        salary: "Commensurate with experience and skills",
        experienceRequired: "Minimum 3 Years",
        jobLocation: "US"
      }
    },
    {
      title: "Clinical Psychologist",
      location: "Remote / Hybrid",
      type: "Full-time",
      department: "Clinical",
      description: "Lead individual and group coaching sessions using ACT methodology.",
      primaryResponsibilities: [
        "Provide clinical psychological services to clients using evidence-based therapeutic approaches.",
        "Conduct comprehensive psychological assessments and develop treatment plans.",
        "Deliver individual and group therapy sessions focused on mental health and well-being.",
        "Collaborate with multidisciplinary teams to ensure holistic client care.",
        "Maintain accurate clinical documentation and ensure compliance with ethical standards.",
        "Participate in clinical supervision and professional development activities."
      ],
      jobSpecifications: {
        education: ["Doctoral degree in Clinical Psychology (Ph.D. or Psy.D.) from an accredited institution"],
        experience: ["Minimum 2 years of post-doctoral clinical experience"],
        certification: ["Licensed Clinical Psychologist in good standing", "ACT training or certification (preferred)"],
        skills: [
          "Strong clinical assessment and diagnostic skills",
          "Expertise in evidence-based therapeutic interventions",
          "Excellent interpersonal and communication abilities",
          "Proficient in electronic health record systems"
        ]
      },
      employmentDetails: {
        employmentType: "Full-time",
        workplaceType: "Hybrid",
        salary: "$80,000 - $120,000 per year",
        experienceRequired: "Minimum 2 Years",
        jobLocation: "Remote / US"
      }
    },
    {
      title: "Customer Success Manager",
      location: "Remote",
      type: "Full-time",
      department: "Operations",
      description: "Ensure client satisfaction and successful coaching outcomes.",
      primaryResponsibilities: [
        "Build and maintain strong relationships with clients to ensure satisfaction and retention.",
        "Onboard new clients and provide training on platform features and best practices.",
        "Monitor client engagement metrics and proactively address concerns or issues.",
        "Collaborate with sales and product teams to communicate client feedback and needs.",
        "Develop and implement strategies to improve client success and reduce churn.",
        "Create educational content and resources to help clients maximize value from our services."
      ],
      jobSpecifications: {
        education: ["Bachelor's degree in Business, Psychology, or related field"],
        experience: ["2+ years of experience in customer success, account management, or client relations"],
        skills: [
          "Excellent relationship-building and communication skills",
          "Strong problem-solving and analytical abilities",
          "Experience with CRM and customer success platforms",
          "Ability to work independently in a remote environment",
          "Passion for helping others succeed"
        ]
      },
      employmentDetails: {
        employmentType: "Full-time",
        workplaceType: "Remote",
        salary: "$60,000 - $85,000 per year",
        experienceRequired: "Minimum 2 Years",
        jobLocation: "Remote - US"
      }
    },
    {
      title: "Content Marketing Specialist",
      location: "Remote",
      type: "Contract",
      department: "Marketing",
      description: "Create engaging content about ACT therapy and personal growth.",
      primaryResponsibilities: [
        "Develop and execute content strategy aligned with brand voice and marketing goals.",
        "Create high-quality blog posts, articles, and educational content about ACT therapy and mental wellness.",
        "Manage social media content calendar and engage with online community.",
        "Collaborate with subject matter experts to produce accurate and compelling content.",
        "Optimize content for SEO and track performance metrics.",
        "Stay current with industry trends and best practices in content marketing."
      ],
      jobSpecifications: {
        education: ["Bachelor's degree in Marketing, Communications, Journalism, or related field"],
        experience: ["3+ years of content marketing or copywriting experience", "Experience in healthcare, wellness, or mental health sectors (preferred)"],
        skills: [
          "Exceptional writing and editing skills",
          "Knowledge of SEO and content optimization",
          "Proficiency with content management systems and social media platforms",
          "Strong research and storytelling abilities",
          "Familiarity with ACT or psychological concepts (plus)"
        ]
      },
      employmentDetails: {
        employmentType: "Contract",
        workplaceType: "Remote",
        salary: "$50 - $75 per hour",
        experienceRequired: "Minimum 3 Years",
        jobLocation: "Remote - Worldwide"
      }
    },
    {
      title: "Clinical Psychologist",
      location: "Remote / Hybrid",
      type: "Full-time",
      department: "Clinical",
      description: "Lead individual and group coaching sessions using ACT methodology.",
      primaryResponsibilities: [
        "Provide clinical psychological services to clients using evidence-based therapeutic approaches.",
        "Conduct comprehensive psychological assessments and develop treatment plans.",
        "Deliver individual and group therapy sessions focused on mental health and well-being.",
        "Collaborate with multidisciplinary teams to ensure holistic client care.",
        "Maintain accurate clinical documentation and ensure compliance with ethical standards.",
        "Participate in clinical supervision and professional development activities."
      ],
      jobSpecifications: {
        education: ["Doctoral degree in Clinical Psychology (Ph.D. or Psy.D.) from an accredited institution"],
        experience: ["Minimum 2 years of post-doctoral clinical experience"],
        certification: ["Licensed Clinical Psychologist in good standing", "ACT training or certification (preferred)"],
        skills: [
          "Strong clinical assessment and diagnostic skills",
          "Expertise in evidence-based therapeutic interventions",
          "Excellent interpersonal and communication abilities",
          "Proficient in electronic health record systems"
        ]
      },
      employmentDetails: {
        employmentType: "Full-time",
        workplaceType: "Hybrid",
        salary: "$80,000 - $120,000 per year",
        experienceRequired: "Minimum 2 Years",
        jobLocation: "Remote / US"
      }
    },
    {
      title: "Senior ACT Coach",
      location: "Remote",
      type: "Full-time",
      department: "Coaching",
      description: "Lead individual and group coaching sessions using ACT methodology.",
      badge: "New post",
      primaryResponsibilities: [
        "Deliver high-quality ACT (Acceptance and Commitment Therapy) coaching sessions to clients, both one-on-one and in group settings.",
        "Monitor and supervise junior coaches and provide guidance on ACT techniques and client engagement strategies.",
        "Collaborate with the training team to deliver workshops on coaching skills to support client mental well-being, resilience, and performance.",
        "Conduct assessments, track client progress, and adjust methodologies as needed based on client feedback and outcomes.",
        "Facilitate workshops, seminars, or online programs focused on ACT principles and mind-fitness.",
        "Stay updated with the latest ACT research and contribute to improving internal coaching frameworks.",
        "Maintain professional documentation and uphold confidentiality standards."
      ],
      jobSpecifications: {
        education: ["Education: Bachelor's or Master's degree in Psychology, Counseling, or a related field (required)"],
        experience: ["Required Experience: Minimum 3 years of coaching experience using ACT or related therapeutic approaches"],
        certification: ["Certification: Certified ACT Practitioner or equivalent psychological coaching certification (preferred)"],
        skills: [
          "Deep understanding of Acceptance and Commitment Therapy (ACT) frameworks",
          "Excellent communication, empathy, and active listening skills",
          "Strong organizational and mentoring abilities",
          "Proficiency in online coaching platforms and digital communication tools"
        ]
      },
      employmentDetails: {
        employmentType: "Full-time",
        workplaceType: "Hybrid",
        salary: "Commensurate with experience and skills",
        experienceRequired: "Minimum 3 Years",
        jobLocation: "US"
      }
    },
    {
      title: "Clinical Psychologist",
      location: "Remote / Hybrid",
      type: "Full-time",
      department: "Clinical",
      description: "Lead individual and group coaching sessions using ACT methodology.",
      primaryResponsibilities: [
        "Provide clinical psychological services to clients using evidence-based therapeutic approaches.",
        "Conduct comprehensive psychological assessments and develop treatment plans.",
        "Deliver individual and group therapy sessions focused on mental health and well-being.",
        "Collaborate with multidisciplinary teams to ensure holistic client care.",
        "Maintain accurate clinical documentation and ensure compliance with ethical standards.",
        "Participate in clinical supervision and professional development activities."
      ],
      jobSpecifications: {
        education: ["Doctoral degree in Clinical Psychology (Ph.D. or Psy.D.) from an accredited institution"],
        experience: ["Minimum 2 years of post-doctoral clinical experience"],
        certification: ["Licensed Clinical Psychologist in good standing", "ACT training or certification (preferred)"],
        skills: [
          "Strong clinical assessment and diagnostic skills",
          "Expertise in evidence-based therapeutic interventions",
          "Excellent interpersonal and communication abilities",
          "Proficient in electronic health record systems"
        ]
      },
      employmentDetails: {
        employmentType: "Full-time",
        workplaceType: "Hybrid",
        salary: "$80,000 - $120,000 per year",
        experienceRequired: "Minimum 2 Years",
        jobLocation: "Remote / US"
      }
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
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8 flex flex-col md:flex-row gap-4 shadow-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="What position are you looking for ?"
                className="w-full pl-10 pr-4 py-2 border-0 focus:outline-none text-sm text-gray-700"
              />
            </div>
            <div className="flex-1 relative border-l border-gray-200 md:pl-4">
              <MapPin className="absolute left-3 md:left-7 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-10 md:pl-10 pr-4 py-2 border-0 focus:outline-none text-sm text-gray-700"
              />
            </div>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 shadow-sm">
              Search job
            </Button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-5 text-sm">Filters</h3>

                {/* Location */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 text-sm mb-3">Location</h4>
                  <div className="space-y-2.5">
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="location" className="mr-2.5 text-cyan-500" />
                      Near me
                    </label>
                    <label className="flex items-center text-sm text-cyan-500 cursor-pointer">
                      <input type="radio" name="location" className="mr-2.5" defaultChecked />
                      Remote job
                    </label>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="location" className="mr-2.5" />
                      Exact location
                    </label>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="location" className="mr-2.5" />
                      Within 15 km
                    </label>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="location" className="mr-2.5" />
                      Within 30 km
                    </label>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="location" className="mr-2.5" />
                      Within 50 km
                    </label>
                  </div>
                </div>

                {/* Salary */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3 text-sm">Salary</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button className="flex-1 min-w-[45%] px-2 py-1.5 text-xs border border-gray-300 rounded hover:bg-white transition-colors">Hourly</button>
                    <button className="flex-1 min-w-[45%] px-2 py-1.5 text-xs border border-gray-300 rounded hover:bg-white transition-colors">Monthly</button>
                    <button className="w-full px-2 py-1.5 text-xs bg-cyan-500 text-white rounded shadow-sm">Yearly</button>
                  </div>
                  <div className="space-y-2.5">
                    <label className="flex items-center text-sm text-cyan-500 cursor-pointer">
                      <input type="radio" name="salary" className="mr-2.5" defaultChecked />
                      Any
                    </label>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="salary" className="mr-2.5" />
                      &gt; 30000k
                    </label>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="salary" className="mr-2.5" />
                      &gt; 50000k
                    </label>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="salary" className="mr-2.5" />
                      &gt; 80000k
                    </label>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="salary" className="mr-2.5" />
                      &gt; 100000k
                    </label>
                  </div>
                </div>

                {/* Date of posting */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3 text-sm">Date of posting</h4>
                  <div className="space-y-2.5">
                    <label className="flex items-center text-sm text-cyan-500 cursor-pointer">
                      <input type="radio" name="date" className="mr-2.5" defaultChecked />
                      All time
                    </label>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="date" className="mr-2.5" />
                      Last 24 hours
                    </label>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="date" className="mr-2.5" />
                      Last 3 days
                    </label>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="date" className="mr-2.5" />
                      Last 7 days
                    </label>
                  </div>
                </div>

                {/* Work experience */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3 text-sm">Work experience</h4>
                  <div className="space-y-2.5">
                    <label className="flex items-center text-sm text-cyan-500 cursor-pointer">
                      <input type="radio" name="experience" className="mr-2.5" defaultChecked />
                      Any experience
                    </label>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="experience" className="mr-2.5" />
                      Internship
                    </label>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="experience" className="mr-2.5" />
                      Work remotely
                    </label>
                  </div>
                </div>

                {/* Type of employment */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 text-sm">Type of employment</h4>
                  <div className="space-y-2.5">
                    <label className="flex items-center text-sm text-gray-900 cursor-pointer">
                      <input type="checkbox" className="mr-2.5 text-cyan-500 rounded" defaultChecked />
                      Full-time
                    </label>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="mr-2.5 rounded" />
                      Temporary
                    </label>
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="mr-2.5 rounded" />
                      Part-time
                    </label>
                  </div>
                </div>
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
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedJob?.title === position.title && selectedJob?.location === position.location
                        ? 'border-cyan-500 bg-cyan-50/30 shadow-sm'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Job Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-200 via-purple-200 to-cyan-200 flex items-center justify-center shadow-sm">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400"></div>
                          </div>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1 text-base">{position.title}</h3>
                            {position.badge && (
                              <span className="inline-block px-2 py-0.5 bg-cyan-500 text-white text-xs rounded font-medium">
                                {position.badge}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {position.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5" />
                            {position.department}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{position.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded shadow-sm font-medium">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">4</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">5</button>
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <ChevronRightIcon className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Right Sidebar - Job Details */}
            <div className="lg:col-span-4">
              {selectedJob && (
                <div className="border border-gray-200 rounded-lg p-6 sticky top-4 bg-white shadow-sm">
                  <h3 className="font-semibold text-gray-900 text-lg mb-4">{selectedJob.title}</h3>

                  {selectedJob.badge && (
                    <span className="inline-block px-3 py-1 bg-cyan-500 text-white text-xs rounded mb-4 font-medium">
                      {selectedJob.badge}
                    </span>
                  )}

                  <div className="space-y-4 mb-6">
                    {/* Primary Responsibilities */}
                    {selectedJob.primaryResponsibilities && selectedJob.primaryResponsibilities.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm mb-2">Primary Responsibility:</h4>
                        {selectedJob.primaryResponsibilities.map((responsibility, index) => (
                          <p key={index} className="text-sm text-gray-600 mt-2">
                            {responsibility}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Job Specifications */}
                    {selectedJob.jobSpecifications && (
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm mb-2">Job Specification:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {selectedJob.jobSpecifications.education?.map((item, index) => (
                            <li key={`edu-${index}`} className="list-disc list-inside">{item}</li>
                          ))}
                          {selectedJob.jobSpecifications.experience?.map((item, index) => (
                            <li key={`exp-${index}`} className="list-disc list-inside">{item}</li>
                          ))}
                          {selectedJob.jobSpecifications.certification?.map((item, index) => (
                            <li key={`cert-${index}`} className="list-disc list-inside">{item}</li>
                          ))}
                          {selectedJob.jobSpecifications.skills && selectedJob.jobSpecifications.skills.length > 0 && (
                            <li className="list-disc list-inside">Skills:</li>
                          )}
                        </ul>
                        {selectedJob.jobSpecifications.skills?.map((skill, index) => (
                          <p key={`skill-${index}`} className="text-sm text-gray-600 mt-1">
                            • {skill}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Employment Details */}
                  {selectedJob.employmentDetails && (
                    <div className="space-y-3 mb-6 text-sm">
                      {selectedJob.employmentDetails.employmentType && (
                        <div>
                          <span className="font-medium text-gray-900">Employment Type:</span>
                          <p className="text-gray-600">{selectedJob.employmentDetails.employmentType}</p>
                        </div>
                      )}
                      {selectedJob.employmentDetails.workplaceType && (
                        <div>
                          <span className="font-medium text-gray-900">Work place Type:</span>
                          <p className="text-gray-600">{selectedJob.employmentDetails.workplaceType}</p>
                        </div>
                      )}
                      {selectedJob.employmentDetails.salary && (
                        <div>
                          <span className="font-medium text-gray-900">Salary:</span>
                          <p className="text-gray-600">{selectedJob.employmentDetails.salary}</p>
                        </div>
                      )}
                      {selectedJob.employmentDetails.experienceRequired && (
                        <div>
                          <span className="font-medium text-gray-900">Experience Required:</span>
                          <p className="text-gray-600">{selectedJob.employmentDetails.experienceRequired}</p>
                        </div>
                      )}
                      {selectedJob.employmentDetails.jobLocation && (
                        <div>
                          <span className="font-medium text-gray-900">Job Location:</span>
                          <p className="text-gray-600">{selectedJob.employmentDetails.jobLocation}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <a href="/contact">
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                      Apply Now
                    </Button>
                  </a>
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