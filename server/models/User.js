const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, trim: true },
    // Basic score to support leaderboard; can be expanded later
    score: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
