'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './FirebaseAuthProvider';
import { 
  getUserProgress, 
  updateUserProgress, 
  getUserQuestions, 
  addQuestion, 
  updateQuestion, 
  deleteQuestion 
} from '@/lib/firebase';
import { UserProgress, UserQuestion } from '@/app/types';

interface UserDataContextType {
  userProgress: UserProgress | null;
  questions: UserQuestion[];
  addQuestion: (question: Omit<UserQuestion, 'id' | 'createdAt' | 'userId'>) => Promise<void>;
  removeQuestion: (questionId: string) => Promise<void>;
  updateUserQuestion: (questionId: string, question: Partial<UserQuestion>) => Promise<void>;
  updateProgress: (topic: string, isCorrect: boolean) => Promise<void>;
  fetchUserData: (userId: string) => Promise<void>;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [questions, setQuestions] = useState<UserQuestion[]>([]);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch user progress
      const progress = await getUserProgress(userId);
      setUserProgress(progress);

      // Fetch user questions
      const userQuestions = await getUserQuestions(userId);
      setQuestions(userQuestions);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData(user.uid);
    } else {
      setUserProgress(null);
      setQuestions([]);
    }
  }, [user]);

  const handleUpdateProgress = async (topic: string, isCorrect: boolean) => {
    if (!user) return;

    try {
      const updatedProgress = await updateUserProgress(user.uid, topic, isCorrect);
      setUserProgress(updatedProgress);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleAddQuestion = async (question: Omit<UserQuestion, 'id' | 'createdAt' | 'userId'>) => {
    if (!user) return;

    try {
      const newQuestion = await addQuestion(user.uid, {
        ...question,
        createdAt: new Date(),
        userId: user.uid
      });
      setQuestions(prev => [...prev, newQuestion]);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleRemoveQuestion = async (questionId: string) => {
    if (!user) return;

    try {
      await deleteQuestion(questionId);
      setQuestions(prev => prev.filter(q => q.id !== questionId));
    } catch (error) {
      console.error('Error removing question:', error);
    }
  };

  const handleUpdateUserQuestion = async (questionId: string, question: Partial<UserQuestion>) => {
    if (!user) return;

    try {
      const updatedQuestion = await updateQuestion(questionId, question);
      setQuestions(prev => prev.map(q => q.id === questionId ? updatedQuestion : q));
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  const value = {
    userProgress,
    questions,
    addQuestion: handleAddQuestion,
    removeQuestion: handleRemoveQuestion,
    updateUserQuestion: handleUpdateUserQuestion,
    updateProgress: handleUpdateProgress,
    fetchUserData
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
} 