'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { topics, Topic } from '../../data/topics';
import { 
  getGeneratedQuestions, 
  getCorrectQuestions, 
  isQuestionCorrect,
  getAllTopicsProgress
} from '../../utils/progress';
import { Question, UserQuestion } from '@/app/types';
import { getQuestionsByTopic } from '@/app/data/questions';
import { useUserData } from '@/app/providers/UserDataProvider';
import { useAuth } from '@/app/providers/FirebaseAuthProvider';
import { useUserData as useFirebaseUserData } from '@/app/providers/UserDataProvider';
import { 
  getUserQuestions, 
  addQuestion, 
  updateQuestion, 
  deleteQuestion 
} from '@/lib/firebase';

export default function QuestionBankPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { 
    userProgress, 
    questions, 
    addQuestion: addUserQuestion, 
    removeQuestion, 
    updateUserQuestion 
  } = useUserData();
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [newQuestion, setNewQuestion] = useState<Partial<UserQuestion>>({
    text: '',
    modelAnswer: '',
    type: 'text',
    topic: '',
    source: 'manual'
  });
  const [editMode, setEditMode] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [answerVisibility, setAnswerVisibility] = useState<Record<string, boolean>>({});
  
  const [topic, setTopic] = useState<Topic | null>(null);
  const [baseQuestions, setBaseQuestions] = useState<Question[]>([]);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [correctQuestions, setCorrectQuestions] = useState<string[]>([]);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userQuestions, setUserQuestions] = useState<UserQuestion[]>([]);
  const [questionOptions, setQuestionOptions] = useState<Record<string, string[]>>({});
  const [showAnswer, setShowAnswer] = useState<string | null>(null);
  
  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const loadQuestions = async () => {
      try {
        // Set selected topic from URL
        const topicId = searchParams.get('topic');
        if (topicId) {
          const foundTopic = topics.find(t => t.id === topicId);
          if (foundTopic) {
            setSelectedTopic(topicId);
            setTopic(foundTopic);
            setNewQuestion(prev => ({ ...prev, topic: topicId }));
            
            // Load base questions for this topic
            const baseQuestionsForTopic = getQuestionsByTopic(topicId);
            setBaseQuestions(baseQuestionsForTopic);
            
            // Load generated questions for this topic
            const generatedForTopic = getGeneratedQuestions(topicId);
            setGeneratedQuestions(generatedForTopic);
            
            // Load correct questions for this topic
            const correctForTopic = getCorrectQuestions(topicId);
            setCorrectQuestions(correctForTopic);
          }
        }

        // Load user questions from Firebase
        const userQuestions = await getUserQuestions(user.uid);
        setUserQuestions(userQuestions);

        // Load options for multiple choice questions from localStorage
        const storedOptions = localStorage.getItem('questionOptions');
        if (storedOptions) {
          const options = JSON.parse(storedOptions);
          setQuestionOptions(options);
        }
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };

    loadQuestions();
  }, [user, router, searchParams]);
  
  const handleAddQuestion = () => {
    if (newQuestion.text && newQuestion.modelAnswer) {
      addUserQuestion({
        ...newQuestion,
        topic: selectedTopic,
        source: 'manual'
      } as Omit<UserQuestion, 'id' | 'createdAt' | 'userId'>);
      
      setNewQuestion({
        text: '',
        modelAnswer: '',
        type: 'text',
        topic: selectedTopic,
        source: 'manual'
      });
    }
  };
  
  const handleDeleteQuestion = (questionId: string) => {
    if (!topic) return;
    
    // Check if it's a manual question
    const manualQuestionsKey = `manual_questions_${topic.id}`;
    const storedManualQuestions = localStorage.getItem(manualQuestionsKey);
    let manualQuestions: Question[] = [];
    
    if (storedManualQuestions) {
      try {
        manualQuestions = JSON.parse(storedManualQuestions);
      } catch (error) {
        console.error('Error parsing manual questions:', error);
      }
    }
    
    // Check if the question is in the manual questions
    const isManualQuestion = manualQuestions.some(q => q.id === questionId);
    
    if (isManualQuestion) {
      // Remove from manual questions
      const updatedManualQuestions = manualQuestions.filter(q => q.id !== questionId);
      localStorage.setItem(manualQuestionsKey, JSON.stringify(updatedManualQuestions));
    } else {
      // Remove from generated questions
      const updatedGeneratedQuestions = generatedQuestions.filter(q => q.id !== questionId);
      localStorage.setItem(`generated_questions_${topic.id}`, JSON.stringify(updatedGeneratedQuestions));
    }
    
    // Update the state
    setGeneratedQuestions(prev => prev.filter(q => q.id !== questionId));
  };
  
  const handleEditQuestion = (question: UserQuestion) => {
    setEditMode(true);
    setEditingQuestionId(question.id);
    setNewQuestion({
      text: question.text,
      modelAnswer: question.modelAnswer,
      type: question.type,
      topic: question.topic,
      options: question.options || [],
      source: question.source
    });
  };
  
  const handleUpdateQuestion = () => {
    if (editingQuestionId && newQuestion.text && newQuestion.modelAnswer) {
      updateUserQuestion(editingQuestionId, {
        ...newQuestion,
        topic: selectedTopic,
        source: 'manual'
      });
      setEditMode(false);
      setEditingQuestionId(null);
      setNewQuestion({
        text: '',
        modelAnswer: '',
        type: 'text',
        topic: selectedTopic,
        options: [],
        source: 'manual'
      });
    }
  };
  
  // Filter questions based on selected topic
  const filteredQuestions = questions.filter(q => q.topic === selectedTopic);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {topic ? `${topic.name} Question Bank` : 'Question Bank'}
          </h1>
          <Link 
            href="/practice"
            className="text-primary-600 hover:text-primary-700 px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Topics
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {topic ? `${topic.name} Question Bank` : 'Question Bank'} 
              ({baseQuestions.length + generatedQuestions.length + filteredQuestions.length} questions)
            </h2>
            <button
              onClick={() => {
                setIsAddingQuestion(!isAddingQuestion);
                if (isAddingQuestion) {
                  setIsEditingQuestion(false);
                  setEditingQuestionId(null);
                }
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {isAddingQuestion ? 'Cancel' : 'Add Question'}
            </button>
          </div>
          
          {isAddingQuestion && (
            <div className="mb-8 p-4 border border-primary-200 rounded-lg bg-primary-50">
              <h3 className="text-lg font-medium mb-4">
                {isEditingQuestion ? 'Edit Question' : 'Add New Question'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="questionText" className="block text-sm font-medium text-gray-700 mb-1">
                    Question Text
                  </label>
                  <textarea
                    id="questionText"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={newQuestion.text}
                    onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
                    placeholder="Enter your question here..."
                  />
                </div>
                <div>
                  <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-700 mb-1">
                    Correct Answer
                  </label>
                  <textarea
                    id="correctAnswer"
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={newQuestion.modelAnswer}
                    onChange={(e) => setNewQuestion({...newQuestion, modelAnswer: e.target.value})}
                    placeholder="Enter the correct answer here..."
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={isEditingQuestion ? handleUpdateQuestion : handleAddQuestion}
                    disabled={!newQuestion.text || !newQuestion.modelAnswer}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isEditingQuestion ? 'Update Question' : 'Save Question'}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            {/* Display base questions */}
            {baseQuestions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Base Questions</h3>
                {baseQuestions.map((question, index) => {
                  const isCorrect = isQuestionCorrect(question.id, selectedTopic);
                  return (
                    <div key={question.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="font-medium text-gray-900">{index + 1}:</span>
                            {isCorrect && (
                              <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                Correct
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 mb-2">{question.text}</p>
                          <div className="mt-2">
                            <button
                              onClick={() => setAnswerVisibility(prev => ({...prev, [question.id]: !prev[question.id]}))}
                              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                            >
                              {answerVisibility[question.id] ? 'Hide Answer' : 'Show Answer'}
                            </button>
                            {answerVisibility[question.id] && (
                              <div className="mt-2 p-3 bg-gray-50 rounded-md text-gray-700">
                                <p className="font-medium mb-2">Correct Answer:</p>
                                <p>{question.modelAnswer}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Base
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Display generated questions */}
            {generatedQuestions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Generated Questions</h3>
                {generatedQuestions.map((question, index) => {
                  const isCorrect = isQuestionCorrect(question.id, selectedTopic);
                  return (
                    <div key={question.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="font-medium text-gray-900">{baseQuestions.length + index + 1}:</span>
                            {isCorrect && (
                              <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                Correct
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 mb-2">{question.text}</p>
                          <div className="mt-2">
                            <button
                              onClick={() => setAnswerVisibility(prev => ({...prev, [question.id]: !prev[question.id]}))}
                              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                            >
                              {answerVisibility[question.id] ? 'Hide Answer' : 'Show Answer'}
                            </button>
                            {answerVisibility[question.id] && (
                              <div className="mt-2 p-3 bg-gray-50 rounded-md text-gray-700">
                                <p className="font-medium mb-2">Correct Answer:</p>
                                <p>{question.modelAnswer}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Generated
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Display user questions */}
            {filteredQuestions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Your Questions</h3>
                {filteredQuestions.map((userQuestion) => (
                  <div key={userQuestion.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="text-gray-700 mb-2">{userQuestion.text}</p>
                        <div className="mt-2">
                          <button
                            onClick={() => setShowAnswer(userQuestion.id)}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            {showAnswer === userQuestion.id ? 'Hide Answer' : 'Show Answer'}
                          </button>
                          {showAnswer === userQuestion.id && (
                            <div className="mt-2 p-3 bg-gray-50 rounded-md text-gray-700">
                              <p className="font-medium mb-2">Correct Answer:</p>
                              <p>{userQuestion.modelAnswer}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {(userQuestion.source === 'manual' || userQuestion.source === 'generated') && (
                          <div className="flex space-x-2 ml-4">
                            {userQuestion.source === 'manual' && (
                              <button
                                onClick={() => handleEditQuestion(userQuestion)}
                                className="text-primary-600 hover:text-primary-700"
                              >
                                Edit
                              </button>
                            )}
                            <button
                              onClick={() => removeQuestion(userQuestion.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      {userQuestion.source === 'generated' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Generated
                        </span>
                      )}
                      {userQuestion.source === 'manual' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Manual
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {baseQuestions.length === 0 && generatedQuestions.length === 0 && filteredQuestions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No questions available for this topic yet.</p>
                <p className="text-gray-500 mt-2">Add your own questions to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 