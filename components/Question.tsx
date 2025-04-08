import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { Button } from './Button';

export type QuestionType = 'multiple-choice' | 'open-ended';

export interface Choice {
  id: string;
  text: string;
}

export interface QuestionProps {
  id: string;
  text: string;
  type: QuestionType;
  choices?: Choice[];
  modelAnswer?: string;
  correctChoiceId?: string;
  onSubmit: (questionId: string, answer: string | string[]) => Promise<void>;
}

export function Question({ id, text, type, choices = [], modelAnswer, correctChoiceId, onSubmit }: QuestionProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitted) return;
    
    setIsLoading(true);
    
    try {
      if (type === 'multiple-choice' && selectedChoice) {
        await onSubmit(id, [selectedChoice]);
      } else if (type === 'open-ended' && textAnswer.trim()) {
        await onSubmit(id, textAnswer);
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isCorrect = type === 'multiple-choice' && selectedChoice === correctChoiceId;

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold text-gray-900">{text}</h3>
        <p className="text-sm text-gray-500 mt-1 capitalize">
          {type.replace('-', ' ')} Question
        </p>
      </CardHeader>
      
      <CardContent>
        {type === 'multiple-choice' ? (
          <div className="space-y-3">
            {choices.map((choice) => (
              <div
                key={choice.id}
                className={`p-3 rounded-md border cursor-pointer transition-colors ${
                  selectedChoice === choice.id
                    ? isSubmitted
                      ? isCorrect
                        ? 'bg-green-50 border-green-300'
                        : 'bg-red-50 border-red-300'
                      : 'bg-primary-50 border-primary-300'
                    : isSubmitted && choice.id === correctChoiceId
                    ? 'bg-green-50 border-green-300'
                    : 'border-gray-200 hover:bg-gray-50'
                } ${isSubmitted ? 'pointer-events-none' : ''}`}
                onClick={() => !isSubmitted && setSelectedChoice(choice.id)}
              >
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name={`question-${id}`}
                    value={choice.id}
                    checked={selectedChoice === choice.id}
                    onChange={() => !isSubmitted && setSelectedChoice(choice.id)}
                    className="h-4 w-4 text-primary focus:ring-primary-500"
                    disabled={isSubmitted}
                  />
                  <span className="ml-3">{choice.text}</span>
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              rows={6}
              placeholder="Type your answer here..."
              value={textAnswer}
              onChange={(e) => !isSubmitted && setTextAnswer(e.target.value)}
              disabled={isSubmitted}
            />
          </div>
        )}
      </CardContent>
      
      {isSubmitted && modelAnswer && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h4 className="font-medium text-green-800 mb-2">Model Answer</h4>
          <p className="text-green-700">{modelAnswer}</p>
          {type === 'multiple-choice' && (
            <div className={`mt-2 font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </div>
          )}
        </div>
      )}
      
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={
            isLoading || 
            isSubmitted || 
            (type === 'multiple-choice' && !selectedChoice) || 
            (type === 'open-ended' && !textAnswer.trim())
          }
        >
          {isLoading ? 'Submitting...' : isSubmitted ? 'Submitted' : 'Submit Answer'}
        </Button>
      </CardFooter>
    </Card>
  );
} 