'use client';

import React from 'react';
import { useAuth } from '@/app/providers/FirebaseAuthProvider';
import { format } from 'date-fns';
import Link from 'next/link';

export default function AccountPage() {
  const { user } = useAuth();
  const memberSince = user?.metadata.creationTime ? new Date(user.metadata.creationTime) : new Date();
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 7); // Example: 7 days from now

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Account</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your account.</p>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {/* Avatar and Email */}
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-sm text-gray-500">Diamond Tier</p>
              </div>
            </div>

            {/* Trial Status */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                Free Trial Ends {format(trialEndDate, 'dd/MM/yyyy')}
              </p>
              <p className="mt-2 text-sm text-blue-600">
                Upgrade required before trial ends to retain access to all premium content and functionality.
              </p>
              <Link 
                href="/pricing"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Go to Pricing
              </Link>
            </div>

            {/* Member Since */}
            <div className="mt-8">
              <p className="text-sm text-gray-500">
                Member since {format(memberSince, 'dd/MM/yyyy, HH:mm:ss')}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 