const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    language: { type: String, required: true, index: true },
    code: { type: String, required: true },
    likes: { type: Number, default: 0 },
    author: { type: String, default: 'Anonymous' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Snippet', SnippetSchema);
