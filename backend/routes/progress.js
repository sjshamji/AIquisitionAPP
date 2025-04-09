const express = require('express');
const router = express.Router();
const {
  getUserProgress,
  getUserProgressByTopic,
  addProgress,
  updateProgress
} = require('../controllers/progressController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect); // Protect all routes

router.route('/')
  .get(getUserProgress)
  .post(addProgress);

router.route('/:topic')
  .get(getUserProgressByTopic);

router.route('/:id')
  .put(updateProgress);

module.exports = router; 