const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    user: { type: String, default: 'Anon' },
    text: { type: String, required: true },
  },
  { _id: false, timestamps: true }
);

const snippetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    code: { type: String, required: true },
    caption: { type: String, default: '' },
    likes: { type: Number, default: 0 },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Snippet', snippetSchema);
