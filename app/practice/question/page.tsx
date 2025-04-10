'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '../../../components/Button';
import { Card, CardHeader, CardContent } from '../../../components/Card';
import { Topic, topics } from '@/app/data/topics';
import { getQuestionsByTopic } from '@/app/data/questions';
import { Question, FeedbackResult, UserQuestion } from '@/app/types';
import { updateTopicProgress, getGeneratedQuestions, storeGeneratedQuestions, markQuestionAsCorrect, isQuestionCorrect, getAllTopicsProgress, getCorrectQuestions } from '@/app/utils/progress';
import Link from 'next/link';
import { useUserData } from '@/app/providers/UserDataProvider';
import { useAuth } from '@/app/providers/FirebaseAuthProvider';
import { useTheme } from 'next-themes';

export default function QuestionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { updateProgress } = useUserData();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const topicId = searchParams.get('topic');
  const type = searchParams.get('type') || 'open-ended';
  const questionId = searchParams.get('questionId');
  const topic = topicId ? topics.find((t: Topic) => t.id === topicId) : null;
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
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSingleQuestionMode, setIsSingleQuestionMode] = useState(false);
  
  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Load questions when topic changes
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const topicParam = searchParams.get('topic');
        const typeParam = searchParams.get('type');
        const questionIdParam = searchParams.get('questionId');
        
        console.log('Loading questions with params:', { topicParam, typeParam, questionIdParam });
        
        // Check if we're in single question mode
        if (questionIdParam) {
          setIsSingleQuestionMode(true);
          // Find the specific question
          if (!topicParam) {
            console.error('No topic specified for single question mode');
            setError("No topic specified");
            setQuestions([]);
            setCurrentQuestion(null);
            setLoading(false);
            return;
          }
          const allQuestions = getQuestionsByTopic(decodeURIComponent(topicParam));
          const specificQuestion = allQuestions.find(q => q.id === questionIdParam);
          
          if (specificQuestion) {
            setQuestions([specificQuestion]);
            setCurrentQuestionIndex(0);
            setCurrentQuestion(specificQuestion);
          } else {
            setError("Question not found");
            setQuestions([]);
            setCurrentQuestion(null);
          }
          setLoading(false);
          return;
        }
        
        // Check if we're in mixed practice mode (Learning Journey)
        const isMixedPractice = typeParam === 'mixed';
        
        if (isMixedPractice) {
          console.log('Loading mixed practice questions');
          // For Learning Journey, get questions from all topics in the specified order
          let allQuestions: Question[] = [];
          
          // Get all questions from the question bank
          const allTopics = topics.map(t => t.id);
          
          // Get questions from each topic
          for (const topicId of allTopics) {
            console.log(`Getting questions for topic: ${topicId}`);
            // Use the getQuestionsByTopic function with the exact topic ID
            const topicQuestions = getQuestionsByTopic(topicId);
            console.log(`Found ${topicQuestions.length} questions for ${topicId}`);
            allQuestions = [...allQuestions, ...topicQuestions];
          }
          
          console.log(`Total questions found: ${allQuestions.length}`);
          
          // Count questions by topic for debugging
          const questionsByTopic = allQuestions.reduce((acc, q) => {
            acc[q.topic] = (acc[q.topic] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
          console.log('Questions by topic:', questionsByTopic);
          
          if (allQuestions.length === 0) {
            setError("No questions available for mixed practice");
            setQuestions([]);
            setCurrentQuestion(null);
            setLoading(false);
            return;
          }
          
          // Filter out questions that have been answered correctly
          try {
            // Get all correctly answered questions from localStorage
            const allCorrectQuestions = new Set<string>();
            
            // Check each topic for correctly answered questions
            for (const topicId of allTopics) {
              const correctQuestionsForTopic = getCorrectQuestions(topicId);
              correctQuestionsForTopic.forEach((id: string) => allCorrectQuestions.add(id));
            }
            
            // Filter out questions that have been answered correctly
            const availableQuestions = allQuestions.filter(q => !allCorrectQuestions.has(q.id));
            console.log(`Available questions after filtering: ${availableQuestions.length}`);
            
            if (availableQuestions.length === 0) {
              setError("You've answered all available questions correctly!");
              setQuestions([]);
              setCurrentQuestion(null);
            } else {
              setQuestions(availableQuestions);
              setCurrentQuestionIndex(0);
              setCurrentQuestion(availableQuestions[0]);
            }
          } catch (error) {
            console.error('Error filtering questions:', error);
            // If we can't filter questions, just use all questions
            setQuestions(allQuestions);
            setCurrentQuestionIndex(0);
            setCurrentQuestion(allQuestions[0]);
          }
        } else if (topicParam) {
          console.log(`Loading questions for topic: ${topicParam}`);
          // For topic-specific practice, find the topic in the topics array
          const decodedTopicParam = decodeURIComponent(topicParam);
          const topic = topics.find((t: Topic) => t.id === decodedTopicParam);
          if (!topic) {
            console.error(`Topic not found: ${decodedTopicParam}`);
            setError(`Topic not found: ${decodedTopicParam}`);
            setQuestions([]);
            setCurrentQuestion(null);
            return;
          }
          
          console.log(`Found topic: ${topic.name}`);
          // Use the topic's ID as the category name for getQuestionsByTopic since they now match
          const topicQuestions = getQuestionsByTopic(decodedTopicParam);
          console.log(`Found ${topicQuestions.length} questions for topic: ${topic.id}`);
          
          if (topicQuestions.length === 0) {
            setError(`No questions found for topic: ${topic.name}`);
            setQuestions([]);
            setCurrentQuestion(null);
          } else {
            setQuestions(topicQuestions);
            setCurrentQuestionIndex(0);
            setCurrentQuestion(topicQuestions[0]);
          }
        } else {
          console.error('No topic specified');
          setError("No topic specified");
          setQuestions([]);
          setCurrentQuestion(null);
        }
      } catch (error) {
        console.error('Error loading questions:', error);
        setError("An error occurred while loading questions");
        setQuestions([]);
        setCurrentQuestion(null);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadQuestions();
    }
  }, [user, searchParams]);

  // Update currentQuestion when currentQuestionIndex changes
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      setCurrentQuestion(questions[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, questions]);

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
    if (!currentQuestion) return;
    
    // Get the topic from the current question
    const questionTopic = currentQuestion.topic;
    
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
          topicId: questionTopic,
        }),
        });
        
        if (!response.ok) {
        throw new Error('Failed to generate questions');
        }
        
        const data = await response.json();
      
      // Store the new questions in localStorage
      const existingGeneratedQuestions = getGeneratedQuestions(questionTopic);
      const updatedGeneratedQuestions = [...existingGeneratedQuestions, ...data.questions];
      storeGeneratedQuestions(questionTopic, updatedGeneratedQuestions);
      
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
      updateTopicProgress(questionTopic, false, data.questions.length);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate additional questions. Please try again.');
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  // For mixed practice, we don't need to check for a specific topic
  const isMixedPractice = searchParams.get('type') === 'mixed';
  
  if (error || (!isMixedPractice && !topic)) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-black p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
              <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Topic not found</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {error || "The requested topic could not be found."}
              </p>
              <button 
                onClick={() => router.push('/practice/question-bank')} 
                className="text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Exit
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-black p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
              <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">No Questions Available</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                There are no questions available for this topic. You may have answered all questions correctly.
              </p>
              <button 
                onClick={() => router.push('/practice/question-bank')} 
                className="text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Exit
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Ensure currentQuestion is not null before rendering
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-black p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
              <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Error Loading Question</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                There was an error loading the question. Please try again.
              </p>
              <button 
                onClick={() => router.push('/practice/question-bank')} 
                className="text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Exit
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
      
      // Set isCorrect based on AI feedback score
      const isAnswerCorrect = data.feedback.score === 'Strong' || data.feedback.score === 'Good';
      setIsCorrect(isAnswerCorrect);
      
      // Update progress based on AI evaluation
      updateTopicProgress(topicId!, isAnswerCorrect);
      
      // If the answer was correct, mark the question as correct
      if (isAnswerCorrect) {
        markQuestionAsCorrect(topicId!, currentQuestion.id);
      }
      
      // Also update progress in Firebase
      if (user) {
        updateProgress(topicId!, isAnswerCorrect);
      }
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
      setIsCorrect(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkAsCorrect = () => {
    setIsCorrect(true);
    updateTopicProgress(topicId!, true);
    markQuestionAsCorrect(topicId!, currentQuestion!.id);
    if (user) {
      updateProgress(topicId!, true);
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

  const handleExit = () => {
    router.push('/practice');
  };

  // Helper function to get score color
  const getScoreColor = (score: string) => {
    switch (score) {
      case 'Strong':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
      case 'Good':
        return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30';
      case 'Needs improvement':
        return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-black py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-black rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <button 
                onClick={() => router.push('/practice/question-bank')} 
                className="text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Exit
              </button>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">Topic:</span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-white">
                    {isMixedPractice ? "Mixed Practice" : topic?.name || "Unknown Topic"}
                  </span>
                  {!isSingleQuestionMode && (
                    <>
                      <span className="mx-2 text-gray-300 dark:text-gray-700">|</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Question {currentQuestionIndex + 1} of {questions.length}
                      </span>
                    </>
                  )}
                </div>
                {mounted && (
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-black text-gray-800 dark:text-white transition-colors"
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
            </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{currentQuestion.text}</h3>
              
              {currentQuestion.type === 'multiple-choice' && currentQuestion.options ? (
                <div className="mt-4 space-y-3">
                  {currentQuestion.options.map((option: string, index: number) => (
                    <div 
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedOption === index 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500'
                      }`}
                      onClick={() => !showModelAnswer && setSelectedOption(index)}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                          selectedOption === index 
                            ? 'border-purple-500 bg-purple-100 dark:bg-purple-800' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-gray-800 dark:text-gray-200">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4">
                  <textarea
                    rows={5}
                    className="shadow-sm focus:ring-purple-300 focus:border-purple-300 block w-full sm:text-sm border-gray-200 dark:border-gray-700 rounded-lg p-3 transition-all duration-200 bg-white dark:bg-black text-gray-900 dark:text-white"
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
                <div className="mb-6 p-5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-2">Model Answer:</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{currentQuestion.modelAnswer}</p>
                </div>

                {isLoadingFeedback ? (
                  <div className="mb-6 p-5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 text-center">
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Analyzing your answer...</span>
                    </div>
                  </div>
                ) : feedback ? (
                  <div className="mb-6 p-5 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">AI Feedback</h4>
                    
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${getScoreColor(feedback.score)}`}>
                      {feedback.score}
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Overall Feedback:</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{feedback.overallFeedback}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Detailed Assessment:</h5>
                      <div className="space-y-3">
                        {feedback.categories.map((category, index) => (
                          <div key={index} className="border border-gray-100 dark:border-gray-800 rounded-md p-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getScoreColor(category.score)}`}>
                                {category.score}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{category.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            )}

            {showModelAnswer && feedback && !isCorrect && (
              <div className="mb-4 flex justify-end">
                <button
                  onClick={handleMarkAsCorrect}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  Mark as correct anyway
                </button>
              </div>
            )}

            {isCorrect !== null && (
              <div className="mb-6 p-4 rounded-lg text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                  isCorrect ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
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
                  className={`inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-100 ${
                    isSubmitting || (currentQuestion.type === 'multiple-choice' ? selectedOption === null : !userAnswer.trim()) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Evaluating...' : 'Submit Answer'}
                </button>
              ) : (
                <>
                  {!isSingleQuestionMode && (
                    <button
                      onClick={handleGenerateMoreQuestions}
                      disabled={isGeneratingQuestions}
                      className={`inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-100 ${
                        isGeneratingQuestions ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isGeneratingQuestions ? 'Generating...' : 'Practice this topic again'}
                    </button>
                  )}
                  <button
                    onClick={isSingleQuestionMode ? handleExit : handleNext}
                    className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-100"
                  >
                    {isSingleQuestionMode ? 'Exit' : (currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish')}
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