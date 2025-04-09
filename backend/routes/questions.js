const express = require('express');
const router = express.Router();
const {
  getAllQuestions,
  getQuestionsByTopic,
  addQuestion,
  updateQuestion,
  deleteQuestion
} = require('../controllers/questionController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect); // Protect all routes

router.route('/')
  .get(getAllQuestions)
  .post(addQuestion);

router.route('/:topic')
  .get(getQuestionsByTopic);

router.route('/:id')
  .put(updateQuestion)
  .delete(deleteQuestion);

module.exports = router; 