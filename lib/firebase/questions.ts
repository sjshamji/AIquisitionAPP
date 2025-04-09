import { db } from './firebase';
import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Question, UserQuestion } from '@/app/types';

// Get all questions for a user
export const getUserQuestions = async (userId: string): Promise<UserQuestion[]> => {
  const questionsRef = collection(db, 'questions');
  const q = query(questionsRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as UserQuestion));
};

// Get questions for a user filtered by topic
export const getUserQuestionsByTopic = async (userId: string, topic: string): Promise<UserQuestion[]> => {
  const questionsRef = collection(db, 'questions');
  const q = query(
    questionsRef,
    where('userId', '==', userId),
    where('topic', '==', topic)
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as UserQuestion));
};

// Add a new question
export const addQuestion = async (question: Omit<UserQuestion, 'id'>): Promise<string> => {
  const questionsRef = collection(db, 'questions');
  const docRef = await addDoc(questionsRef, {
    ...question,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
};

// Update an existing question
export const updateQuestion = async (questionId: string, updates: Partial<UserQuestion>): Promise<void> => {
  const questionRef = doc(db, 'questions', questionId);
  await updateDoc(questionRef, updates);
};

// Delete a question
export const deleteQuestion = async (questionId: string): Promise<void> => {
  const questionRef = doc(db, 'questions', questionId);
  await deleteDoc(questionRef);
};

// Mark a question as correct for a user
export const markQuestionAsCorrect = async (userId: string, questionId: string): Promise<void> => {
  const progressRef = doc(db, 'userProgress', userId);
  const progressDoc = await getDoc(progressRef);
  
  if (progressDoc.exists()) {
    const progress = progressDoc.data();
    const correctQuestions = progress.correctQuestions || [];
    if (!correctQuestions.includes(questionId)) {
      await updateDoc(progressRef, {
        correctQuestions: [...correctQuestions, questionId]
      });
    }
  }
};

// Check if a question is marked as correct for a user
export const isQuestionCorrect = async (userId: string, questionId: string): Promise<boolean> => {
  const progressRef = doc(db, 'userProgress', userId);
  const progressDoc = await getDoc(progressRef);
  
  if (progressDoc.exists()) {
    const progress = progressDoc.data();
    const correctQuestions = progress.correctQuestions || [];
    return correctQuestions.includes(questionId);
  }
  return false;
};

// Get all correct questions for a user and topic
export const getCorrectQuestions = async (userId: string, topic: string): Promise<UserQuestion[]> => {
  const progressRef = doc(db, 'userProgress', userId);
  const progressDoc = await getDoc(progressRef);
  
  if (progressDoc.exists()) {
    const progress = progressDoc.data();
    const correctQuestions = progress.correctQuestions || [];
    
    const questionsRef = collection(db, 'questions');
    const q = query(
      questionsRef,
      where('userId', '==', userId),
      where('topic', '==', topic)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      } as UserQuestion))
      .filter(question => correctQuestions.includes(question.id));
  }
  return [];
};

// Get all completed questions for a user and topic
export const getCompletedQuestions = async (userId: string, topic: string): Promise<UserQuestion[]> => {
  const questionsRef = collection(db, 'questions');
  const q = query(
    questionsRef,
    where('userId', '==', userId),
    where('topic', '==', topic)
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as UserQuestion));
}; 