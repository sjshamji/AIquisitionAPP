import { Topic } from '@/app/data/topics';
import { getQuestionsByTopic } from '@/app/data/questions';

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
  const totalQuestions = questions.length;
  
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

export function updateTopicProgress(topicId: string, isCorrect: boolean): void {
  if (typeof window === 'undefined') return;
  
  const progressKey = `progress_${topicId}`;
  const currentProgress = getTopicProgress(topicId);
  
  const updatedProgress = {
    ...currentProgress,
    answeredQuestions: currentProgress.answeredQuestions + 1,
    correctAnswers: currentProgress.correctAnswers + (isCorrect ? 1 : 0)
  };
  
  localStorage.setItem(progressKey, JSON.stringify(updatedProgress));
}

export function getAllTopicsProgress(topics: Topic[]): TopicProgress[] {
  return topics.map(topic => getTopicProgress(topic.id));
} 