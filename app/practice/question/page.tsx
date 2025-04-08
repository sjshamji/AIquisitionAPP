'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '../../../components/Button';
import { Question } from '../../../components/Question';
import { QuestionFeedback } from '../../../components/QuestionFeedback';
import { Card, CardHeader, CardContent } from '../../../components/Card';

export default function QuestionPage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic');
  const type = searchParams.get('type') || 'multiple-choice';
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState<any>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  
  // Load a question on component mount
  useEffect(() => {
    async function loadQuestion() {
      if (!topic) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topic, type }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to load question');
        }
        
        const data = await response.json();
        setQuestion(data.question);
      } catch (err) {
        console.error('Error loading question:', err);
        setError('Failed to load question. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadQuestion();
  }, [topic, type]);
  
  // Handle answer submission
  const handleSubmit = async (questionId: string, answer: string | string[]) => {
    if (type === 'multiple-choice') {
      // For multiple-choice, we can provide immediate feedback
      return Promise.resolve();
    } else {
      // For open-ended questions, evaluate with API
      try {
        setUserAnswer(answer as string);
        
        const response = await fetch('/api/evaluate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            questionText: question.text,
            userAnswer: answer,
            modelAnswer: question.modelAnswer,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to evaluate answer');
        }
        
        const data = await response.json();
        setFeedback(data.feedback);
        return Promise.resolve();
      } catch (err) {
        console.error('Error evaluating answer:', err);
        return Promise.reject('Failed to evaluate answer');
      }
    }
  };
  
  // Handle loading another question
  const handleNextQuestion = () => {
    setQuestion(null);
    setFeedback(null);
    setUserAnswer('');
    setIsLoading(true);
    
    // Reload the page to get a new question
    window.location.href = `/practice/question?topic=${topic}&type=${type}`;
  };
  
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance Question</h1>
          <p className="text-gray-600">
            Topic: <span className="font-medium">{formatTopicName(topic || '')}</span>
          </p>
        </div>
        <Button href="/practice" variant="outline">
          Back to Topics
        </Button>
      </header>
      
      {isLoading ? (
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center">
              <div className="h-8 w-8 rounded-full border-2 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin mb-4"></div>
              <p className="text-gray-500">Loading your question...</p>
            </div>
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : question ? (
        <div className="space-y-8">
          <Question
            id={question.id}
            text={question.text}
            type={question.type}
            choices={question.choices}
            modelAnswer={question.modelAnswer}
            correctChoiceId={question.correctChoiceId}
            onSubmit={handleSubmit}
          />
          
          {feedback && (
            <QuestionFeedback
              questionText={question.text}
              userAnswer={userAnswer}
              modelAnswer={question.modelAnswer}
              overallFeedback={feedback.overallFeedback}
              categories={feedback.categories}
            />
          )}
          
          {(feedback || question.type === 'multiple-choice') && (
            <div className="flex justify-center pt-4">
              <Button onClick={handleNextQuestion}>
                Next Question
              </Button>
            </div>
          )}
        </div>
      ) : null}
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