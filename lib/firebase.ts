import { initializeApp, getApps } from 'firebase/app';
import { getAuth, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, query, where, deleteDoc, updateDoc } from 'firebase/firestore';
import { UserProgress, UserQuestion } from '@/app/types';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Debug environment variables
console.log('Firebase config loaded:', {
  apiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: !!process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
});

// Check if any environment variables are missing
const missingVars = [];
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) missingVars.push('NEXT_PUBLIC_FIREBASE_API_KEY');
if (!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) missingVars.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) missingVars.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
if (!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) missingVars.push('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET');
if (!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) missingVars.push('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID');
if (!process.env.NEXT_PUBLIC_FIREBASE_APP_ID) missingVars.push('NEXT_PUBLIC_FIREBASE_APP_ID');

if (missingVars.length > 0) {
  console.error('Missing Firebase environment variables:', missingVars);
  console.error('Please check your .env.local file and make sure all required variables are set.');
}

// Initialize Firebase
let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  console.log('Firebase app initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase app:', error);
  throw error;
}

const auth = getAuth(app);
const db = getFirestore(app);
console.log('Firebase Auth and Firestore initialized');

// Authentication Functions
export async function sendVerificationEmail() {
  const user = auth.currentUser;
  if (user) {
    try {
      await sendEmailVerification(user);
      return { success: true, message: 'Verification email sent successfully' };
    } catch (error) {
      console.error('Error sending verification email:', error);
      return { success: false, message: 'Failed to send verification email' };
    }
  }
  return { success: false, message: 'No user is currently signed in' };
}

export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Password reset email sent successfully' };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, message: 'Failed to send password reset email' };
  }
}

// User Progress Functions
export async function getUserProgress(userId: string): Promise<UserProgress> {
  const progressDoc = await getDoc(doc(db, 'userProgress', userId));
  if (progressDoc.exists()) {
    const progressData = progressDoc.data() as UserProgress;
    return {
      ...progressData,
      lastAccessed: new Date(progressData.lastAccessed),
      topics: Object.fromEntries(
        Object.entries(progressData.topics || {}).map(([key, value]) => [
          key,
          {
            ...value,
            lastAccessed: new Date(value.lastAccessed)
          }
        ])
      )
    };
  } else {
    // Initialize empty progress if none exists
    const emptyProgress: UserProgress = {
      userId,
      topics: {},
      lastAccessed: new Date()
    };
    await setDoc(doc(db, 'userProgress', userId), emptyProgress);
    return emptyProgress;
  }
}

export async function updateUserProgress(userId: string, topic: string, isCorrect: boolean): Promise<UserProgress> {
  const progressRef = doc(db, 'userProgress', userId);
  const progressDoc = await getDoc(progressRef);
  
  if (!progressDoc.exists()) {
    // Initialize empty progress if none exists
    const emptyProgress: UserProgress = {
      userId,
      topics: {
        [topic]: {
          completedQuestions: 1,
          correctQuestions: isCorrect ? 1 : 0,
          lastAccessed: new Date()
        }
      },
      lastAccessed: new Date()
    };
    await setDoc(progressRef, emptyProgress);
    return emptyProgress;
  }

  const currentProgress = progressDoc.data() as UserProgress;
  const topicProgress = currentProgress.topics[topic] || {
    completedQuestions: 0,
    correctQuestions: 0,
    lastAccessed: new Date()
  };

  // Update the progress
  const updatedProgress = {
    [`topics.${topic}.completedQuestions`]: topicProgress.completedQuestions + 1,
    [`topics.${topic}.correctQuestions`]: isCorrect 
      ? topicProgress.correctQuestions + 1 
      : topicProgress.correctQuestions,
    [`topics.${topic}.lastAccessed`]: new Date(),
    lastAccessed: new Date()
  };

  await updateDoc(progressRef, updatedProgress);

  // Return the full updated progress
  return {
    ...currentProgress,
    topics: {
      ...currentProgress.topics,
      [topic]: {
        completedQuestions: topicProgress.completedQuestions + 1,
        correctQuestions: isCorrect 
          ? topicProgress.correctQuestions + 1 
          : topicProgress.correctQuestions,
        lastAccessed: new Date()
      }
    },
    lastAccessed: new Date()
  };
}

// User Questions Functions
export async function getUserQuestions(userId: string): Promise<UserQuestion[]> {
  const questionsQuery = query(collection(db, 'questions'), where('userId', '==', userId));
  const questionsSnapshot = await getDocs(questionsQuery);
  return questionsSnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
    createdAt: new Date(doc.data().createdAt)
  })) as UserQuestion[];
}

export async function addQuestion(userId: string, question: Omit<UserQuestion, 'id'>): Promise<UserQuestion> {
  const questionId = crypto.randomUUID();
  const newQuestion: UserQuestion = {
    ...question,
    id: questionId,
    userId
  };
  await setDoc(doc(db, 'questions', questionId), newQuestion);
  return newQuestion;
}

export async function updateQuestion(questionId: string, updates: Partial<UserQuestion>): Promise<UserQuestion> {
  const questionDoc = await getDoc(doc(db, 'questions', questionId));
  if (!questionDoc.exists()) {
    throw new Error('Question not found');
  }
  
  const updatedQuestion = {
    ...questionDoc.data(),
    ...updates
  } as UserQuestion;
  
  await updateDoc(doc(db, 'questions', questionId), updates);
  return updatedQuestion;
}

export async function deleteQuestion(questionId: string): Promise<void> {
  await deleteDoc(doc(db, 'questions', questionId));
}

export { app, auth, db }; 