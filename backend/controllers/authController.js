const { auth, db } = require('../config/firebase');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name
    });

    // Create user document in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({
      id: userRecord.uid,
      name: userRecord.displayName,
      email: userRecord.email
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.id).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: req.user.id,
      ...userDoc.data()
    });
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  getMe
}; 