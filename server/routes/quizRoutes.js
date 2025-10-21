const router = require('express').Router();
const { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz } = require('../controllers/quizController');

router.post('/', createQuiz);
router.get('/', getQuizzes);
router.get('/:id', getQuizById);
router.put('/:id', updateQuiz);
router.delete('/:id', deleteQuiz);

module.exports = router;
