export interface Question {
  id: string;
  topic: string;
  text: string;
  modelAnswer: string;
  type: 'multiple-choice' | 'text';
  options?: string[];
  explanation?: string;
  source?: 'base' | 'generated' | 'manual';
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  questions?: Question[];
}

export interface TopicProgress {
  topicId: string;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
}

export interface FeedbackResult {
  score: 'Strong' | 'Good' | 'Needs improvement';
  overallFeedback: string;
  categories: Array<{
    name: string;
    score: 'Strong' | 'Good' | 'Needs improvement';
    comment: string;
  }>;
}

export interface UserProgress {
  userId: string;
  topics: {
    [key: string]: {
      completedQuestions: number;
      correctQuestions: number;
      lastAccessed: Date;
    };
  };
  lastAccessed: Date;
}

export interface UserQuestion extends Omit<Question, 'id'> {
  id: string;
  userId: string;
  createdAt: Date;
  isCorrect?: boolean;
} 