const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    options: { type: [String], required: true, validate: v => Array.isArray(v) && v.length >= 2 },
    correctIndex: { type: Number, required: true }
  },
  { _id: false }
);

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    language: { type: String, required: true, index: true },
    questions: { type: [QuestionSchema], required: true, validate: v => Array.isArray(v) && v.length > 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', QuizSchema);
