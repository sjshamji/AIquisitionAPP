export interface Question {
  id: string;
  text: string;
  modelAnswer: string;
  type: 'multiple-choice' | 'open-ended';
  topic: string;
  source?: 'manual' | 'generated' | 'base';
  options?: string[];
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
    [topicId: string]: {
      completedQuestions: string[];
      correctQuestions: string[];
      lastAccessed: Date;
    };
  };
  lastAccessed: Date;
}

export interface UserQuestion extends Question {
  userId: string;
  createdAt: Date;
  source: 'manual' | 'generated';
  isCorrect?: boolean;
} 