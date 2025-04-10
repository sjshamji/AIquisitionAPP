'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { topics, Topic } from '@/app/data/topics';
import { 
  getGeneratedQuestions, 
  getCorrectQuestions, 
  isQuestionCorrect,
  getAllTopicsProgress
} from '@/app/utils/progress';
import { Question, UserQuestion } from '@/app/types';
import { getQuestionsByTopic } from '@/app/data/questions';
import { useUserData } from '@/app/providers/UserDataProvider';
import { useAuth } from '@/app/providers/FirebaseAuthProvider';
import { useTheme } from 'next-themes';
import { 
  getUserQuestions, 
  addQuestion, 
  updateQuestion, 
  deleteQuestion 
} from '@/lib/firebase/questions';

export default function QuestionBankPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { 
    userProgress, 
    questions, 
    addQuestion: addUserQuestion, 
    removeQuestion, 
    updateUserQuestion 
  } = useUserData();
  
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [isBaseQuestionsExpanded, setIsBaseQuestionsExpanded] = useState(true);
  const [isGeneratedQuestionsExpanded, setIsGeneratedQuestionsExpanded] = useState(true);
  const [isUserQuestionsExpanded, setIsUserQuestionsExpanded] = useState(true);
  const [newQuestion, setNewQuestion] = useState<Partial<UserQuestion>>({
    text: '',
    modelAnswer: '',
    type: 'text',
    topic: '',
    source: 'manual'
  });
  
  const [topic, setTopic] = useState<Topic | null>(null);
  const [baseQuestions, setBaseQuestions] = useState<Question[]>([]);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [correctQuestions, setCorrectQuestions] = useState<string[]>([]);
  const [userQuestions, setUserQuestions] = useState<UserQuestion[]>([]);
  const [answerVisibility, setAnswerVisibility] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [filteredGeneratedQuestions, setFilteredGeneratedQuestions] = useState<Question[]>([]);
  const [filteredUserQuestions, setFilteredUserQuestions] = useState<Question[]>([]);
  
  const [message, setMessage] = useState<string>('');
  const [showAnswers, setShowAnswers] = useState(false);
  
  const topicId = searchParams.get('topic');
  const type = searchParams.get('type');
  const isMixedPractice = type === 'mixed';

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (!topicId && !isMixedPractice) {
      router.push('/practice');
      return;
    }
    
    // Always load all base questions regardless of topic
    const allBaseQuestions: Question[] = [];
    const seenQuestions = new Set<string>();
    
    // Use the topic IDs from the topics array to ensure exact matches
    const topicOrder = topics.map(t => t.id);
    
    // Get questions from each topic in the specified order
    for (const topicId of topicOrder) {
      const topicQuestions = getQuestionsByTopic(topicId);
      // Filter out duplicate questions by text content
      const uniqueQuestions = topicQuestions.filter(q => {
        if (seenQuestions.has(q.text)) {
          return false;
        }
        seenQuestions.add(q.text);
        return true;
      });
      console.log(`Loaded ${uniqueQuestions.length} unique questions for ${topicId}`);
      allBaseQuestions.push(...uniqueQuestions);
    }
    
    console.log(`Total unique questions loaded: ${allBaseQuestions.length}`);
    
    // Set all base questions
    setBaseQuestions(allBaseQuestions);
    
    // Set the selected topic based on URL parameter
    if (isMixedPractice) {
      setTopic(null);
      setSelectedTopic('mixed');
    } else if (topicId) {
      const decodedTopicId = decodeURIComponent(topicId);
      const foundTopic = topics.find(t => t.id === decodedTopicId);
      if (!foundTopic) {
        router.push('/practice');
        return;
      }
      
      setTopic(foundTopic);
      setSelectedTopic(decodedTopicId);
    }
    
    // Load generated questions for the selected topic
    const generated = topicId ? getGeneratedQuestions(topicId) : [];
    setGeneratedQuestions(generated);
    
    // Load correct questions for the selected topic
    const correct = topicId ? getCorrectQuestions(topicId) : [];
    setCorrectQuestions(correct);
    
    // Load user questions
    const loadUserQuestions = async () => {
      try {
        const userQuestions = await getUserQuestions(user.uid);
        setUserQuestions(userQuestions);
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };
    
    loadUserQuestions();
  }, [user, topicId, isMixedPractice, router]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedTopic === 'all') {
      // Show all questions
      setFilteredQuestions(baseQuestions);
      setFilteredGeneratedQuestions(generatedQuestions);
      setFilteredUserQuestions(userQuestions);
    } else if (selectedTopic === 'mixed') {
      // For mixed practice, show questions from all topics
      setFilteredQuestions(baseQuestions);
      setFilteredGeneratedQuestions(generatedQuestions);
      setFilteredUserQuestions(userQuestions);
    } else {
      // Filter by selected topic
      setFilteredQuestions(baseQuestions.filter(q => q.topic === selectedTopic));
      setFilteredGeneratedQuestions(generatedQuestions.filter(q => q.topic === selectedTopic));
      setFilteredUserQuestions(userQuestions.filter(q => q.topic === selectedTopic));
    }
  }, [baseQuestions, generatedQuestions, userQuestions, selectedTopic]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleGenerateQuestions = async () => {
    if (!selectedTopic) return;
    
    setIsGenerating(true);
    try {
      // Generate 3 new questions for the selected topic
      const newQuestions = await generateQuestions(selectedTopic, 3);
      
      // Add the new questions to the generated questions array
      setGeneratedQuestions(prev => [...prev, ...newQuestions]);
      
      // Show success message
      setMessage('Generated 3 additional questions successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error generating questions:', error);
      setMessage('Failed to generate questions. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddQuestion = async () => {
    if (!user) return;
    
    try {
      setError(null);
      
      // Validate the question
      if (!newQuestion.text || !newQuestion.modelAnswer) {
        setError('Please fill in both question text and model answer');
        return;
      }
      
      // Create a new question with the current topic
      const questionToAdd: UserQuestion = {
        ...newQuestion,
        id: `manual_${Date.now()}`,
        topic: topic?.id || 'mixed',
        source: 'manual',
        type: 'text'
      } as UserQuestion;
      
      // Add the question to Firebase
      await addUserQuestion(questionToAdd);
      
      // Update local state
      setUserQuestions(prev => [...prev, questionToAdd]);
      
      // Update filtered questions if needed
      if (selectedTopic === 'all' || selectedTopic === questionToAdd.topic) {
        setFilteredUserQuestions(prev => [...prev, questionToAdd]);
      }
      
      // Reset form and close modal
      setNewQuestion({
        text: '',
        modelAnswer: '',
        type: 'text',
        topic: '',
        source: 'manual'
      });
      setIsAddingQuestion(false);
    } catch (error) {
      console.error('Error adding question:', error);
      setError('Failed to add question. Please try again.');
    }
  };

  // Function to generate questions for a specific topic
  const generateQuestions = async (topicId: string, count: number): Promise<Question[]> => {
    try {
      // Get base questions for the topic
      const topicQuestions = getQuestionsByTopic(topicId);
      if (topicQuestions.length === 0) {
        throw new Error('No base questions available for generation');
      }
      
      // Select a random base question to use as a template
      const templateQuestion = topicQuestions[Math.floor(Math.random() * topicQuestions.length)];
      
      // Call the API to generate new questions
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionText: templateQuestion.text,
          modelAnswer: templateQuestion.modelAnswer,
          topicId: topicId,
          count: count,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }
      
      const data = await response.json();
      
      // Store the new questions in localStorage
      const existingGeneratedQuestions = getGeneratedQuestions(topicId);
      const updatedGeneratedQuestions = [...existingGeneratedQuestions, ...data.questions];
      localStorage.setItem(`generated_questions_${topicId}`, JSON.stringify(updatedGeneratedQuestions));
      
      return data.questions;
    } catch (error) {
      console.error('Error in generateQuestions:', error);
      throw error;
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/practice"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Question Bank</h1>
          </div>
          
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
        </div>

        {/* Topic Filter */}
        <div className="mb-8">
          <div className="bg-white dark:bg-black p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Filter Questions</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredQuestions.length + filteredGeneratedQuestions.length + filteredUserQuestions.length} questions available
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedTopic('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    selectedTopic === 'all'
                      ? 'bg-gray-800 text-white dark:bg-white dark:text-black'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  All Topics
                </button>
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      selectedTopic === topic.id
                        ? 'bg-gray-800 text-white dark:bg-white dark:text-black'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex gap-4">
          {(topic || isMixedPractice) && (
            <button
              onClick={handleGenerateQuestions}
              disabled={isGenerating || !selectedTopic}
              className={`flex-1 bg-gray-800 text-white py-3 px-4 rounded-lg transition-colors dark:bg-white dark:text-black ${
                isGenerating || !selectedTopic
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-700 dark:hover:bg-gray-100'
              }`}
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate additional questions'
              )}
            </button>
          )}
          <button
            onClick={() => setIsAddingQuestion(true)}
            className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-100"
          >
            Add Question Manually
          </button>
        </div>

        {/* Base Questions Section */}
        <div className="mb-8">
          <button
            onClick={() => setIsBaseQuestionsExpanded(!isBaseQuestionsExpanded)}
            className="w-full flex items-center justify-between p-4 bg-white dark:bg-black rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Base Questions ({filteredQuestions.length})
            </h2>
            <svg
              className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform ${
                isBaseQuestionsExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isBaseQuestionsExpanded && (
            <div className="mt-4 space-y-4">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="bg-white dark:bg-black p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {index + 1}. {question.text}
                          {correctQuestions.includes(question.id) && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Correct
                            </span>
                          )}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs dark:bg-gray-800 dark:text-gray-300">
                            {topics.find(t => t.id === question.topic)?.name || 'Unknown Topic'}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/practice/question?topic=${encodeURIComponent(question.topic)}&question=${encodeURIComponent(question.id)}`}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm"
                        >
                          Practice
                        </Link>
                      </div>
                    </div>
                    {answerVisibility[question.id] && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-900">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Answer:</h4>
                        <p className="text-gray-700 dark:text-gray-300">{question.modelAnswer}</p>
                      </div>
                    )}
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => setAnswerVisibility(prev => ({...prev, [question.id]: !prev[question.id]}))}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors text-sm"
                      >
                        {answerVisibility[question.id] ? 'Hide Answer' : 'Show Answer'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No questions available for the selected filter.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Generated Questions Section */}
        <div className="mb-8">
          <button
            onClick={() => setIsGeneratedQuestionsExpanded(!isGeneratedQuestionsExpanded)}
            className="w-full flex items-center justify-between p-4 bg-white dark:bg-black rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Generated Questions ({filteredGeneratedQuestions.length})
            </h2>
            <svg
              className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform ${
                isGeneratedQuestionsExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isGeneratedQuestionsExpanded && (
            <div className="mt-4 space-y-4">
              {filteredGeneratedQuestions.length > 0 ? (
                filteredGeneratedQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="bg-white dark:bg-black p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {index + 1}. {question.text}
                          {correctQuestions.includes(question.id) && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Correct
                            </span>
                          )}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs dark:bg-gray-800 dark:text-gray-300">
                            {topics.find(t => t.id === question.topic)?.name || 'Unknown Topic'}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/practice/question?topic=${encodeURIComponent(question.topic)}&question=${encodeURIComponent(question.id)}`}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm"
                        >
                          Practice
                        </Link>
                      </div>
                    </div>
                    {answerVisibility[question.id] && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-900">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Answer:</h4>
                        <p className="text-gray-700 dark:text-gray-300">{question.modelAnswer}</p>
                      </div>
                    )}
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => setAnswerVisibility(prev => ({...prev, [question.id]: !prev[question.id]}))}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors text-sm"
                      >
                        {answerVisibility[question.id] ? 'Hide Answer' : 'Show Answer'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No questions available for the selected filter.
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Questions Section */}
        <div className="mb-8">
          <button
            onClick={() => setIsUserQuestionsExpanded(!isUserQuestionsExpanded)}
            className="w-full flex items-center justify-between p-4 bg-white dark:bg-black rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Manually Added Questions ({filteredUserQuestions.length})
            </h2>
            <svg
              className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform ${
                isUserQuestionsExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isUserQuestionsExpanded && (
            <div className="mt-4 space-y-4">
              {filteredUserQuestions.length > 0 ? (
                filteredUserQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="bg-white dark:bg-black p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {index + 1}. {question.text}
                          {correctQuestions.includes(question.id) && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Correct
                            </span>
                          )}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs dark:bg-gray-800 dark:text-gray-300">
                            {topics.find(t => t.id === question.topic)?.name || 'Unknown Topic'}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/practice/question?topic=${encodeURIComponent(question.topic)}&question=${encodeURIComponent(question.id)}`}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm"
                        >
                          Practice
                        </Link>
                      </div>
                    </div>
                    {answerVisibility[question.id] && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-900">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Answer:</h4>
                        <p className="text-gray-700 dark:text-gray-300">{question.modelAnswer}</p>
                      </div>
                    )}
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => setAnswerVisibility(prev => ({...prev, [question.id]: !prev[question.id]}))}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors text-sm"
                      >
                        {answerVisibility[question.id] ? 'Hide Answer' : 'Show Answer'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No questions available for the selected filter.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add Question Modal */}
        {isAddingQuestion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-black rounded-xl p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Add New Question</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Question Text
                  </label>
                  <textarea
                    value={newQuestion.text}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, text: e.target.value }))}
                    className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Model Answer
                  </label>
                  <textarea
                    value={newQuestion.modelAnswer}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, modelAnswer: e.target.value }))}
                    className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsAddingQuestion(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddQuestion}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-100"
                  >
                    Add Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg dark:bg-green-900 dark:text-green-100">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}