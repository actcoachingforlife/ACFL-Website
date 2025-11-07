"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, ExternalLink, Calendar, Award, FileText, Mail, Search, Facebook, Twitter, Instagram } from "lucide-react"
import GradientText from "@/components/GradientText"
import SpotlightCard from "@/components/SpotlightCard"
import Footer from "@/components/Footer"
import NavbarLandingPage from "@/components/NavbarLandingPage"
import { getApiUrl } from "@/lib/api"
import Image from "next/image"

interface ContentData {
  id: string
  title: string
  content: string
  slug: string
  meta_description?: string
}

interface PressRelease {
  date: string
  title: string
  excerpt: string
  link: string
  category?: string
  readTime?: string
  image?: string
  featured?: boolean
}

interface MediaKitItem {
  title: string
  description: string
  size: string
}

interface Award {
  year: string
  title: string
  org: string
}

export default function PressPage() {
  const [pressContent, setPressContent] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)

  // Default press releases with featured article
  const defaultPressReleases: PressRelease[] = [
    {
      date: "January 15, 2024",
      title: "ACT Coaching For Life Raises $10M Series A to Expand Access to Mental Health Coaching",
      excerpt: "Leading ACT-based coaching platform secures funding to democratize access to evidence-based mental health support.",
      link: "#",
      category: "Wellness",
      readTime: "5 min read",
      image: "/images/corporate-hero.png",
      featured: true
    },
    {
      date: "December 1, 2023",
      title: "New Study Shows 87% Improvement in Client Outcomes Using ACT Methodology",
      excerpt: "Independent research validates the effectiveness of our personalized coaching approach.",
      link: "#",
      category: "Personal Growth",
      readTime: "5 min read",
      image: "/images/coaching-hero.png"
    },
    {
      date: "October 20, 2023",
      title: "ACT Coaching For Life Partners with Major Corporations for Employee Wellness Programs",
      excerpt: "Fortune 500 companies adopt our platform to support employee mental health and wellbeing.",
      link: "#",
      category: "Personal Growth",
      readTime: "5 min read",
      image: "/images/comp-wellness.png"
    }
  ]

  const defaultMediaKit = [
    { title: "Company Logos", description: "High-resolution logos in various formats", size: "2.3 MB" },
    { title: "Executive Bios", description: "Leadership team biographies and headshots", size: "1.8 MB" },
    { title: "Company Fact Sheet", description: "Key statistics and company information", size: "450 KB" },
    { title: "Product Screenshots", description: "Platform interface and feature highlights", size: "5.2 MB" }
  ]

  const defaultAwards = [
    { year: "2023", title: "Best Mental Health Platform", org: "Digital Health Awards" },
    { year: "2023", title: "Top Workplace Culture", org: "Remote Work Association" },
    { year: "2022", title: "Innovation in Therapy", org: "Psychology Today" },
    { year: "2022", title: "Fastest Growing Startup", org: "TechCrunch" }
  ]

  useEffect(() => {
    fetchPressContent()
  }, [])

  const fetchPressContent = async () => {
    try {
      const response = await fetch(`${getApiUrl()}/api/content/public/content?slug=press`)
      if (response.ok) {
        const data = await response.json()
        setPressContent(data)
      }
    } catch (error) {
      console.error('Error fetching press content:', error)
    } finally {
      setLoading(false)
    }
  }

  // Parse content from CMS if available
  const parseContent = () => {
    if (!pressContent?.content) return null
    try {
      return JSON.parse(pressContent.content)
    } catch {
      return null
    }
  }

  const cmsContent = parseContent()

  const pressReleases = cmsContent?.pressReleases?.releases || defaultPressReleases
  const mediaKit = cmsContent?.mediaKit?.items || defaultMediaKit
  const awards = cmsContent?.awards?.items || defaultAwards

  const featuredArticle = pressReleases.find((article: PressRelease) => article.featured) || pressReleases[0]
  const regularArticles = pressReleases.filter((article: PressRelease) => !article.featured || article !== featuredArticle)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <nav>
        <NavbarLandingPage />
      </nav>

      {/* Hero Section */}
      <section className="py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8"
          >
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Press Center
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Latest news, updates, and press releases from ACT Coaching for Life.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:flex-shrink-0">
              <Button
                className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white px-8"
                size="lg"
              >
                Subscribe
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 px-8"
                size="lg"
              >
                Browse All Article
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200"
          >
            <div className="relative h-[400px] w-full">
              <img
                src={featuredArticle.image || "/images/corporate-hero.png"}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-block bg-[#E8F5F5] text-[#00B4B4] text-xs font-medium px-3 py-1 rounded">
                  {featuredArticle.category || "Wellness"}
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="mr-4">{featuredArticle.readTime || "5 min read"}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Camila Doe</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {regularArticles.slice(0, 2).map((article: PressRelease, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="relative h-[200px] w-full">
                  <img
                    src={article.image || "/images/coaching-hero.png"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="inline-block bg-[#E8F5F5] text-[#00B4B4] text-xs font-medium px-3 py-1 rounded mr-3">
                      {article.category || "Personal Growth"}
                    </span>
                    <span className="text-sm text-gray-500">{article.readTime || "5 min read"}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {article.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <Button 
              className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white px-12"
              size="lg"
            >
              Next
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-[400px] md:h-auto">
                <img
                  src="/images/coaching-hero.png"
                  alt="Newsletter"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Subscribe to our newsletter to receive our daily reviews
                </h2>
                <p className="text-gray-600 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit porttitor iaculis placerat sit. Imperdiet morbi commodo sed.
                </p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B4B4] focus:border-transparent"
                  />
                  <Button className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white px-8">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Media Kit
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Download our media kit for logos, bios, and company information
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaKit.map((item: MediaKitItem, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-[#E8F5F5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-[#00B4B4]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <p className="text-xs text-gray-500 mb-4">{item.size}</p>
                <Button 
                  size="sm" 
                  className="bg-[#00B4B4] hover:bg-[#009999] text-white w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Awards & Recognition
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Recognition for our commitment to excellence in mental health and coaching
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award: Award, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-[#FFF3E0] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#FF9800]" />
                </div>
                <div className="inline-block bg-[#FFF3E0] text-[#FF9800] text-sm font-semibold px-3 py-1 rounded mb-3">
                  {award.year}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{award.title}</h3>
                <p className="text-gray-600 text-sm">{award.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}