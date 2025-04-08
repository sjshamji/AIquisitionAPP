import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Ace Your <span className="text-primary">Finance Interviews</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          AI-powered practice for technical finance interviews. Master accounting, valuation, DCF, M&A, and LBO modeling with personalized feedback.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/practice" className="btn-primary">
            Start Practicing
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Key Features
        </h2>
        <div className="grid grid-cols-1 max-w-2xl mx-auto gap-8">
          {/* Feature 1 */}
          <div className="rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Adaptive Questions</h3>
            <p className="text-gray-700">
              Practice with both multiple choice and open-ended questions tailored to your skill level and learning needs.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">AI-Powered Feedback</h3>
            <p className="text-gray-700">
              Get instant, personalized feedback on your answers with specific insights on accuracy, clarity, and depth.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Comprehensive Coverage</h3>
            <p className="text-gray-700">
              Practice questions covering accounting, valuation, DCF, M&A, and LBO modeling to prepare for any finance interview.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 