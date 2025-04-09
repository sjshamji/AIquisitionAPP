'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/providers/FirebaseAuthProvider';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { sendVerificationEmail } = useAuth();

  const handleResendVerification = async () => {
    setIsResending(true);
    setMessage(null);

    try {
      const result = await sendVerificationEmail();
      if (result.success) {
        setMessage({ type: 'success', text: 'Verification email sent! Please check your inbox.' });
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred while sending the verification email' });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Content */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Verify your email</h1>
            <p className="mt-2 text-gray-500">We've sent you a verification link</p>
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

          <div className="space-y-6">
            <div className="text-center text-gray-600">
              <p>Please check your email and click the verification link to activate your account.</p>
              <p className="mt-2">If you don't see the email, check your spam folder.</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleResendVerification}
                disabled={isResending}
                className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-70"
              >
                {isResending ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : 'Resend verification email'}
              </button>

              <Link 
                href="/auth/login"
                className="block w-full py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg text-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Back to login
              </Link>
            </div>
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