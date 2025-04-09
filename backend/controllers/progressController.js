const { db } = require('../config/firebase');

// @desc    Get user's progress
// @route   GET /api/progress
// @access  Private
const getUserProgress = async (req, res) => {
  try {
    const progressSnapshot = await db.collection('progress')
      .where('userId', '==', req.user.id)
      .orderBy('createdAt', 'desc')
      .get();

    const progressPromises = progressSnapshot.docs.map(async doc => {
      const questionDoc = await db.collection('questions').doc(doc.data().questionId).get();
      return {
        id: doc.id,
        ...doc.data(),
        question: questionDoc.exists ? { id: questionDoc.id, ...questionDoc.data() } : null
      };
    });

    const progress = await Promise.all(progressPromises);
    res.json(progress);
  } catch (error) {
    console.error('Get Progress Error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user's progress by topic
// @route   GET /api/progress/:topic
// @access  Private
const getUserProgressByTopic = async (req, res) => {
  try {
    // First get all questions for the topic
    const questionsSnapshot = await db.collection('questions')
      .where('topic', '==', req.params.topic)
      .get();
    
    const questionIds = questionsSnapshot.docs.map(doc => doc.id);

    // Then get progress for these questions
    const progressSnapshot = await db.collection('progress')
      .where('userId', '==', req.user.id)
      .where('questionId', 'in', questionIds)
      .orderBy('createdAt', 'desc')
      .get();

    const progressPromises = progressSnapshot.docs.map(async doc => {
      const questionDoc = await db.collection('questions').doc(doc.data().questionId).get();
      return {
        id: doc.id,
        ...doc.data(),
        question: questionDoc.exists ? { id: questionDoc.id, ...questionDoc.data() } : null
      };
    });

    const progress = await Promise.all(progressPromises);
    res.json(progress);
  } catch (error) {
    console.error('Get Progress By Topic Error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Add progress entry
// @route   POST /api/progress
// @access  Private
const addProgress = async (req, res) => {
  try {
    const progressData = {
      ...req.body,
      userId: req.user.id,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('progress').add(progressData);
    
    // Get the question data
    const questionDoc = await db.collection('questions').doc(progressData.questionId).get();
    
    const progress = {
      id: docRef.id,
      ...progressData,
      question: questionDoc.exists ? { id: questionDoc.id, ...questionDoc.data() } : null
    };
    
    res.status(201).json(progress);
  } catch (error) {
    console.error('Add Progress Error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update progress entry
// @route   PUT /api/progress/:id
// @access  Private
const updateProgress = async (req, res) => {
  try {
    const progressRef = db.collection('progress').doc(req.params.id);
    const doc = await progressRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }

    const progress = doc.data();
    // Check if the progress entry belongs to the user
    if (progress.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this progress entry' });
    }

    await progressRef.update(req.body);
    
    const updatedDoc = await progressRef.get();
    const questionDoc = await db.collection('questions').doc(updatedDoc.data().questionId).get();
    
    res.json({
      id: updatedDoc.id,
      ...updatedDoc.data(),
      question: questionDoc.exists ? { id: questionDoc.id, ...questionDoc.data() } : null
    });
  } catch (error) {
    console.error('Update Progress Error:', error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUserProgress,
  getUserProgressByTopic,
  addProgress,
  updateProgress
}; 