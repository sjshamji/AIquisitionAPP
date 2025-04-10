'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useAuth } from '@/app/providers/FirebaseAuthProvider';
import Navigation from '../components/Navigation';

export default function ReviewPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Modules');
  
  const topics = [
    { id: 'valuation', name: 'Valuation' },
    { id: 'accounting', name: 'Accounting' },
    { id: 'financial-modeling', name: 'Financial Modeling' },
    { id: 'market-analysis', name: 'Market Analysis' },
    { id: 'behavioral', name: 'Behavioral' },
    { id: 'case-studies', name: 'Case Studies' },
  ];

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const handleSignIn = () => {
    router.push('/auth/login');
  };
  
  const handleSignUp = () => {
    router.push('/auth/signup');
  };
  
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black transition-colors duration-200">
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
              <Link href="/review" className="nav-link font-bold text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                Review
              </Link>
              <Link href="/practice" className="nav-link text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                Practice
              </Link>
              <Link href="/pricing" className="nav-link text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                Pricing
              </Link>
              {user && (
                <Link href="/account" className="nav-link text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                  Account
                </Link>
              )}
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
                <button onClick={handleSignIn} className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                  Sign In
                </button>
              )}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-16 relative">
        {/* Under Construction Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="bg-white dark:bg-black p-8 rounded-xl shadow-xl max-w-md text-center border border-gray-200 dark:border-gray-700">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Under Construction</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This section is currently being developed. We're working hard to bring you comprehensive study materials soon.
            </p>
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              Return to Home
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Review Section</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Comprehensive study materials to help you master key concepts
              </p>
            </div>

            {/* Content Area */}
            <div className="bg-white dark:bg-black rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
              <div className="p-6">
                {/* Toggle Tabs */}
                <div className="flex justify-center mb-8">
                  <div className="inline-flex rounded-lg bg-gray-200 dark:bg-gray-800 p-1">
                    {['Modules', 'Formulas', 'Tips'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          activeTab === tab
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topic Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topics.map((topic) => (
                    <div 
                      key={topic.id}
                      className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">{topic.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Study concepts with topic overviews, lessons, and videos.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900/50 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} AIquisition. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 