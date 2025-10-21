const User = require('../models/User');

// NOTE: Basic, non-authenticated endpoints. No JWT or password storage here.
exports.signup = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'name and email are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const user = await User.create({ name, email });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // No session/JWT. In real app, issue JWT here
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.leaderboard = async (_req, res) => {
  try {
    const top = await User.find().sort({ score: -1 }).limit(10).select('name email score');
    return res.json(top);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
