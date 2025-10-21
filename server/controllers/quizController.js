const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: 'failed to create quiz', details: err.message });
  }
};

exports.getQuizzes = async (req, res) => {
  try {
    const { language } = req.query;
    const filter = language ? { language } : {};
    const quizzes = await Quiz.find(filter).sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch quizzes', details: err.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ error: 'invalid id', details: err.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) return res.status(404).json({ error: 'quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ error: 'failed to update quiz', details: err.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'quiz not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'failed to delete quiz', details: err.message });
  }
};
