'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import NavbarLandingPage from '@/components/NavbarLandingPage'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Mail, Phone } from 'lucide-react'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'
import ScrollToTop from '@/components/ScrollToTop'

export default function ContactPage() {
  useScrollRestoration('contactScrollPosition');
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      interests: formData.getAll('interest'),
      message: formData.get('message')
    }

    try {
      console.log('Form submitted:', data)

      // Show success toast
      toast.success('Thank you for contacting us! We will get back to you soon.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      e.currentTarget.reset()
    } catch (error) {
      console.error('Form submission error:', error)

      // Show error toast
      toast.error('There was an error sending your message. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <nav>
        <NavbarLandingPage />
      </nav>

      {/* Hero Section */}
      <section className="relative bg-[url('/images/Contact_img1.png')] h-[640px] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 h-full flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              GET IN TOUCH
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              We're here to support your journey towards personal and professional growth. Our coaches are ready to help you navigate life's challenges with compassion and expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                We're here to support your journey towards personal and professional growth
              </p>

              {/* Office */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Office</h3>
                  <p className="text-gray-600">
                    Level 5, 123 Business Street,<br />
                    Sydney NSW 2000
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">support@actcoaching.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (888) 234-5678</p>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Follow Our social media</h3>
                <div className="flex gap-3">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center hover:bg-teal-200 transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-teal-600" />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center hover:bg-teal-200 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-teal-600" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center hover:bg-teal-200 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-teal-600" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Coaching Interests */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Your primary coaching interest
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="interest"
                        value="personal-growth"
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <span className="text-gray-700 text-sm">Personal growth</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="interest"
                        value="professional-development"
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <span className="text-gray-700 text-sm">Professional development</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="interest"
                        value="relationship-coaching"
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <span className="text-gray-700 text-sm">Relationship coaching</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="interest"
                        value="stress-management"
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <span className="text-gray-700 text-sm">Stress management</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="interest"
                        value="leadership-skills"
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <span className="text-gray-700 text-sm">Leadership skills</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="interest"
                        value="other"
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <span className="text-gray-700 text-sm">Other</span>
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us how we can help you..."
                    className="mt-1"
                  />
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    className="w-4 h-4 mt-1 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the terms
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'SEND'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full">
        <div className="w-full h-[500px]">
          <iframe
            src="https://maps.google.com/maps?q=Level+5,+123+Business+Street,+Sydney+NSW+2000&output=embed"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Level 5, 123 Business Street, Sydney NSW 2000"
            className="w-full"
          />
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  )
}