import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers/FirebaseAuthProvider';

export default function AccountSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
          <div className="px-6 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{user?.email}</p>
          </div>
          
          <button
            onClick={() => router.push('/profile')}
            className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profile Settings
          </button>
          
          <button
            onClick={() => router.push('/practice')}
            className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-100"
          >
            My Progress
          </button>
          
          <button
            onClick={() => router.push('/question-bank')}
            className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-100"
          >
            Question Bank
          </button>
          
          <div className="border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full text-left px-6 py-3 text-sm text-red-600 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 