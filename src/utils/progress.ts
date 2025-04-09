import { Topic } from '@/lib/data/topics';
import { getQuestionsByTopic } from '@/lib/data/questions';

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

export function getAllTopicsProgress(topics: Topic[]): TopicProgress[] {
  return topics.map(topic => getTopicProgress(topic.id));
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
export function resetAllProgress(): void {
  if (typeof window === 'undefined') return;
  
  // Get all keys from localStorage
  const keys = Object.keys(localStorage);
  
  // Remove all progress keys
  keys.forEach(key => {
    if (key.startsWith('progress_')) {
      localStorage.removeItem(key);
    }
    if (key.startsWith('generated_questions_')) {
      localStorage.removeItem(key);
    }
    if (key.startsWith('correct_questions_')) {
      localStorage.removeItem(key);
    }
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
  if (typeof window === 'undefined') return [];
  
  const generatedQuestionsKey = `generated_questions_${topicId}`;
  const storedQuestions = localStorage.getItem(generatedQuestionsKey);
  
  if (!storedQuestions) return [];
  
  try {
    return JSON.parse(storedQuestions);
  } catch (error) {
    console.error('Error parsing generated questions:', error);
    return [];
  }
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
  if (typeof window === 'undefined') return [];
  
  const correctQuestionsKey = `correct_questions_${topicId}`;
  const storedCorrectQuestions = localStorage.getItem(correctQuestionsKey);
  
  if (!storedCorrectQuestions) return [];
  
  try {
    return JSON.parse(storedCorrectQuestions);
  } catch (error) {
    console.error('Error parsing correct questions:', error);
    return [];
  }
}

// Check if a question has been marked as correct
export function isQuestionCorrect(questionId: string, topicId: string | null): boolean {
  if (!topicId) return false;
  const correctQuestions = getCorrectQuestions(topicId);
  return correctQuestions.includes(questionId);
} 