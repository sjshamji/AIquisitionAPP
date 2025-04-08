'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '../../../components/Button';
import { Card, CardHeader, CardContent } from '../../../components/Card';
import { Topic, topics } from '@/app/data/topics';
import { getQuestionsByTopic } from '@/app/data/questions';
import { Question as OpenAIQuestion } from '@/lib/api/openai';
import { updateTopicProgress } from '@/app/utils/progress';
import Link from 'next/link';

export default function QuestionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topicId = searchParams.get('topic');
  const type = searchParams.get('type') || 'open-ended';
  const topic = topics.find((t: Topic) => t.id === topicId);
  const [questions, setQuestions] = useState<OpenAIQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (topicId) {
      const topicQuestions = getQuestionsByTopic(topicId);
      setQuestions(topicQuestions);
      setLoading(false);
    }
  }, [topicId]);

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Topic not found</h2>
            <p className="mt-2 text-gray-600">The requested topic could not be found.</p>
            <Link href="/practice" className="mt-4 inline-block text-gray-900 hover:text-gray-700">
              Back to Practice
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Loading questions...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">No questions available</h2>
            <p className="mt-2 text-gray-600">There are no questions available for this topic.</p>
            <Link href="/practice" className="mt-4 inline-block text-gray-900 hover:text-gray-700">
              Back to Practice
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = () => {
    if (userAnswer.trim()) {
      setShowAnswer(true);
    }
  };

  const handleAnswerFeedback = (correct: boolean) => {
    setIsCorrect(correct);
    // Update progress based on whether the answer was correct
    updateTopicProgress(topicId!, correct);
  };

  const handleNext = () => {
    setShowAnswer(false);
    setUserAnswer('');
    setIsCorrect(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push('/practice');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-primary-100">
            <div className="flex justify-between items-center">
              <Link href="/practice" className="text-primary-600 hover:text-primary-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Practice
              </Link>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 mr-2">Topic:</span>
                <span className="text-sm font-semibold text-primary-600">{topic.name}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{currentQuestion.text}</h3>
              
              <div className="mt-4">
                <textarea
                  rows={5}
                  className="shadow-sm focus:ring-primary-300 focus:border-primary-300 block w-full sm:text-sm border-primary-100 rounded-lg p-3 transition-all duration-200"
                  placeholder="Type your answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={showAnswer}
                />
              </div>
            </div>

            {showAnswer && (
              <div className="mb-6 p-5 bg-primary-50 rounded-lg border border-primary-100">
                <h4 className="text-sm font-medium text-primary-800 mb-2">Model Answer:</h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{currentQuestion.modelAnswer}</p>
              </div>
            )}

            {showAnswer && isCorrect === null && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Was your answer correct?</h4>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAnswerFeedback(true)}
                    className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    Yes, I got it right
                  </button>
                  <button
                    onClick={() => handleAnswerFeedback(false)}
                    className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    No, I need to improve
                  </button>
                </div>
              </div>
            )}

            {isCorrect !== null && (
              <div className="mb-6 p-4 rounded-lg text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                  isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    {isCorrect ? (
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    ) : (
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    )}
                  </svg>
                  {isCorrect ? 'Great job!' : 'Keep practicing!'}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              {!showAnswer ? (
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim()}
                  className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to format topic name
function formatTopicName(topic: string): string {
  // Handle 'ma' -> 'M&A' special case
  if (topic.toLowerCase() === 'ma') {
    return 'M&A';
  }
  
  // Handle 'lbo' -> 'LBO' special case
  if (topic.toLowerCase() === 'lbo') {
    return 'LBO';
  }
  
  // Handle 'dcf' -> 'DCF' special case
  if (topic.toLowerCase() === 'dcf') {
    return 'DCF';
  }
  
  // Otherwise, capitalize first letter of each word
  return topic
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
} 