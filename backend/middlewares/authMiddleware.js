const { auth } = require('../config/firebase');

const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    try {
      // Verify token with Firebase Auth
      const decodedToken = await auth.verifyIdToken(token);
      
      // Get user from Firebase Auth
      const user = await auth.getUser(decodedToken.uid);
      
      // Add user info to request
      req.user = {
        id: user.uid,
        email: user.email,
        name: user.displayName
      };
      
      next();
    } catch (error) {
      console.error('Auth Error:', error);
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { protect }; 