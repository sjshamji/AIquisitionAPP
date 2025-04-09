const { db } = require('../config/firebase');

// @desc    Get all questions
// @route   GET /api/questions
// @access  Private
const getAllQuestions = async (req, res) => {
  try {
    const questionsSnapshot = await db.collection('questions').get();
    const questions = questionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(questions);
  } catch (error) {
    console.error('Get Questions Error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get questions by topic
// @route   GET /api/questions/:topic
// @access  Private
const getQuestionsByTopic = async (req, res) => {
  try {
    const questionsSnapshot = await db.collection('questions')
      .where('topic', '==', req.params.topic)
      .get();
    
    const questions = questionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(questions);
  } catch (error) {
    console.error('Get Questions By Topic Error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Add a new question
// @route   POST /api/questions
// @access  Private
const addQuestion = async (req, res) => {
  try {
    const questionData = {
      ...req.body,
      source: req.body.source || 'manual',
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('questions').add(questionData);
    const question = {
      id: docRef.id,
      ...questionData
    };
    
    res.status(201).json(question);
  } catch (error) {
    console.error('Add Question Error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Private
const updateQuestion = async (req, res) => {
  try {
    const questionRef = db.collection('questions').doc(req.params.id);
    const doc = await questionRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const question = doc.data();
    // Don't allow updating base questions
    if (question.source === 'base') {
      return res.status(403).json({ message: 'Cannot modify base questions' });
    }

    await questionRef.update(req.body);
    
    const updatedDoc = await questionRef.get();
    res.json({
      id: updatedDoc.id,
      ...updatedDoc.data()
    });
  } catch (error) {
    console.error('Update Question Error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Private
const deleteQuestion = async (req, res) => {
  try {
    const questionRef = db.collection('questions').doc(req.params.id);
    const doc = await questionRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const question = doc.data();
    // Don't allow deleting base questions
    if (question.source === 'base') {
      return res.status(403).json({ message: 'Cannot delete base questions' });
    }

    await questionRef.delete();
    res.json({ message: 'Question removed' });
  } catch (error) {
    console.error('Delete Question Error:', error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllQuestions,
  getQuestionsByTopic,
  addQuestion,
  updateQuestion,
  deleteQuestion
}; 