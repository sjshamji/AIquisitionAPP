export interface Question {
  id: string;
  text: string;
  modelAnswer: string;
  type: 'open-ended' | 'multiple-choice';
  topic: string;
  source?: 'manual' | 'generated';
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