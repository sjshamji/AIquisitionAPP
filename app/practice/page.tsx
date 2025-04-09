'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { topics } from '../data/topics';
import { TopicProgress, getAllTopicsProgress, resetAllProgress, getGeneratedQuestions, getCorrectQuestions } from '../utils/progress';
import { useUserData } from '@/app/providers/UserDataProvider';
import { useAuth } from '@/app/providers/FirebaseAuthProvider';
import { useRouter } from 'next/navigation';
import { getQuestionsByTopic } from '../data/questions';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserProgress } from '@/app/types';
import { useTheme } from 'next-themes';

export default function PracticePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { userProgress, questions, fetchUserData } = useUserData();
  const [topicsProgress, setTopicsProgress] = useState<TopicProgress[]>([]);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800 dark:border-white"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black py-12 px-4 sm:px-6 lg:px-8">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, #8a63d2 1px, transparent 1px), linear-gradient(to bottom, #8a63d2 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interview Practice</h1>
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
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
            <Link 
              href="/"
              className="text-gray-800 hover:text-gray-900 dark:text-white dark:hover:text-gray-200 px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Topics</h2>
            <div className="space-y-4">
              {topics.map((topic) => {
                const topicProgress = topicsProgress.find(p => p.topicId === topic.id) || {
                  totalQuestions: 0,
                  answeredQuestions: 0,
                  correctAnswers: 0
                };
                
                // Get the number of correct questions for this topic
                const correctQuestions = getCorrectQuestions(topic.id);
                
                // Calculate progress percentage based on total questions
                const progressPercentage = topicProgress.totalQuestions > 0 
                  ? Math.round((topicProgress.correctAnswers / topicProgress.totalQuestions) * 100) 
                  : 0;
                
                return (
                  <div 
                    key={topic.id}
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fade-in"
                  >
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="mb-4 md:mb-0 md:mr-6 md:w-2/3">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{topic.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{topic.description}</p>
                      </div>
                      
                      <div className="w-full md:w-1/3 min-w-[200px]">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{topicProgress.correctAnswers} of {topicProgress.totalQuestions} questions</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-gray-800 dark:bg-white h-2.5 rounded-full transition-all duration-500" 
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-green-600 dark:text-green-400">{topicProgress.correctAnswers} correct</span>
                          <span className="text-gray-500 dark:text-gray-400">{progressPercentage}% complete</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4 space-x-3">
                      <Link 
                        href={`/practice/question?topic=${encodeURIComponent(topic.id)}`}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                      >
                        Practice
                      </Link>
                      <Link 
                        href={`/practice/question-bank?topic=${encodeURIComponent(topic.id)}`}
                        className="px-4 py-2 bg-white text-gray-800 border border-gray-800 rounded-lg hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:text-white dark:border-white dark:hover:bg-gray-700"
                      >
                        Question Bank
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Reset button moved to the bottom */}
            <div className="mt-8 text-center">
              <button
                onClick={handleResetProgress}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Reset All Progress
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md sticky top-4 mb-6 border border-gray-200 dark:border-gray-700 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Overall Progress</h2>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e9e3f6"
                      strokeWidth="3"
                      className="dark:stroke-gray-700"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4a5568"
                      strokeWidth="3"
                      className="dark:stroke-white"
                      strokeDasharray={`${totalQuestions > 0 ? (totalCorrectAnswers / totalQuestions) * 100 : 0}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">{totalCorrectAnswers}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">of {totalQuestions}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  You've correctly answered {totalCorrectAnswers} out of {totalQuestions} questions
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Practice Tips</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-600 dark:text-gray-300">
                <li><span className="font-bold">Structure your answers like a professional:</span> Start with a clear introduction that directly addresses the question, organize your main points in a logical sequence, and conclude with a summary of your key insights. This structure helps demonstrate your analytical thinking and communication skills.</li>
                <li><span className="font-bold">Use the feedback system effectively:</span> After submitting your answer, carefully review the AI feedback on technical accuracy, clarity, and depth of insight. Pay special attention to the "Needs improvement" areas and incorporate these suggestions into your next practice session.</li>
                <li><span className="font-bold">Compare your answer with the model answer:</span> After receiving feedback, take time to analyze the model answer in detail. Note the key concepts, terminology, and structure used. This comparison will help you identify gaps in your knowledge and improve your future responses.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 