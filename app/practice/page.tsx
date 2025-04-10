'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { topics } from '../data/topics';
import { TopicProgress, getAllTopicsProgress, resetAllProgress, getGeneratedQuestions, getCorrectQuestions } from '../utils/progress';
import { useUserData } from '@/app/providers/UserDataProvider';
import { useAuth } from '@/app/providers/FirebaseAuthProvider';
import { useRouter } from 'next/navigation';
import { getQuestionsByTopic } from '../data/questions';
import { useTheme } from 'next-themes';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserProgress } from '@/app/types';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Navigation from '../components/Navigation';

export default function PracticePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { userProgress, questions, fetchUserData } = useUserData();
  const [topicsProgress, setTopicsProgress] = useState<TopicProgress[]>([]);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [questionType, setQuestionType] = useState<'behavioral' | 'technical'>('technical');
  const [isTopicsExpanded, setIsTopicsExpanded] = useState(true);
  const [isPracticeTipsExpanded, setIsPracticeTipsExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

    const loadData = async () => {
      try {
        // Load user data from Firebase
        await fetchUserData(user.uid);

        // Load progress data using Firebase data
        const progress = getAllTopicsProgress(topics, userProgress);
        setTopicsProgress(progress);

        // Calculate totals
        let correct = 0;
        let total = 0;
        progress.forEach(topic => {
          if (topic.totalQuestions > 0) {
            correct += topic.correctAnswers;
            total += topic.totalQuestions;
          }
        });
        setTotalCorrectAnswers(correct);
        setTotalQuestions(total);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user, router, fetchUserData, userProgress]);

  const handleResetProgress = async () => {
    if (window.confirm('Are you sure you want to reset all progress? This will remove all generated questions and reset all counters.')) {
      if (!user) return;
      
      try {
        // Reset progress in Firebase
        const emptyProgress: UserProgress = {
          userId: user.uid,
          topics: {},
          lastAccessed: new Date()
        };
        await setDoc(doc(db, 'userProgress', user.uid), emptyProgress);
        
        // Reset local storage
        resetAllProgress();
        
        // Reload user data
        await fetchUserData(user.uid);
        
        // Reload the page to reflect the changes
        window.location.reload();
      } catch (error) {
        console.error('Error resetting progress:', error);
      }
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignIn = () => {
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800 dark:border-white"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black transition-colors duration-200">
      {/* Fixed Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
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
              <Link href="/practice" className="nav-link font-bold text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
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
                  onClick={handleSignOut}
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
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interview Practice</h1>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                {/* Question Type Toggle */}
                <div className="flex items-center space-x-4 mb-8">
                  <button
                    onClick={() => setQuestionType('behavioral')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      questionType === 'behavioral'
                        ? 'bg-gray-800 text-white dark:bg-white dark:text-black'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    Behavioral
                  </button>
                  <button
                    onClick={() => setQuestionType('technical')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      questionType === 'technical'
                        ? 'bg-gray-800 text-white dark:bg-white dark:text-black'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    Technical
                  </button>
                </div>

                {questionType === 'behavioral' ? (
                  // Behavioral Questions Coming Soon Section
                  <div className="bg-white dark:bg-black p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 text-center">
                    <div className="mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Behavioral Questions Coming Soon!</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        We're working hard to bring you high-quality behavioral interview questions. Stay tuned for updates!
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        In the meantime, practice our technical questions to strengthen your investment banking knowledge.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Continue Your Learning Journey Section */}
                    <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 mb-8 lg:col-span-4">
                      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Continue Your Learning Journey</h2>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Practice with a mix of questions to test your knowledge across different topics.
                          </p>
                          <div className="flex items-center space-x-4">
                            <Link
                              href="/practice/question?type=mixed"
                              className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-100"
                            >
                              Start
                            </Link>
                            <Link
                              href="/practice/question-bank?type=mixed"
                              className="inline-block px-6 py-3 bg-white text-gray-800 border border-gray-800 rounded-lg hover:bg-gray-50 transition-colors dark:bg-black dark:text-white dark:border-white dark:hover:bg-gray-900"
                            >
                              Question Bank
                            </Link>
                          </div>
                        </div>
                        <div className="ml-8 flex items-center justify-center">
                          <div className="relative w-24 h-24">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                              <path
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="3"
                                className="dark:stroke-gray-800"
                              />
                              <path
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#8B5CF6"
                                strokeWidth="3"
                                strokeDasharray={`${(totalCorrectAnswers / totalQuestions) * 100}, 100`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                  {Math.round((totalCorrectAnswers / totalQuestions) * 100)}%
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Topic Panels Title */}
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Topic-Specific Questions</h2>

                    {/* Topic Panels */}
                    <div className="mt-8">
                      <button
                        onClick={() => setIsTopicsExpanded(!isTopicsExpanded)}
                        className="group flex items-center justify-between w-full px-6 py-4 text-left bg-white dark:bg-black rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800"
                      >
                        <div className="flex items-center space-x-4">
                          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Topics</h2>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {topics.length} topics available
                          </span>
                        </div>
                        <div className="relative w-8 h-8">
                          <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isTopicsExpanded ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isTopicsExpanded ? 'rotate-180 opacity-100' : 'rotate-0 opacity-0'}`}>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </div>
                        </div>
                      </button>
                      <div 
                        className={`grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 transition-all duration-500 ease-in-out transform ${
                          isTopicsExpanded 
                            ? 'opacity-100 translate-y-0 max-h-[2000px]' 
                            : 'opacity-0 -translate-y-4 max-h-0 overflow-hidden pointer-events-none'
                        }`}
                      >
                        {topics.map((topic) => {
                          const progress = topicsProgress.find(p => p.topicId === topic.id) || {
                            totalQuestions: 0,
                            answeredQuestions: 0,
                            correctAnswers: 0
                          };
                          
                          // Calculate progress percentage
                          const progressPercentage = progress.totalQuestions > 0 
                            ? Math.round((progress.correctAnswers / progress.totalQuestions) * 100) 
                            : 0;

                          return (
                            <div
                              key={topic.id}
                              className="group bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300 relative"
                            >
                              <div className="absolute top-4 right-4">
                                <Link
                                  href={`/practice/question-bank?topic=${encodeURIComponent(topic.id)}`}
                                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                  title="View Question Bank"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                  </svg>
                                </Link>
                              </div>
                              
                              <div className="mb-4">
                                <div className="flex justify-between items-start">
                                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{topic.name}</h3>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {topic.description}
                                </p>
                              </div>
                              
                              <div className="flex justify-between items-center mt-auto">
                                <Link
                                  href={`/practice/question?topic=${encodeURIComponent(topic.id)}&type=technical`}
                                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                >
                                  Start Practice
                                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </Link>
                                
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    {progressPercentage}%
                                  </span>
                                  <div className="w-24 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-500 ease-out"
                                      style={{ width: `${progressPercentage}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
                
                {/* Reset button moved to the bottom */}
                <div className="mt-8 text-center">
                  <button
                    onClick={handleResetProgress}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Reset All Progress
                  </button>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                {/* Practice Tips Section - Minimalistic Design */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Practice Tips</h2>
                    <button
                      onClick={() => setIsPracticeTipsExpanded(!isPracticeTipsExpanded)}
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      {isPracticeTipsExpanded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className={`transition-all duration-300 ease-in-out ${isPracticeTipsExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="bg-white dark:bg-black p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <div className="flex-shrink-0 mt-1">
                            <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Start with topic-specific practice to build foundational knowledge.</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="flex-shrink-0 mt-1">
                            <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Review model answers to identify knowledge gaps.</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="flex-shrink-0 mt-1">
                            <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Use mixed practice to test knowledge across topics.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            © 2024 AIquisition. All rights reserved.
          </div>
      </div>
      </footer>
    </div>
  );
}