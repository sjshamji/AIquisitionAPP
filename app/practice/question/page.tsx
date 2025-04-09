'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '../../../components/Button';
import { Card, CardHeader, CardContent } from '../../../components/Card';
import { Topic, topics } from '@/app/data/topics';
import { getQuestionsByTopic } from '@/app/data/questions';
import { Question, FeedbackResult, UserQuestion } from '@/app/types';
import { updateTopicProgress, getGeneratedQuestions, storeGeneratedQuestions, markQuestionAsCorrect, isQuestionCorrect, getAllTopicsProgress } from '@/app/utils/progress';
import Link from 'next/link';
import { useUserData } from '@/app/providers/UserDataProvider';
import { useAuth } from '@/app/providers/FirebaseAuthProvider';

export default function QuestionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { updateProgress } = useUserData();
  const topicId = searchParams.get('topic');
  const type = searchParams.get('type') || 'open-ended';
  const topic = topics.find((t: Topic) => t.id === topicId);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);

  // Load questions when topic changes
  useEffect(() => {
    if (topicId) {
      // Get base questions from the question bank
      const baseQuestions = getQuestionsByTopic(topicId);
      
      // Get any previously generated questions
      const generatedQuestions = getGeneratedQuestions(topicId);
      
      // Combine base and generated questions
      const allQuestions = [...baseQuestions, ...generatedQuestions];
      
      // Filter out questions that have been marked as correct
      const unansweredQuestions = allQuestions.filter(q => !isQuestionCorrect(q.id, topicId));
      
      // For multiple choice questions, load the options from localStorage
      const questionsWithOptions = unansweredQuestions.map(q => {
        if (q.type === 'multiple-choice') {
          const optionsKey = `question_options_${q.id}`;
          const storedOptions = localStorage.getItem(optionsKey);
          if (storedOptions) {
            try {
              const options = JSON.parse(storedOptions);
              return { ...q, options };
            } catch (error) {
              console.error('Error parsing question options:', error);
            }
          }
        }
        return q;
      });
      
      setQuestions(questionsWithOptions);
      setLoading(false);
    }
  }, [topicId]);

  // Reset state when question changes
  useEffect(() => {
    setShowModelAnswer(false);
    setUserAnswer('');
    setSelectedOption(null);
    setIsCorrect(null);
    setFeedback(null);
    setShowAnswer(false);
  }, [currentQuestionIndex]);

  const handleGenerateMoreQuestions = async () => {
    if (!topicId || !currentQuestion) return;
    
    setIsGeneratingQuestions(true);
    try {
      const response = await fetch('/api/generate-questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          questionText: currentQuestion.text,
          modelAnswer: currentQuestion.modelAnswer,
          topicId,
        }),
        });
        
        if (!response.ok) {
        throw new Error('Failed to generate questions');
        }
        
        const data = await response.json();
      
      // Store the new questions in localStorage
      const existingGeneratedQuestions = getGeneratedQuestions(topicId);
      const updatedGeneratedQuestions = [...existingGeneratedQuestions, ...data.questions];
      storeGeneratedQuestions(topicId, updatedGeneratedQuestions);
      
      // Insert the new questions at the current position instead of at the end
      const newQuestions = [
        ...questions.slice(0, currentQuestionIndex + 1),
        ...data.questions,
        ...questions.slice(currentQuestionIndex + 1)
      ];
      setQuestions(newQuestions);
      
      // Move to the newly generated question (which is right after the current one)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      
      // Reset state for the new question
      setShowModelAnswer(false);
      setUserAnswer('');
      setIsCorrect(null);
      setFeedback(null);
      setShowAnswer(false);
      
      // Update progress to include the new questions
      updateTopicProgress(topicId, false, data.questions.length);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate additional questions. Please try again.');
      } finally {
      setIsGeneratingQuestions(false);
    }
  };

  if (!topic) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
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
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
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
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
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

  const handleSubmit = async () => {
    if (!currentQuestion) return;
    
    setIsSubmitting(true);
    try {
      // For multiple choice questions, we don't need to call the API
      if (currentQuestion.type === 'multiple-choice') {
        // Extract the correct answer from the model answer
        const correctAnswerMatch = currentQuestion.modelAnswer.match(/Correct answer: (.*)/);
        if (correctAnswerMatch && correctAnswerMatch[1]) {
          const correctAnswer = correctAnswerMatch[1].trim();
          const isAnswerCorrect = selectedOption !== null && 
            currentQuestion.options && 
            currentQuestion.options[selectedOption] === correctAnswer;
          
          setShowModelAnswer(true);
          setIsCorrect(isAnswerCorrect || false);
          
          // Update progress based on whether the answer was correct
          updateTopicProgress(topicId!, isAnswerCorrect || false);
          
          // If the answer was correct, mark the question as correct
          if (isAnswerCorrect) {
            markQuestionAsCorrect(topicId!, currentQuestion.id);
          }
        }
        setIsSubmitting(false);
        return;
      }
        
        const response = await fetch('/api/evaluate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          questionText: currentQuestion.text,
          userAnswer,
          modelAnswer: currentQuestion.modelAnswer,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to evaluate answer');
        }
        
        const data = await response.json();
        setFeedback(data.feedback);
      setShowModelAnswer(true);
    } catch (error) {
      console.error('Error evaluating answer:', error);
      // Set default feedback on error
      setFeedback({
        score: 'Needs improvement',
        overallFeedback: 'Your answer is generally correct but could be more detailed. Consider expanding on the key concepts mentioned in the model answer.',
        categories: [
          {
            name: 'Technical accuracy',
            score: 'Needs improvement',
            comment: 'The answer lacks sufficient technical detail or contains inaccuracies. Review the core concepts and be more precise in your explanations.'
          },
          {
            name: 'Clarity and structure',
            score: 'Needs improvement',
            comment: 'Your response is somewhat disorganized. Consider using a more logical flow with clear introduction, body, and conclusion.'
          },
          {
            name: 'Depth of insight',
            score: 'Needs improvement',
            comment: 'You\'ve demonstrated limited analytical thinking. Try to go beyond basic explanations and show deeper understanding of implications.'
          }
        ]
      });
      setShowModelAnswer(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnswerFeedback = (correct: boolean) => {
    setIsCorrect(correct);
    
    // If the answer was correct, mark the question as correct
    if (correct && currentQuestion) {
      markQuestionAsCorrect(topicId!, currentQuestion.id);
    }
    
    // Update progress based on whether the answer was correct
    updateTopicProgress(topicId!, correct);
    
    // Also update progress in Firebase
    if (user) {
      updateProgress(topicId!, correct);
    }
  };

  const handleNext = () => {
    // First update the question index
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Reset all state variables
      setShowModelAnswer(false);
      setUserAnswer('');
      setIsCorrect(null);
      setFeedback(null);
      setShowAnswer(false);
    } else {
      router.push('/practice');
    }
  };

  // Helper function to get score color
  const getScoreColor = (score: string) => {
    switch (score) {
      case 'Strong':
        return 'text-green-600 bg-green-50';
      case 'Good':
        return 'text-blue-600 bg-blue-50';
      case 'Needs improvement':
        return 'text-amber-600 bg-amber-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };
  
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
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
              
              {currentQuestion.type === 'multiple-choice' && currentQuestion.options ? (
                <div className="mt-4 space-y-3">
                  {currentQuestion.options.map((option: string, index: number) => (
                    <div 
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedOption === index 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                      onClick={() => !showModelAnswer && setSelectedOption(index)}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                          selectedOption === index 
                            ? 'border-primary-500 bg-primary-100' 
                            : 'border-gray-300'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4">
                  <textarea
                    rows={5}
                    className="shadow-sm focus:ring-primary-300 focus:border-primary-300 block w-full sm:text-sm border-primary-100 rounded-lg p-3 transition-all duration-200"
                    placeholder="Type your answer here..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={showModelAnswer}
                  />
                </div>
              )}
            </div>

            {showModelAnswer && (
              <>
                <div className="mb-6 p-5 bg-primary-50 rounded-lg border border-primary-100">
                  <h4 className="text-sm font-medium text-primary-800 mb-2">Model Answer:</h4>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{currentQuestion.modelAnswer}</p>
                </div>

                {isLoadingFeedback ? (
                  <div className="mb-6 p-5 bg-gray-50 rounded-lg border border-gray-200 text-center">
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-gray-700">Analyzing your answer...</span>
                    </div>
                  </div>
                ) : feedback ? (
                  <div className="mb-6 p-5 bg-white rounded-lg border border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">AI Feedback</h4>
                    
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${getScoreColor(feedback.score)}`}>
                      {feedback.score}
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Overall Feedback:</h5>
                      <p className="text-sm text-gray-600">{feedback.overallFeedback}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Detailed Assessment:</h5>
                      <div className="space-y-3">
                        {feedback.categories.map((category, index) => (
                          <div key={index} className="border border-gray-100 rounded-md p-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-gray-700">{category.name}</span>
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getScoreColor(category.score)}`}>
                                {category.score}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{category.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            )}

            {showModelAnswer && isCorrect === null && (
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
              {!showModelAnswer ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || (currentQuestion.type === 'multiple-choice' ? selectedOption === null : !userAnswer.trim())}
                  className={`inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors ${
                    isSubmitting || (currentQuestion.type === 'multiple-choice' ? selectedOption === null : !userAnswer.trim()) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Evaluating...' : 'Submit Answer'}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleGenerateMoreQuestions}
                    disabled={isGeneratingQuestions}
                    className={`inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors ${
                      isGeneratingQuestions ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isGeneratingQuestions ? 'Generating...' : 'Practice this topic again'}
                  </button>
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
                  </button>
                </>
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