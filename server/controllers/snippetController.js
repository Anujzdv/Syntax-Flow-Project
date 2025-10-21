const Snippet = require('../models/Snippet');
const User = require('../models/User');

exports.createSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.create(req.body);
    res.status(201).json(snippet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.likeSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });

    // Optional: increment a user's score based on likes
    const { userId } = req.body || {};
    if (userId) {
      await User.findByIdAndUpdate(userId, { $inc: { score: 1 } });
    }

    res.json(snippet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.leaderboard = async (_req, res) => {
  try {
    // Aggregate by total likes on snippets and user score, basic version
    const snippetsTop = await Snippet.aggregate([
      { $group: { _id: '$author', totalLikes: { $sum: '$likes' } } },
      { $sort: { totalLikes: -1 } },
      { $limit: 10 },
    ]);

    res.json({ snippetsTop });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
