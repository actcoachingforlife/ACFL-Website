"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import ShinyText from "@/components/ShinyText";
import Footer from "@/components/Footer";
import Ballpit from "@/components/Ballpit";
import {
  Star,
  ChevronRight,
  ArrowRight,
  Globe,
  Sprout,
  Users,
} from "lucide-react";
import NavbarLandingPage from "@/components/NavbarLandingPage";
import AssessmentCompleteModal from "@/components/AssessmentCompleteModal";
import Testimonial from "./(public)/component/testimonial";
import Contact from "./(public)/component/contactUs";
import ScrollToTop from "@/components/ScrollToTop";
import imgone from "./(public)/images/HomeImg1.png";
import imgtwo from "./(public)/images/HomeImg2.png";
import imgthree from "./(public)/images/HomeImg3.png";
import imgfour from "./(public)/images/HomeImg4.png";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function HomePage() {
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting for framer-motion
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll restoration - save scroll position before navigation
  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    };

    // Save scroll position before navigating away
    const handleBeforeUnload = () => {
      saveScrollPosition();
    };

    // Listen for navigation events
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Save scroll position periodically (every 500ms while scrolling)
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(saveScrollPosition, 500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      saveScrollPosition(); // Save on unmount
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Restore scroll position on mount
  useEffect(() => {
    setIsInitialLoad(false);
    const savedPosition = sessionStorage.getItem('homeScrollPosition');
    if (savedPosition) {
      // Use setTimeout to ensure the page is fully rendered before scrolling
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: 'smooth'
        });
      }, 100);
    }
  }, []);

  // Show loading until mounted to prevent framer-motion SSR issues
  if (!mounted) {
    return (
      <div className={`flex flex-col min-h-screen bg-white ${poppins.className}`}>
        <nav>
          <NavbarLandingPage />
        </nav>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col min-h-screen bg-white ${poppins.className}`}>
      <nav>
        <NavbarLandingPage />
      </nav>
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#e9f6f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-ink-dark dark:text-white mb-6 leading-tight">
                Find the Perfect Coach for Meaningful Change
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Professional ACT coaching that helps you overcome challenges,
                build resilience, and create meaningful life changes. Get
                matched with qualified coaches in 24 hours.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col  sm:flex-row gap-4 mb-8 items-center">
                <a href="/assessment">
                  <button className="flex items-center bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-8 py-4 text-lg font-medium transition-all shadow-md hover:shadow-lg w-full sm:w-auto">
                    Get Started Today
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </a>
                <a href="/assessment">
                  <button className="flex items-center border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-lg px-8 py-4 text-lg font-medium transition-all shadow-sm w-full sm:w-auto">
                    Watch Video
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </a>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative overflow-hidden shadow-2xl">
                <img
                  src="/images/Home_heroImg.png"
                  alt="Professional ACT coaching session"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-2">
              Coaching
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Why choose ACT coaching
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Proven strategies for personal and professional growth
            </p>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Personalized Matching */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-80 md:h-96">
                <img
                  src="/images/Home_img1.png"
                  alt="Personalized matching for coaching"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-3 transform group-hover:-translate-y-1 transition-transform duration-300">
                    Personalized Matching
                  </h3>
                  <p className="text-sm text-gray-200 transform group-hover:-translate-y-1 transition-transform duration-300">
                    Our advanced algorithm considers your goals, personality, and preferences to match you with the perfect coach.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Flexible Scheduling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-80 md:h-96">
                <img
                  src="/images/Home_img2.png"
                  alt="Flexible coaching session scheduling"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-3 transform group-hover:-translate-y-1 transition-transform duration-300">
                    Flexible Scheduling
                  </h3>
                  <p className="text-sm text-gray-200 transform group-hover:-translate-y-1 transition-transform duration-300">
                    Book sessions that fit your schedule. Morning, evening, or weekend - we have coaches available when you need them.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Qualified Professionals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-80 md:h-96">
                <img
                  src="/images/Home_img3.png"
                  alt="Qualified professional ACT coaches"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-3 transform group-hover:-translate-y-1 transition-transform duration-300">
                    Qualified Professionals
                  </h3>
                  <p className="text-sm text-gray-200 transform group-hover:-translate-y-1 transition-transform duration-300">
                    Our coaches are carefully vetted, trained in ACT methodology, and committed to helping you achieve your goals.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-[#e9f6f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-10 lg:p-16">
              {/* Left Content Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8 lg:space-y-10 flex flex-col justify-center"
              >
                {/* Personal Growth */}
                <div className="flex gap-4 md:gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Sprout className="w-6 h-6 md:w-7 md:h-7 text-slate-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                      Personal growth
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      Develop resilience and emotional intelligence through
                      targeted psychological strategies.
                    </p>
                  </div>
                </div>

                {/* Accessibility */}
                <div className="flex gap-4 md:gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 md:w-7 md:h-7 text-slate-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                      Accessibility
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      Coaching available globally, with sessions in multiple
                      languages and time zones.
                    </p>
                  </div>
                </div>

                {/* Holistic Support */}
                <div className="flex gap-4 md:gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 md:w-7 md:h-7 text-slate-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                      Holistic support
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      Comprehensive guidance addressing mental, emotional, and
                      professional development.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col  sm:flex-row gap-4 mb-8 items-center">
                  <a href="/assessment">
                    <button className="flex items-center border-2 border-gray-300 rounded-md text-black px-6 py-3 w-full sm:w-auto">
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </a>
                  <a href="/individual-coaching">
                    <button className="flex items-center rounded-md text-black px-6 py-3 w-full sm:w-auto">
                      Explore Benefits
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </a>
                </div>
              </motion.div>

              {/* Right Image Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative order-first lg:order-last"
              >
                <div className="relative overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto lg:h-full">
                  <img
                    src="/images/Home_img4.png"
                    alt="Person working on laptop with cozy workspace setup"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    {/* Services Section */}
<section id="services" className="py-12 md:py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10"
    >
      <p className="text-sm uppercase tracking-wider text-gray-600 mb-2">
        Services
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Coaching solutions for every need
      </h1>
      <p className="text-base md:text-lg text-gray-600">
        Personalized support across individual, group, and corporate programs
      </p>
    </motion.div>

    {/* Cards Row */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 - Individual Coaching */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <div className="relative h-80 md:h-96">
          <img
            src="/images/Home_img5.png"
            alt="Individual coaching sessions"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300 flex flex-col justify-end p-6 text-white">
            <h3 className="text-2xl font-bold mb-3 transform group-hover:-translate-y-1 transition-transform duration-300">
              Individual Coaching
            </h3>
            <p className="text-sm text-gray-200 transform group-hover:-translate-y-1 transition-transform duration-300">
              One-on-one personalized sessions tailored to your unique goals and challenges.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Card 2 - Group Coaching */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <div className="relative h-80 md:h-96">
          <img
            src="/images/Home_img6.png"
            alt="Group coaching sessions"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300 flex flex-col justify-end p-6 text-white">
            <h3 className="text-2xl font-bold mb-3 transform group-hover:-translate-y-1 transition-transform duration-300">
              Group Coaching
            </h3>
            <p className="text-sm text-gray-200 transform group-hover:-translate-y-1 transition-transform duration-300">
              Connect with peers in supportive group sessions that foster shared growth and learning.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Card 3 - Corporate Wellness */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <div className="relative h-80 md:h-96">
          <img
            src="/images/Home_img7.png"
            alt="Corporate wellness programs"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300 flex flex-col justify-end p-6 text-white">
            <h3 className="text-2xl font-bold mb-3 transform group-hover:-translate-y-1 transition-transform duration-300">
              Corporate Wellness
            </h3>
            <p className="text-sm text-gray-200 transform group-hover:-translate-y-1 transition-transform duration-300">
              Comprehensive workplace programs designed to enhance team performance and well-being.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>


      <section id="services" className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
              Impact
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our coaching by the numbers
            </h1>
            <p className="text-gray-600 text-lg">
              Transformative results across personal and professional domains
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-6 gap-8 items-center">
            {/* Statistics Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-2 space-y-5"
            >
              <div className="bg-white shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-center">
                <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                  3,000+
                </div>
                <p className="text-gray-700 font-medium text-lg">
                  Active clients worldwide
                </p>
              </div>

              <div className="bg-white  shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-center">
                <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                  150+
                </div>
                <p className="text-gray-700 font-medium text-lg">
                  Certified ACT coaches
                </p>
              </div>

              <div className="bg-white  shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-center">
                <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                  25+
                </div>
                <p className="text-gray-700 font-medium text-lg">
                  Countries served
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-4 shadow-lg"
            >
              <img
                src="/images/Home_img8.png"
                alt="Professional coaching session"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Stories Section */}
      <Testimonial />
      {/* Start Your Transformation Today Section */}
      <section className="bg-white min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <div className="flex flex-col text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Start your transformation today
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Unlock your potential with personalized coaching matched to your
                unique journey
              </p>
              <div className="flex justify-center gap-4">
                <a href="/assessment">
                  <button className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 font-medium transition-all shadow-md hover:shadow-lg">
                    Take Assessment
                  </button>
                </a>
                <a href="/blog">
                  <button className="border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-lg px-6 py-3 font-medium transition-all shadow-sm">
                    Learn More
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            src="/images/Home_img9.png"
            alt=""
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* Contact Us Section */}
      <Contact />
      {/* Footer */}
      <Footer />
      {/* Assessment Complete Modal */}
      <AssessmentCompleteModal
        isOpen={showAssessmentModal}
        onClose={() => setShowAssessmentModal(false)}
      />
      <ScrollToTop />
    </div>
  );
}

// Force dynamic rendering - disable static optimization for this page
export const dynamic = "force-dynamic";
