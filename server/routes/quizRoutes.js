const express = require('express');
const router = express.Router();
const { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz } = require('../controllers/quizController');

router.get('/', getQuizzes);
router.post('/', createQuiz);
router.get('/:id', getQuizById);
router.put('/:id', updateQuiz);
router.delete('/:id', deleteQuiz);

module.exports = router;
