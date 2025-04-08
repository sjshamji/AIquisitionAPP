'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { topics } from '../data/topics';
import { TopicProgress, getAllTopicsProgress } from '../utils/progress';

export default function PracticePage() {
  const [topicsProgress, setTopicsProgress] = useState<TopicProgress[]>([]);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    // Load progress data from localStorage
    const progress = getAllTopicsProgress(topics);
    setTopicsProgress(progress);
    
    // Calculate total correct answers and total questions
    const correct = progress.reduce((sum, topic) => sum + topic.correctAnswers, 0);
    const total = progress.reduce((sum, topic) => sum + topic.totalQuestions, 0);
    
    setTotalCorrectAnswers(correct);
    setTotalQuestions(total);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Interview Practice</h1>
          <Link 
            href="/"
            className="text-primary-600 hover:text-primary-700 px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.map((topic) => {
                const progress = topicsProgress.find(p => p.topicId === topic.id) || {
                  totalQuestions: 0,
                  answeredQuestions: 0,
                  correctAnswers: 0
                };
                
                const progressPercentage = progress.totalQuestions > 0 
                  ? Math.round((progress.answeredQuestions / progress.totalQuestions) * 100) 
                  : 0;
                
                return (
                  <Link 
                    key={topic.id}
                    href={`/practice/question?topic=${topic.id}`}
                    className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-primary-100"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{topic.name}</h3>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{progress.answeredQuestions} of {progress.totalQuestions} questions</span>
                      </div>
                      <div className="w-full bg-primary-100 rounded-full h-2.5">
                        <div 
                          className="bg-primary-600 h-2.5 rounded-full" 
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-green-600">{progress.correctAnswers} correct</span>
                        <span className="text-gray-500">{progressPercentage}% complete</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-primary-50 p-6 rounded-lg sticky top-4 mb-6 border border-primary-100">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Overall Progress</h2>
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
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#8a63d2"
                      strokeWidth="3"
                      strokeDasharray={`${totalQuestions > 0 ? (totalCorrectAnswers / totalQuestions) * 100 : 0}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">{totalCorrectAnswers}</div>
                      <div className="text-xs text-gray-500">of {totalQuestions}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  You've correctly answered {totalCorrectAnswers} out of {totalQuestions} questions
                </p>
                <p className="text-sm font-medium text-primary-600 mt-1">
                  {totalQuestions > 0 ? Math.round((totalCorrectAnswers / totalQuestions) * 100) : 0}% accuracy
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-primary-100">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Practice Tips</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Choose a topic that you want to practice</li>
                <li>You'll be presented with open-ended questions</li>
                <li>Take your time to think through your answers</li>
                <li>Review the model answers to learn from them</li>
                <li>Practice regularly to improve your responses</li>
                <li>Track your progress across different topics</li>
                <li>Focus on areas where you need more practice</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 