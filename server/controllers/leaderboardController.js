const Snippet = require('../models/Snippet');
const User = require('../models/User');

// A simple leaderboard combining user scores and top liked snippets
exports.getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find().sort({ score: -1, createdAt: 1 }).limit(10).select('username score');

    const topSnippets = await Snippet.find().sort({ likes: -1, createdAt: 1 }).limit(10).select('title language likes author');

    res.json({ users: topUsers, snippets: topSnippets });
  } catch (err) {
    res.status(500).json({ error: 'failed to build leaderboard', details: err.message });
  }
};
