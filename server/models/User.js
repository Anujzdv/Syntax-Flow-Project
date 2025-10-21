const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // Password intentionally omitted for this scaffold; add hashed password when enabling auth
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
