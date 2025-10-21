const User = require('../models/User');

// NOTE: Auth is intentionally unauthenticated for now.
// Endpoints create/find users without passwords so we can wire the UI.

exports.signup = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username) return res.status(400).json({ error: 'username is required' });

    const existing = await User.findOne({ username });
    if (existing) return res.status(200).json(existing); // idempotent create for ease of demo

    const user = await User.create({ username, email });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: 'failed to signup', details: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'username is required' });

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'user not found' });

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'failed to login', details: err.message });
  }
};
