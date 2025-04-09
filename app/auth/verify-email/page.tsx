'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/providers/FirebaseAuthProvider';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { user, sendEmailVerification } = useAuth();

  const handleResendVerification = async () => {
    if (!user) {
      setMessage({ type: 'error', text: 'No user found. Please sign in again.' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      await sendEmailVerification();
      setMessage({ type: 'success', text: 'Verification email sent! Please check your inbox.' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to send verification email' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification email to{' '}
            <span className="font-medium text-gray-900">{user?.email}</span>
          </p>
        </div>

        {message && (
          <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleResendVerification}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Resend verification email'}
          </button>

          <div className="text-center">
            <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-700">
              Return to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 