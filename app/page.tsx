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
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  const handleSignIn = () => {
    router.push('/auth/login')
  }

  const handleSignUp = async () => {
    try {
      // Redirect to the signup page
      router.push('/auth/signup');
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <div className="relative">
      {/* Network Grid Background */}
      <div className="fixed inset-0 -z-10 bg-white">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(138,99,210,0.15) 2px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(91,145,229,0.1) 2px, transparent 0)
          `,
          backgroundSize: '40px 40px, 30px 30px',
          backgroundPosition: '0 0, 20px 20px',
          transform: 'translate3d(0, calc(var(--scroll) * -0.1px), 0)',
          transition: 'transform 0.1s ease-out'
        }} />
        
        {/* Connection Lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(138,99,210,0.05) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(91,145,229,0.05) 25%, transparent 25%)
          `,
          backgroundSize: '60px 60px',
          transform: 'translate3d(0, calc(var(--scroll) * -0.2px), 0)',
          transition: 'transform 0.1s ease-out'
        }} />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <div className="flex items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                    AIquisition
                  </span>
                  <div className="ml-2 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Navigation Links */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4">
                  <Link href="/practice?topic=investment-banking" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                    Investment Banking
                  </Link>
                  <Link href="/practice?topic=product" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                    Product
                  </Link>
                  <Link href="/practice?topic=analytics" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                    Analytics
                  </Link>
                  <Link href="/practice?topic=strategy" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                    Strategy & Business Ops
                  </Link>
                  <Link href="/coaching" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                    Coaching
                  </Link>
                </div>
              </div>
              
              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <button 
                      onClick={() => router.push('/practice')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                    >
                      Dashboard
                    </button>
                    <AccountSettings />
                  </>
                ) : (
                  <>
                    <button 
                      onClick={handleSignIn}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={handleSignUp}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Investment Banking Interview Prep
                </h1>
                <p className="text-xl text-gray-600">
                  Built by experts from Goldman Sachs, JP Morgan, and Morgan Stanley.
                </p>
                <div className="pt-4">
                  {!user && (
                    <button 
                      onClick={handleSignUp}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Sign up today!
                    </button>
                  )}
                </div>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-64 w-64 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">AI-Powered Practice</h3>
                <p className="text-gray-600">
                  Get personalized questions and feedback based on your performance.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Comprehensive Coverage</h3>
                <p className="text-gray-600">
                  Practice questions covering all aspects of investment banking interviews.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Expert Insights</h3>
                <p className="text-gray-600">
                  Learn from industry experts with detailed explanations for each question.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <span className="text-gray-500 font-medium">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">James Davis</h4>
                    <p className="text-sm text-gray-600">Investment Banking Analyst, Goldman Sachs</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The AI-powered feedback helped me identify areas for improvement in my technical answers. Landed offers from multiple bulge bracket banks!"
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <span className="text-gray-500 font-medium">SL</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah Lee</h4>
                    <p className="text-sm text-gray-600">Associate, JP Morgan</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The practice questions were incredibly realistic. The detailed explanations helped me understand concepts I struggled with."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <span className="text-gray-500 font-medium">MR</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Michael Rodriguez</h4>
                    <p className="text-sm text-gray-600">Analyst, Morgan Stanley</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "From technical skills to behavioral questions, this platform prepared me for every aspect of the interview process."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Simple Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Monthly Plan */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Subscription</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">$49</span>
                  <span className="ml-1 text-gray-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Unlimited practice questions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>AI-powered feedback</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Progress tracking</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic resources</span>
                  </li>
                </ul>
                <button 
                  onClick={handleSignUp}
                  className="block w-full py-3 px-4 text-center bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Start Free Trial
                </button>
              </div>

              {/* Annual Plan */}
              <div className="bg-white p-8 rounded-lg shadow-md border-2 border-primary-500 relative">
                <div className="absolute top-0 right-0 bg-primary-500 text-white px-3 py-1 text-sm font-medium rounded-tl-lg">
                  Best Value
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Annual Pass</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">$399</span>
                  <span className="ml-1 text-gray-500">/year</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Everything in Monthly plan</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save 33% compared to monthly</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Premium resources</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Priority support</span>
                  </li>
                </ul>
                <button 
                  onClick={handleSignUp}
                  className="block w-full py-3 px-4 text-center bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Get Annual Pass
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center mb-4">
                  <span className="text-xl font-bold">AIquisition</span>
                  <div className="ml-2 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex space-x-4 mb-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Links */}
              <div className="col-span-1">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Team</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Terms</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Privacy</a></li>
                </ul>
              </div>

              <div className="col-span-1">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white">Free Resources</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Investment Banking Guide</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Behavioral Guide</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Support</a></li>
                </ul>
              </div>

              <div className="col-span-1">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Practice</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white">Investment Banking</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Analytics</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Behavioral</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Resume Advice</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Expert Program</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} AIquisition. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 