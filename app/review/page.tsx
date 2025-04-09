'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ReviewPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Modules');
  
  const topics = [
    { id: 'valuation', name: 'Valuation', icon: '📊' },
    { id: 'accounting', name: 'Accounting', icon: '📚' },
    { id: 'financial-modeling', name: 'Financial Modeling', icon: '💹' },
    { id: 'market-analysis', name: 'Market Analysis', icon: '📈' },
    { id: 'behavioral', name: 'Behavioral', icon: '👥' },
    { id: 'case-studies', name: 'Case Studies', icon: '📋' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Coming Soon Message */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Review Section</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              This section is still being developed. Check back soon for comprehensive study materials.
            </p>
          </div>

          {/* Background UI Preview */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
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
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{topic.icon}</span>
                    <h3 className="font-medium text-gray-900 dark:text-white">{topic.name}</h3>
                  </div>
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
  );
} 