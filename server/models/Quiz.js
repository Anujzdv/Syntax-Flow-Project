const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctIndex: { type: Number, required: true },
  },
  { _id: false }
);

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    language: { type: String, required: true, index: true },
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', QuizSchema);
