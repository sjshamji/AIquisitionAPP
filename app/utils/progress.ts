import { topics } from '../data/topics';
import { UserProgress, Topic } from '../types';
import { getQuestionsByTopic } from '../data/questions';

export interface TopicProgress {
  topicId: string;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
}

export function getTopicProgress(topicId: string): TopicProgress {
  if (typeof window === 'undefined') {
    return {
      topicId,
      totalQuestions: 0,
      answeredQuestions: 0,
      correctAnswers: 0
    };
  }

  const questions = getQuestionsByTopic(topicId);
  const baseTotalQuestions = questions.length;
  
  // Get the number of generated questions for this topic
  const generatedQuestions = getGeneratedQuestions(topicId);
  const generatedQuestionsCount = generatedQuestions.length;
  
  // Calculate the total number of questions (base + generated)
  const totalQuestions = baseTotalQuestions + generatedQuestionsCount;
  
  // Get progress from localStorage
  const progressKey = `progress_${topicId}`;
  const storedProgress = localStorage.getItem(progressKey);
  
  if (!storedProgress) {
    return {
      topicId,
      totalQuestions,
      answeredQuestions: 0,
      correctAnswers: 0
    };
  }
  
  try {
    const progress = JSON.parse(storedProgress);
    return {
      topicId,
      totalQuestions,
      answeredQuestions: progress.answeredQuestions || 0,
      correctAnswers: progress.correctAnswers || 0
    };
  } catch (error) {
    console.error('Error parsing progress data:', error);
    return {
      topicId,
      totalQuestions,
      answeredQuestions: 0,
      correctAnswers: 0
    };
  }
}

export function updateTopicProgress(topicId: string, isCorrect: boolean, additionalQuestions: number = 0): void {
  if (typeof window === 'undefined') return;
  
  const progressKey = `progress_${topicId}`;
  const currentProgress = getTopicProgress(topicId);
  
  // Only update the total questions count if we're adding new questions
  const updatedProgress = {
    ...currentProgress,
    // Don't update totalQuestions here, as it's already calculated in getTopicProgress
    // Only increment answered questions if we're marking an answer (not just adding questions)
    answeredQuestions: additionalQuestions > 0 ? currentProgress.answeredQuestions : currentProgress.answeredQuestions + 1,
    // Only increment correct answers if the answer was correct
    correctAnswers: additionalQuestions > 0 ? currentProgress.correctAnswers : currentProgress.correctAnswers + (isCorrect ? 1 : 0)
  };
  
  localStorage.setItem(progressKey, JSON.stringify(updatedProgress));
}

export function getAllTopicsProgress(topicsList: Topic[], userProgress: UserProgress | null): TopicProgress[] {
  return topicsList.map(topic => {
    // Get base questions for this topic
    const baseQuestions = getQuestionsByTopic(topic.id);
    const baseTotalQuestions = baseQuestions.length;

    // Get generated questions from localStorage
    const generatedQuestions = getGeneratedQuestions(topic.id);
    const generatedQuestionsCount = generatedQuestions.length;

    // Get user questions from Firebase
    const userQuestions = userProgress?.topics[topic.id]?.completedQuestions || [];
    const userQuestionsCount = userQuestions.length;

    // Calculate total questions (base + generated + user)
    const totalQuestions = Math.max(baseTotalQuestions + generatedQuestionsCount + userQuestionsCount, 1);

    // Get progress from Firebase
    const topicData = userProgress?.topics[topic.id] || {
      completedQuestions: [],
      correctQuestions: [],
      lastAccessed: new Date()
    };

    return {
      topicId: topic.id,
      totalQuestions,
      answeredQuestions: topicData.completedQuestions.length,
      correctAnswers: topicData.correctQuestions.length
    };
  });
}

// Reset progress for a specific topic
export function resetTopicProgress(topicId: string): void {
  if (typeof window === 'undefined') return;
  
  const progressKey = `progress_${topicId}`;
  localStorage.removeItem(progressKey);
  
  // Also remove any generated questions for this topic
  const generatedQuestionsKey = `generated_questions_${topicId}`;
  localStorage.removeItem(generatedQuestionsKey);
}

// Reset progress for all topics
export function resetAllProgress() {
  // Clear all generated questions
  topics.forEach(topic => {
    localStorage.removeItem(`generated_questions_${topic.id}`);
    localStorage.removeItem(`correct_questions_${topic.id}`);
  });
}

// Store generated questions for a topic
export function storeGeneratedQuestions(topicId: string, questions: any[]): void {
  if (typeof window === 'undefined') return;
  
  const generatedQuestionsKey = `generated_questions_${topicId}`;
  localStorage.setItem(generatedQuestionsKey, JSON.stringify(questions));
}

// Get generated questions for a topic
export function getGeneratedQuestions(topicId: string): any[] {
  const storedQuestions = localStorage.getItem(`generated_questions_${topicId}`);
  return storedQuestions ? JSON.parse(storedQuestions) : [];
}

// Mark a question as correct
export function markQuestionAsCorrect(topicId: string, questionId: string): void {
  if (typeof window === 'undefined') return;
  
  const correctQuestionsKey = `correct_questions_${topicId}`;
  const storedCorrectQuestions = localStorage.getItem(correctQuestionsKey);
  
  let correctQuestions: string[] = [];
  if (storedCorrectQuestions) {
    try {
      correctQuestions = JSON.parse(storedCorrectQuestions);
    } catch (error) {
      console.error('Error parsing correct questions:', error);
    }
  }
  
  // Add the question ID if it's not already in the list
  if (!correctQuestions.includes(questionId)) {
    correctQuestions.push(questionId);
    localStorage.setItem(correctQuestionsKey, JSON.stringify(correctQuestions));
  }
}

// Get all questions marked as correct for a topic
export function getCorrectQuestions(topicId: string): string[] {
  const storedCorrect = localStorage.getItem(`correct_questions_${topicId}`);
  return storedCorrect ? JSON.parse(storedCorrect) : [];
}

// Check if a question has been marked as correct
export function isQuestionCorrect(questionId: string, topicId: string): boolean {
  const correctQuestions = getCorrectQuestions(topicId);
  return correctQuestions.includes(questionId);
} 