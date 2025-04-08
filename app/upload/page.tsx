'use client';

import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { FileUpload } from '../../components/FileUpload';
import { Card, CardHeader, CardContent, CardFooter } from '../../components/Card';
import { Question } from '../../components/Question';

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(3);
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  
  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(e.target.value);
  };
  
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10);
    setQuestionCount(count >= 1 && count <= 5 ? count : 3);
  };
  
  const handleUpload = async (file: File) => {
    if (!selectedTopic) {
      setUploadError('Please select a topic before uploading');
      return Promise.reject();
    }
    
    setIsUploading(true);
    setUploadError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('topic', selectedTopic);
      formData.append('questionCount', questionCount.toString());
      
      // First, the upload happens
      setIsGeneratingQuestions(true);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }
      
      const data = await response.json();
      setQuestions(data.questions || []);
      setActiveQuestionIndex(0);
      
      return Promise.resolve();
    } catch (err: any) {
      console.error('Upload error:', err);
      setUploadError(err.message || 'Failed to upload document');
      return Promise.reject();
    } finally {
      setIsUploading(false);
      setIsGeneratingQuestions(false);
    }
  };
  
  const handleQuestionSubmit = async (questionId: string, answer: string | string[]) => {
    // In a real app, we would save this answer
    return Promise.resolve();
  };
  
  const handleNextQuestion = () => {
    if (activeQuestionIndex < questions.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };
  
  const resetQuestions = () => {
    setQuestions([]);
    setActiveQuestionIndex(0);
  };
  
  return (
    <div className="space-y-8">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Document-Based Learning</h1>
        <p className="text-gray-600 mt-1">
          Upload your study materials to generate personalized questions
        </p>
      </header>
      
      {questions.length > 0 ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Custom Questions ({activeQuestionIndex + 1}/{questions.length})
            </h2>
            <Button variant="outline" onClick={resetQuestions}>
              Upload New Document
            </Button>
          </div>
          
          <Question
            id={questions[activeQuestionIndex].id}
            text={questions[activeQuestionIndex].text}
            type={questions[activeQuestionIndex].type}
            choices={questions[activeQuestionIndex].choices}
            modelAnswer={questions[activeQuestionIndex].modelAnswer}
            onSubmit={handleQuestionSubmit}
          />
          
          <div className="flex justify-between">
            <Button 
              onClick={handlePrevQuestion} 
              variant="outline" 
              disabled={activeQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={handleNextQuestion} 
              disabled={activeQuestionIndex === questions.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Upload Document</h2>
            <Card>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Topic
                  </label>
                  <select
                    id="topic"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    value={selectedTopic}
                    onChange={handleTopicChange}
                  >
                    <option value="">Select a topic...</option>
                    <option value="accounting">Accounting</option>
                    <option value="valuation">Valuation</option>
                    <option value="dcf">DCF Modeling</option>
                    <option value="ma">M&A</option>
                    <option value="lbo">LBO Modeling</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="questionCount" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Questions (1-5)
                  </label>
                  <input
                    id="questionCount"
                    type="number"
                    min={1}
                    max={5}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    value={questionCount}
                    onChange={handleCountChange}
                  />
                </div>
                
                <div className="pt-2">
                  <FileUpload onUpload={handleUpload} accept=".pdf" />
                </div>
                
                {uploadError && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-md">
                    {uploadError}
                  </div>
                )}
                
                {isGeneratingQuestions && (
                  <div className="bg-blue-50 p-4 rounded-md text-center">
                    <div className="flex justify-center mb-2">
                      <div className="h-6 w-6 rounded-full border-2 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin"></div>
                    </div>
                    <p className="text-blue-700">Generating personalized questions...</p>
                    <p className="text-sm text-blue-500 mt-1">This may take a minute or two</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">How It Works</h2>
            <Card>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <span className="text-primary-700 font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Upload Your Document</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Select a PDF containing study materials, guides, or notes on finance topics.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <span className="text-primary-700 font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">AI Analysis</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Our AI analyzes your document to extract key finance concepts and creates personalized questions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <span className="text-primary-700 font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Practice & Learn</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Answer the generated questions to test your understanding of the material and get instant feedback.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">Supported Document Types</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• PDF files (text must be selectable, not scanned images)</li>
                    <li>• Maximum size: 10MB</li>
                    <li>• Recommended: Study guides, notes, textbook excerpts</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      )}
    </div>
  );
} 