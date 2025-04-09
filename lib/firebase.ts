import { initializeApp, getApps } from 'firebase/app';
import { getAuth, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, query, where, deleteDoc, updateDoc } from 'firebase/firestore';
import { UserProgress, UserQuestion } from '@/app/types';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKOuNpE2dwR8vTX8Eq4Oi0ls9UeRlky-c",
  authDomain: "aiquisition-bbd3f.firebaseapp.com",
  projectId: "aiquisition-bbd3f",
  storageBucket: "aiquisition-bbd3f.firebasestorage.app",
  messagingSenderId: "636262831781",
  appId: "1:636262831781:web:d733be00335bf176661f4c",
  measurementId: "G-DN81W5MMZZ"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

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
  const progressDoc = await getDoc(doc(db, 'userProgress', userId));
  const currentProgress = progressDoc.exists() ? progressDoc.data() as UserProgress : {
    userId,
    topics: {},
    lastAccessed: new Date()
  };

  const topicProgress = currentProgress.topics[topic] || {
    completedQuestions: [],
    correctQuestions: [],
    lastAccessed: new Date()
  };

  // Generate a unique ID for this question attempt
  const questionAttemptId = crypto.randomUUID();
  
  const updatedProgress: UserProgress = {
    ...currentProgress,
    topics: {
      ...currentProgress.topics,
      [topic]: {
        ...topicProgress,
        completedQuestions: [...topicProgress.completedQuestions, questionAttemptId],
        correctQuestions: isCorrect 
          ? [...topicProgress.correctQuestions, questionAttemptId] 
          : topicProgress.correctQuestions,
        lastAccessed: new Date()
      }
    },
    lastAccessed: new Date()
  };

  await setDoc(doc(db, 'userProgress', userId), updatedProgress);
  return updatedProgress;
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