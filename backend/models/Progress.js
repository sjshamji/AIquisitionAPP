const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  userAnswer: {
    type: String,
    required: true,
    trim: true
  },
  aiFeedback: {
    score: {
      type: String,
      enum: ['Strong', 'Good', 'Needs improvement'],
      required: true
    },
    overallFeedback: {
      type: String,
      required: true
    },
    categories: [{
      name: String,
      score: {
        type: String,
        enum: ['Strong', 'Good', 'Needs improvement']
      },
      comment: String
    }]
  },
  status: {
    type: String,
    enum: ['correct', 'incorrect', 'needs review'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying of user progress
progressSchema.index({ userId: 1, questionId: 1 });

module.exports = mongoose.model('Progress', progressSchema); 