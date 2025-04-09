const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please provide the question text'],
    trim: true
  },
  modelAnswer: {
    type: String,
    required: [true, 'Please provide a model answer'],
    trim: true
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'open-ended'],
    required: true
  },
  topic: {
    type: String,
    required: [true, 'Please provide a topic'],
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  source: {
    type: String,
    enum: ['manual', 'generated', 'base'],
    default: 'base'
  },
  options: {
    type: [String],
    validate: {
      validator: function(v) {
        return this.type !== 'multiple-choice' || (Array.isArray(v) && v.length >= 2);
      },
      message: 'Multiple choice questions must have at least 2 options'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Question', questionSchema); 