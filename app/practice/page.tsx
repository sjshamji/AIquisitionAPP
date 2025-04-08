import React from 'react';
import { Button } from '../../components/Button';
import { Card, CardHeader, CardContent } from '../../components/Card';

export default function PracticePage() {
  return (
    <div className="space-y-8">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Interview Practice</h1>
        <p className="text-gray-600 mt-1">
          Select a topic to practice technical finance interview questions
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Topic Selection */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Choose a Topic</h2>
          <div className="grid gap-3">
            {topics.map((topic) => (
              <Card key={topic.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">{topic.name}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">{topic.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">{topic.questionCount} questions</div>
                    <div className="space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        href={`/practice/question?topic=${topic.id}&type=multiple-choice`}
                      >
                        Multiple Choice
                      </Button>
                      <Button 
                        size="sm"
                        href={`/practice/question?topic=${topic.id}&type=open-ended`}
                      >
                        Open Ended
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Practice Tips */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Practice Tips</h2>
          <Card>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Multiple Choice Questions</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Test your technical knowledge with specific, focused questions on key concepts. 
                  Each question has one clear correct answer.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Open-Ended Questions</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Practice explaining complex concepts in your own words. 
                  You'll get detailed feedback on your technical accuracy, clarity, and depth.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Document-Based Practice</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Upload your own study materials for personalized questions.
                </p>
                <div className="mt-2">
                  <Button href="/upload" variant="outline" size="sm">
                    Upload Documents
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3 text-gray-900">Recent Practice</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-500">No recent practice sessions yet</p>
              <p className="text-sm text-gray-400 mt-1">Your history will appear here</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Sample topics data
const topics = [
  {
    id: 'accounting',
    name: 'Accounting',
    description: 'Financial statements, accounting principles, and financial reporting concepts',
    questionCount: 24,
  },
  {
    id: 'valuation',
    name: 'Valuation',
    description: 'Company valuation methods including multiples and intrinsic valuation techniques',
    questionCount: 18,
  },
  {
    id: 'dcf',
    name: 'DCF Modeling',
    description: 'Discounted cash flow analysis, WACC, terminal value, and sensitivity analysis',
    questionCount: 15,
  },
  {
    id: 'ma',
    name: 'M&A',
    description: 'Mergers and acquisitions, transaction structures, synergies, and deal modeling',
    questionCount: 20,
  },
  {
    id: 'lbo',
    name: 'LBO Modeling',
    description: 'Leveraged buyout concepts, debt structures, returns analysis, and exit strategies',
    questionCount: 12,
  },
]; 