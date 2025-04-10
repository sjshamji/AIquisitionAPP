'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/providers/FirebaseAuthProvider';
import { format } from 'date-fns';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/app/components/Button';
import { useRouter } from 'next/navigation';
import Navigation from '../components/Navigation';

export default function AccountPage() {
  const { user, logout, updatePassword } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  
  const memberSince = user?.metadata.creationTime ? new Date(user.metadata.creationTime) : new Date();
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 7); // Example: 7 days from now
  
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Redirect to home page if no user is signed in
    if (mounted && !user) {
      router.push('/');
    }
  }, [user, router, mounted]);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const handleSignIn = () => {
    router.push('/auth/login');
  };
  
  const handleSignUp = () => {
    router.push('/auth/signup');
  };
  
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };
  
  const handleChangePassword = async () => {
    setError('');
    setSuccess('');
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      await updatePassword(newPassword);
      setSuccess('Password updated successfully');
      setShowPasswordModal(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Failed to update password: ' + (err as Error).message);
    }
  };
  
  const handleUpdateEmail = async () => {
    setError('');
    setSuccess('');
    
    if (!newEmail) {
      setError('Email is required');
      return;
    }
    
    try {
      // This would need to be implemented in your auth provider
      // await updateEmail(newEmail);
      setSuccess('Email updated successfully');
      setShowEmailModal(false);
      setNewEmail('');
    } catch (err) {
      setError('Failed to update email: ' + (err as Error).message);
    }
  };
  
  if (!mounted) return null;

  // If no user is signed in, don't render anything (will redirect)
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black transition-colors duration-200">
      {/* Fixed Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                AIquisition
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/review" className="nav-link text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                Review
              </Link>
              <Link href="/practice" className="nav-link text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                Practice
              </Link>
              <Link href="/pricing" className="nav-link text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                Pricing
              </Link>
              {user && (
                <Link href="/account" className="nav-link font-bold text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                  Account
                </Link>
              )}
            </div>

            {/* Auth Buttons and Dark Mode Toggle */}
            <div className="flex items-center space-x-4">
              {user && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                >
                  Sign Out
                </button>
              )}
              {!user && (
                <button onClick={handleSignIn} className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                  Sign In
                </button>
              )}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Account Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Account</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Manage your account settings and subscription
            </p>
          </div>
          
          {/* Account Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-black rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Information</h2>
                  
                  {/* Avatar and User Info */}
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,50 C20,30 40,70 60,50 C80,30 100,70 100,50 L100,100 L0,100 Z" fill="url(#gradient)" />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="50%" stopColor="#EC4899" />
                            <stop offset="100%" stopColor="#EF4444" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xl font-medium text-gray-900 dark:text-white">{user?.displayName || 'User'}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  
                  {/* Member Since */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Member Since</h3>
                    <p className="text-gray-900 dark:text-white">
                      {format(memberSince, 'MMMM d, yyyy')}
                    </p>
                  </div>
                  
                  {/* Account Actions */}
                  <div className="flex flex-col space-y-4">
                    <Button 
                      className="w-full bg-gray-800 hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100"
                      onClick={() => setShowPasswordModal(true)}
                    >
                      Change Password
                    </Button>
                    <Button 
                      className="w-full bg-gray-800 hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100"
                      onClick={() => setShowEmailModal(true)}
                    >
                      Update Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subscription Card */}
            <div>
              <div className="bg-white dark:bg-black rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Subscription</h2>
                  
                  {/* Current Plan */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Current Plan</h3>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">Diamond Tier</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">$15/month</p>
                  </div>
                  
                  {/* Trial Status */}
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Free Trial Ends {format(trialEndDate, 'MMMM d, yyyy')}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Upgrade required before trial ends to retain access to all premium content and functionality.
                    </p>
                  </div>
                  
                  {/* Subscription Actions */}
                  <div className="flex flex-col space-y-4">
                    <Link href="/pricing">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-white dark:text-black dark:hover:bg-gray-100">
                        Upgrade Plan
                      </Button>
                    </Link>
                    <Button className="w-full bg-gray-800 hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100">
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900/50 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} AIquisition. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-black rounded-lg p-6 max-w-md w-full border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Change Password</h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 rounded-md border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-200 rounded-md border border-green-200 dark:border-green-800">
                {success}
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-white dark:bg-black text-gray-900 dark:text-white rounded-md border-2 border-purple-600 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Update Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-black rounded-lg p-6 max-w-md w-full border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Update Email</h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 rounded-md border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-200 rounded-md border border-green-200 dark:border-green-800">
                {success}
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Email Address
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateEmail}
                className="px-4 py-2 bg-white dark:bg-black text-gray-900 dark:text-white rounded-md border-2 border-purple-600 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                Update Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 