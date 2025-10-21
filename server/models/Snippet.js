const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    language: { type: String, required: true, index: true },
    code: { type: String, required: true },
    description: { type: String },
    author: { type: String, default: 'anonymous', index: true },
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Snippet', SnippetSchema);
