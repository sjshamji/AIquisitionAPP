import { db } from './firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { User } from '@clerk/nextjs/server';

// Types for user data
export interface UserProgress {
  userId: string;
  topic: string;
  completedQuestions: string[];
  correctQuestions: string[];
  lastAccessed: Date;
}

export interface UserQuestion {
  id: string;
  userId: string;
  topic: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  isGenerated: boolean;
  isManual: boolean;
  createdAt: Date;
}

// Initialize user data when they first sign up
export async function initializeUserData(userId: string) {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    // Create initial user data
    await setDoc(userRef, {
      userId,
      createdAt: new Date(),
      lastAccessed: new Date(),
      progress: {},
      questions: []
    });
    
    // Initialize progress for each topic
    const topics = ['investment-banking', 'product', 'analytics', 'strategy'];
    for (const topic of topics) {
      await setDoc(doc(db, 'userProgress', `${userId}_${topic}`), {
        userId,
        topic,
        completedQuestions: [],
        correctQuestions: [],
        lastAccessed: new Date()
      });
    }
  }
  
  return userDoc.data();
}

// Get user progress for a specific topic
export async function getUserProgress(userId: string, topic: string): Promise<UserProgress | null> {
  const progressRef = doc(db, 'userProgress', `${userId}_${topic}`);
  const progressDoc = await getDoc(progressRef);
  
  if (progressDoc.exists()) {
    return progressDoc.data() as UserProgress;
  }
  
  return null;
}

// Update user progress
export async function updateUserProgress(userId: string, topic: string, questionId: string, isCorrect: boolean) {
  const progressRef = doc(db, 'userProgress', `${userId}_${topic}`);
  const progressDoc = await getDoc(progressRef);
  
  if (progressDoc.exists()) {
    const progress = progressDoc.data() as UserProgress;
    
    // Add to completed questions if not already there
    if (!progress.completedQuestions.includes(questionId)) {
      progress.completedQuestions.push(questionId);
    }
    
    // Add to correct questions if correct and not already there
    if (isCorrect && !progress.correctQuestions.includes(questionId)) {
      progress.correctQuestions.push(questionId);
    }
    
    // Update last accessed time
    progress.lastAccessed = new Date();
    
    // Convert to plain object for updateDoc
    await updateDoc(progressRef, {
      completedQuestions: progress.completedQuestions,
      correctQuestions: progress.correctQuestions,
      lastAccessed: progress.lastAccessed
    });
  } else {
    // Create new progress document if it doesn't exist
    await setDoc(progressRef, {
      userId,
      topic,
      completedQuestions: [questionId],
      correctQuestions: isCorrect ? [questionId] : [],
      lastAccessed: new Date()
    });
  }
}

// Get user's questions
export async function getUserQuestions(userId: string, topic?: string): Promise<UserQuestion[]> {
  let q;
  
  if (topic) {
    q = query(collection(db, 'userQuestions'), where('userId', '==', userId), where('topic', '==', topic));
  } else {
    q = query(collection(db, 'userQuestions'), where('userId', '==', userId));
  }
  
  const querySnapshot = await getDocs(q);
  const questions: UserQuestion[] = [];
  
  querySnapshot.forEach((doc) => {
    questions.push(doc.data() as UserQuestion);
  });
  
  return questions;
}

// Add a new question for the user
export async function addUserQuestion(question: Omit<UserQuestion, 'id' | 'createdAt'>) {
  const id = `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  await setDoc(doc(db, 'userQuestions', id), {
    ...question,
    id,
    createdAt: new Date()
  });
  
  return id;
}

// Delete a user question
export async function deleteUserQuestion(questionId: string) {
  await setDoc(doc(db, 'userQuestions', questionId), { deleted: true });
} 