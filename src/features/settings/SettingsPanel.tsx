'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-primary-100 transition-colors"
        aria-label="Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-primary-100 py-2 z-50">
          <div className="px-4 py-2 border-b border-primary-100">
            <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
          </div>
          
          <div className="py-2">
            <Link
              href="/account"
              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700"
            >
              Account Settings
            </Link>
            
            <button
              onClick={handleResetProgress}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700"
            >
              Reset Progress
            </button>
            
            <div className="px-4 py-2">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Question Bank</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox text-primary" />
                  <span className="ml-2 text-sm text-gray-700">Show hints</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox text-primary" />
                  <span className="ml-2 text-sm text-gray-700">Randomize questions</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 