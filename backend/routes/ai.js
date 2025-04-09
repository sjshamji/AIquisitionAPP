const express = require('express');
const router = express.Router();
const {
  getAIFeedback,
  generateQuestion
} = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect); // Protect all routes

router.post('/feedback', getAIFeedback);
router.post('/generate', generateQuestion);

module.exports = router; 