'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { topics, Topic } from '@/lib/data/topics';
import { 
  getGeneratedQuestions, 
  getCorrectQuestions, 
  isQuestionCorrect,
  getAllTopicsProgress
} from '@/utils/progress';
import { Question } from '@/types';
import { getQuestionsByTopic } from '@/lib/data/questions';

export default function QuestionBankPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topicId = searchParams.get('topic');
  
  const [topic, setTopic] = useState<Topic | null>(null);
  const [baseQuestions, setBaseQuestions] = useState<Question[]>([]);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [correctQuestions, setCorrectQuestions] = useState<string[]>([]);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState<{
    text: string;
    modelAnswer: string;
    type: 'open-ended' | 'multiple-choice';
    options: string[];
    correctOptionIndex: number;
  }>({
    text: '',
    modelAnswer: '',
    type: 'open-ended',
    options: ['', '', '', ''],
    correctOptionIndex: 0
  });
  const [visibleAnswers, setVisibleAnswers] = useState<Record<string, boolean>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!topicId) {
      router.push('/practice');
      return;
    }
    
    // Find the topic
    const foundTopic = topics.find(t => t.id === topicId);
    if (!foundTopic) {
      router.push('/practice');
      return;
    }
    
    setTopic(foundTopic);
    
    // Load base questions for this topic
    const baseQuestions = getQuestionsByTopic(topicId);
    setBaseQuestions(baseQuestions);
    
    // Load generated questions
    const generated = getGeneratedQuestions(topicId);
    
    // For multiple choice questions, load the options from localStorage
    const generatedWithOptions = generated.map(q => {
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
    
    setGeneratedQuestions(generatedWithOptions);
    
    // Load correct questions
    const correct = getCorrectQuestions(topicId);
    setCorrectQuestions(correct);
  }, [topicId, router]);
  
  const handleAddQuestion = () => {
    if (!topic) return;
    
    // Validate the question
    if (!newQuestion.text) return;
    
    // For multiple choice questions, validate that we have all options and a correct answer
    if (newQuestion.type === 'multiple-choice') {
      if (newQuestion.options.some(option => !option.trim())) {
        setError('All multiple choice options must be filled');
        return;
      }
    } else if (!newQuestion.modelAnswer) {
      setError('Model answer is required for open-ended questions');
      return;
    }
    
    // Create a new question
    const question: Question = {
      id: `manual_${Date.now()}`,
      text: newQuestion.text,
      modelAnswer: newQuestion.type === 'multiple-choice' 
        ? `Correct answer: ${newQuestion.options[newQuestion.correctOptionIndex]}`
        : newQuestion.modelAnswer,
      type: newQuestion.type,
      topic: topic.id,
      source: 'manual'
    };
    
    // For multiple choice questions, store the options in localStorage
    if (newQuestion.type === 'multiple-choice') {
      const optionsKey = `question_options_${question.id}`;
      localStorage.setItem(optionsKey, JSON.stringify(newQuestion.options));
    }
    
    // Add to generated questions
    const updatedGeneratedQuestions = [...generatedQuestions, question];
    setGeneratedQuestions(updatedGeneratedQuestions);
    
    // Save to localStorage
    localStorage.setItem(`generated_questions_${topic.id}`, JSON.stringify(updatedGeneratedQuestions));
    
    // Reset form
    setNewQuestion({
      text: '',
      modelAnswer: '',
      type: 'open-ended',
      options: ['', '', '', ''],
      correctOptionIndex: 0
    });
    setIsAddingQuestion(false);
    setError(null);
  };
  
  const handleDeleteQuestion = (questionId: string) => {
    if (!topic) return;
    
    // Filter out the question
    const updatedGeneratedQuestions = generatedQuestions.filter(q => q.id !== questionId);
    setGeneratedQuestions(updatedGeneratedQuestions);
    
    // Save to localStorage
    localStorage.setItem(`generated_questions_${topic.id}`, JSON.stringify(updatedGeneratedQuestions));
  };
  
  const toggleAnswerVisibility = (questionId: string) => {
    setVisibleAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  
  const allQuestions = [...baseQuestions, ...generatedQuestions];
  
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
            <h2 className="text-xl font-semibold text-gray-900">All Questions ({allQuestions.length})</h2>
            <button
              onClick={() => setIsAddingQuestion(!isAddingQuestion)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {isAddingQuestion ? 'Cancel' : 'Add Question'}
            </button>
          </div>
          
          {isAddingQuestion && (
            <div className="mb-8 p-4 border border-primary-200 rounded-lg bg-primary-50">
              <h3 className="text-lg font-medium mb-4">Add New Question</h3>
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
                  <label htmlFor="questionType" className="block text-sm font-medium text-gray-700 mb-1">
                    Question Type
                  </label>
                  <select
                    id="questionType"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={newQuestion.type}
                    onChange={(e) => {
                      const type = e.target.value as 'open-ended' | 'multiple-choice';
                      setNewQuestion({
                        ...newQuestion, 
                        type,
                        // Reset options when switching to open-ended
                        options: type === 'open-ended' ? ['', '', '', ''] : newQuestion.options,
                        // Reset correct option index when switching to open-ended
                        correctOptionIndex: type === 'open-ended' ? 0 : newQuestion.correctOptionIndex
                      });
                    }}
                  >
                    <option value="open-ended">Open-ended</option>
                    <option value="multiple-choice">Multiple Choice</option>
                  </select>
                </div>
                
                {newQuestion.type === 'multiple-choice' ? (
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700">Answer Options</h4>
                    {newQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`option-${index}`}
                          name="correctOption"
                          checked={newQuestion.correctOptionIndex === index}
                          onChange={() => setNewQuestion({
                            ...newQuestion,
                            correctOptionIndex: index
                          })}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const updatedOptions = [...newQuestion.options];
                            updatedOptions[index] = e.target.value;
                            setNewQuestion({
                              ...newQuestion,
                              options: updatedOptions
                            });
                          }}
                          placeholder={`Option ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <label htmlFor="modelAnswer" className="block text-sm font-medium text-gray-700 mb-1">
                      Model Answer
                    </label>
                    <textarea
                      id="modelAnswer"
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      value={newQuestion.modelAnswer}
                      onChange={(e) => setNewQuestion({...newQuestion, modelAnswer: e.target.value})}
                      placeholder="Enter the model answer here..."
                    />
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button
                    onClick={handleAddQuestion}
                    disabled={!newQuestion.text || (newQuestion.type === 'open-ended' && !newQuestion.modelAnswer) || 
                             (newQuestion.type === 'multiple-choice' && newQuestion.options.some(option => !option.trim()))}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save Question
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
            {allQuestions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No questions available for this topic.</p>
            ) : (
              allQuestions.map((question, index) => {
                const isCorrect = isQuestionCorrect(question.id, topicId);
                const isGenerated = generatedQuestions.some(q => q.id === question.id);
                const isManual = question.source === 'manual';
                const isAnswerVisible = visibleAnswers[question.id] || false;
                
                return (
                  <div 
                    key={question.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="font-medium text-gray-900">{index + 1}:</span>
                          {isGenerated && !isManual && (
                            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              Generated
                            </span>
                          )}
                          {isManual && (
                            <span className="ml-2 px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                              Manual
                            </span>
                          )}
                          {isCorrect && (
                            <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                              Correct
                            </span>
                          )}
                          {question.type === 'multiple-choice' && (
                            <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                              Multiple Choice
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-2">{question.text}</p>
                        
                        {question.type === 'multiple-choice' && question.options && (
                          <div className="mt-2 mb-3 space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center">
                                <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center mr-2 text-xs">
                                  {String.fromCharCode(65 + optionIndex)}
                                </div>
                                <span className="text-sm text-gray-600">{option}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-2">
                          <button
                            onClick={() => toggleAnswerVisibility(question.id)}
                            className="text-sm text-primary-600 hover:text-primary-800"
                          >
                            {isAnswerVisible ? 'Hide Model Answer' : 'Show Model Answer'}
                          </button>
                          {isAnswerVisible && (
                            <div className="mt-2 p-3 bg-gray-50 rounded-md text-gray-700">
                              {question.modelAnswer}
                            </div>
                          )}
                        </div>
                      </div>
                      {isGenerated && (
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="ml-4 text-red-500 hover:text-red-700"
                          title="Delete question"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 