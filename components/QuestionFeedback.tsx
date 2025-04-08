import React from 'react';
import { Card, CardHeader, CardContent } from './Card';

export interface FeedbackCategory {
  name: string;
  score: 'Strong' | 'Good' | 'Needs improvement';
  comment: string;
}

export interface QuestionFeedbackProps {
  questionText: string;
  userAnswer: string;
  modelAnswer: string;
  overallFeedback: string;
  categories: FeedbackCategory[];
}

export function QuestionFeedback({
  questionText,
  userAnswer,
  modelAnswer,
  overallFeedback,
  categories,
}: QuestionFeedbackProps) {
  const scoreColors = {
    Strong: 'text-green-700',
    Good: 'text-blue-700',
    'Needs improvement': 'text-amber-700',
  };

  const scoreBgColors = {
    Strong: 'bg-green-50',
    Good: 'bg-blue-50',
    'Needs improvement': 'bg-amber-50',
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold text-gray-900">Question Feedback</h3>
        <p className="text-gray-700 mt-2">{questionText}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium text-gray-700 mb-2">Your Answer</h4>
            <p className="text-gray-800">{userAnswer}</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-md">
            <h4 className="font-medium text-green-700 mb-2">Model Answer</h4>
            <p className="text-green-800">{modelAnswer}</p>
          </div>
        </div>

        <div className="p-4 bg-primary-50 rounded-md">
          <h4 className="font-medium text-primary-700 mb-2">Overall Feedback</h4>
          <p className="text-primary-800">{overallFeedback}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">Detailed Assessment</h4>
          <div className="space-y-3">
            {categories.map((category, index) => (
              <div key={index} className={`p-4 rounded-md ${scoreBgColors[category.score]}`}>
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">{category.name}</h5>
                  <span className={`px-3 py-1 text-sm rounded-full ${scoreColors[category.score]} ${scoreBgColors[category.score]} bg-opacity-30`}>
                    {category.score}
                  </span>
                </div>
                <p>{category.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 