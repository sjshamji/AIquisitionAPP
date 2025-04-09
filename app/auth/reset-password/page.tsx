'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/providers/FirebaseAuthProvider';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await resetPassword(email);
      if (result.success) {
        setMessage({ type: 'success', text: 'Password reset email sent! Please check your inbox.' });
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred while resetting your password' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Reset your password</h1>
            <p className="mt-2 text-gray-500">Enter your email to receive reset instructions</p>
          </div>

          {message && (
            <div 
              className={`mb-6 p-3 rounded-md text-sm ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-600' 
                  : 'bg-red-50 text-red-600'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending reset email...
                  </div>
                ) : 'Send Reset Link'}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Decorative */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="h-full flex items-center justify-center p-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">AIquisition</h2>
            <p className="text-lg text-gray-600 max-w-md">
              Your AI-powered learning companion for mastering technical interviews and advancing your career.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 