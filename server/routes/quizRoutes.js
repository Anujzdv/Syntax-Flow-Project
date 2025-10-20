const express = require('express');
const Quiz = require('../models/Quiz');

const router = express.Router();

// GET / - fetch all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /submit - calculate score
router.post('/submit', async (req, res) => {
  try {
    const { answers = [] } = req.body;
    const quizzes = await Quiz.find();
    const questions = quizzes.flatMap((q) => q.questions || []);
    let score = 0;
    for (let i = 0; i < questions.length; i += 1) {
      const correct = questions[i]?.correctAnswer;
      if (typeof answers[i] === 'number' && answers[i] === correct) score += 1;
    }
    res.json({ score });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
