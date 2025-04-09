'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/providers/FirebaseAuthProvider'
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AccountSettings from '@/app/components/AccountSettings';

export default function Home() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleSignIn = () => {
    router.push('/auth/login')
  }

  const handleSignUp = () => {
    router.push('/auth/signup')
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      {/* Fixed Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                AIquisition
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/review" className="nav-link text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                Review
              </Link>
              <Link href="/practice" className="nav-link text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                Practice
              </Link>
              <Link href="/pricing" className="nav-link text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                Pricing
              </Link>
              <Link href="/account" className="nav-link text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                Account
              </Link>
            </div>

            {/* Auth Buttons and Dark Mode Toggle */}
            <div className="flex items-center space-x-4">
              {user && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                >
                  Sign Out
                </button>
              )}
              {!user && (
                <>
                  <button onClick={handleSignIn} className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                    Sign In
                  </button>
                  <button onClick={handleSignUp} className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                    Sign Up
                  </button>
                </>
              )}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black -z-10">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'linear-gradient(to right, #8a63d2 1px, transparent 1px), linear-gradient(to bottom, #8a63d2 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in relative">
              <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Master Investment Banking Interviews
        </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mt-6">
                  Built by experts from Goldman Sachs, JP Morgan, and Morgan Stanley. Practice with real interview questions and get instant feedback.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  {!user ? (
                    <>
                      <button onClick={handleSignUp} className="btn btn-primary dark:hover:bg-primary-600">
                        Start Free Trial
                      </button>
                      <button onClick={handleSignIn} className="btn btn-secondary dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
                        Learn More
                      </button>
                    </>
                  ) : (
                    <Link href="/practice" className="btn btn-primary dark:hover:bg-primary-600">
            Start Practicing
          </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="relative h-[500px] lg:h-[600px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-lg">
                  {/* Interactive Question Practice Preview */}
                  <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    {/* Four Topic Sections */}
                    <div className="grid grid-cols-2 grid-rows-2 h-full">
                      {/* Section 1: Technical Valuation */}
                      <div className="relative group border-r border-b border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 group-hover:opacity-0 z-10">
                          <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-3">
                            <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white">Technical Valuation</h3>
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 z-20">
                          <div className="flex items-center mb-2">
                            <div className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center mr-2">
                              <svg className="w-3 h-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                            </div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Technical</span>
                            <div className="ml-auto flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className={`w-3 h-3 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Walk me through a DCF analysis.</h4>
                          <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 mb-3">
                            <p className="text-xs text-gray-600 dark:text-gray-300">A Discounted Cash Flow (DCF) analysis is a valuation method used to estimate the value of an investment based on its expected future cash flows.</p>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                            <div className="flex items-start">
                              <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-xs text-gray-700 dark:text-gray-200">Good explanation of the basic concept. Consider mentioning the key components: projecting cash flows, determining discount rate, calculating present value, and terminal value.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Section 2: Behavioral Leadership */}
                      <div className="relative group border-b border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 group-hover:opacity-0 z-10">
                          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white">Behavioral Leadership</h3>
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 z-20">
                          <div className="flex items-center mb-2">
                            <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center mr-2">
                              <svg className="w-3 h-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                              </svg>
                            </div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Behavioral</span>
                            <div className="ml-auto flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className={`w-3 h-3 ${star <= 3 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Describe a situation where you had to lead a team through a challenging project.</h4>
                          <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 mb-3">
                            <p className="text-xs text-gray-600 dark:text-gray-300">This question assesses your leadership abilities, problem-solving skills, and how you handle difficult situations in a team environment.</p>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                            <div className="flex items-start">
                              <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-xs text-gray-700 dark:text-gray-200">Good use of the STAR method. Consider quantifying the results more specifically to demonstrate the impact of your leadership.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Section 3: Market Analysis */}
                      <div className="relative group border-r border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 group-hover:opacity-0 z-10">
                          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-3">
                            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white">Market Analysis</h3>
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 z-20">
                          <div className="flex items-center mb-2">
                            <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center mr-2">
                              <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            </div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Technical</span>
                            <div className="ml-auto flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className={`w-3 h-3 ${star <= 5 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">How would you analyze the current state of the tech sector and what investment opportunities do you see?</h4>
                          <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 mb-3">
                            <p className="text-xs text-gray-600 dark:text-gray-300">This question tests your market knowledge, analytical skills, and ability to identify investment opportunities in a specific sector.</p>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                            <div className="flex items-start">
                              <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-xs text-gray-700 dark:text-gray-200">Strong analysis of current trends. Consider mentioning specific companies or subsectors to demonstrate deeper knowledge.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Section 4: Problem Solving */}
                      <div className="relative group overflow-hidden">
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 group-hover:opacity-0 z-10">
                          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center mb-3">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white">Problem Solving</h3>
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 z-20">
                          <div className="flex items-center mb-2">
                            <div className="w-6 h-6 rounded-full bg-yellow-50 flex items-center justify-center mr-2">
                              <svg className="w-3 h-3 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Technical</span>
                            <div className="ml-auto flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className={`w-3 h-3 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">A company has $100M in revenue, 20% margins, and is growing at 10% annually. What would you pay for it?</h4>
                          <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 mb-3">
                            <p className="text-xs text-gray-600 dark:text-gray-300">This question tests your valuation skills and ability to apply financial concepts to a real-world scenario.</p>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                            <div className="flex items-start">
                              <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-xs text-gray-700 dark:text-gray-200">Good approach using multiple valuation methods. Consider discussing industry-specific multiples for a more comprehensive analysis.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Revolving Bank Names Ticker */}
          <div className="mt-16 overflow-hidden relative py-4">
            <div className="animate-scroll-slow whitespace-nowrap flex">
              <span className="inline-block mx-8 text-sm font-medium text-gray-500 dark:text-gray-400">
                Goldman Sachs • Morgan Stanley • JP Morgan • Blackstone • Evercore • Lazard • Rothschild • Perella Weinberg • Centerview • Moelis • 
                Jefferies • UBS • Credit Suisse • Deutsche Bank • Bank of America • Citigroup • Barclays • Nomura • RBC • Macquarie • 
                Houlihan Lokey • PJT Partners • Greenhill • Guggenheim • William Blair • Raymond James • Stifel • Cowen • Baird • Piper Sandler
              </span>
              <span className="inline-block mx-8 text-sm font-medium text-gray-500 dark:text-gray-400">
                Goldman Sachs • Morgan Stanley • JP Morgan • Blackstone • Evercore • Lazard • Rothschild • Perella Weinberg • Centerview • Moelis • 
                Jefferies • UBS • Credit Suisse • Deutsche Bank • Bank of America • Citigroup • Barclays • Nomura • RBC • Macquarie • 
                Houlihan Lokey • PJT Partners • Greenhill • Guggenheim • William Blair • Raymond James • Stifel • Cowen • Baird • Piper Sandler
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to succeed
        </h2>
            <p className="text-xl text-gray-600 dark:text-gray-100 max-w-2xl mx-auto">
              Comprehensive resources and tools to help you ace your investment banking interviews
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-purple-200 dark:border-purple-800">
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Technical Questions</h3>
              <p className="text-gray-600 dark:text-gray-300">Practice with real interview questions from top investment banks, covering valuation, accounting, and financial modeling.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-purple-200 dark:border-purple-800">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Behavioral Questions</h3>
              <p className="text-gray-600 dark:text-gray-300">Master common behavioral questions with AI-powered feedback on your responses and communication style.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-purple-200 dark:border-purple-800">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Progress Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">Monitor your improvement over time with detailed analytics and personalized recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Questions Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-100 max-w-2xl mx-auto">
              Sample questions from our extensive question bank
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-md transition-shadow border border-purple-200 dark:border-purple-800">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Valuation Methods</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-100 mb-4">"Walk me through a DCF analysis and explain the key assumptions that would most impact the valuation."</p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-300">
                <span>Difficulty: Advanced</span>
                <span>Category: Technical</span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-md transition-shadow border border-purple-200 dark:border-purple-800">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Leadership Experience</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-100 mb-4">"Describe a situation where you had to lead a team through a challenging project. What was your approach and what did you learn?"</p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-300">
                <span>Difficulty: Intermediate</span>
                <span>Category: Behavioral</span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-md transition-shadow border border-purple-200 dark:border-purple-800">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Market Analysis</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-100 mb-4">"How would you analyze the current state of the tech sector and what investment opportunities do you see?"</p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-300">
                <span>Difficulty: Advanced</span>
                <span>Category: Technical</span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-md transition-shadow border border-purple-200 dark:border-purple-800">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Problem Solving</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-100 mb-4">"A company has $100M in revenue, 20% margins, and is growing at 10% annually. What would you pay for it?"</p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-300">
                <span>Difficulty: Advanced</span>
                <span>Category: Technical</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            {user ? (
              <Link href="/practice" className="btn btn-primary">
                View All Questions
              </Link>
            ) : (
              <button onClick={handleSignUp} className="btn btn-primary">
                Sign Up to Access Questions
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose AIquisition Section */}
      <section className="py-20 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose AIquisition?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-100 max-w-2xl mx-auto">
              Our platform offers unique advantages to help you succeed in your investment banking interviews
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-purple-200 dark:border-purple-800">
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">AI-Powered Feedback</h3>
              <p className="text-gray-600 dark:text-gray-100">Get instant, detailed feedback on your answers with specific improvement suggestions.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-purple-200 dark:border-purple-800">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Real Questions</h3>
              <p className="text-gray-600 dark:text-gray-100">Practice with questions from actual investment banking interviews at top firms.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-purple-200 dark:border-purple-800">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Comprehensive Coverage</h3>
              <p className="text-gray-600 dark:text-gray-100">Cover all interview topics: technical, behavioral, and case studies.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-purple-200 dark:border-purple-800">
              <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Track Progress</h3>
              <p className="text-gray-600 dark:text-gray-100">Monitor your improvement over time with detailed analytics and insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-100 max-w-2xl mx-auto">
              Hear from candidates who have successfully landed investment banking roles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white">Michael Chen</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Analyst at Goldman Sachs</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-100">"AIquisition was instrumental in my interview preparation. The AI feedback helped me refine my answers, and I landed offers from three top banks!"</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Associate at JP Morgan</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-100">"The technical questions were spot-on. I practiced for hours and felt completely prepared for my interviews. Highly recommend!"</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white">David Rodriguez</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Summer Analyst at Morgan Stanley</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-100">"As a non-target school student, I needed all the help I could get. AIquisition's platform gave me the confidence and skills to compete with anyone."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-900 dark:to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Ace Your Investment Banking Interviews?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of successful candidates who have used AIquisition to land their dream jobs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <button onClick={handleSignUp} className="btn bg-white text-primary-600 hover:bg-gray-100">
                  Start Free Trial
                </button>
                <button onClick={handleSignIn} className="btn bg-transparent border-2 border-white text-white hover:bg-white/10">
                  Sign In
                </button>
              </>
            ) : (
              <Link href="/practice" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Start Practicing
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold">AIquisition</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Master investment banking interviews with AI-powered practice and feedback.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.353.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Testimonials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} AIquisition. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 