const express = require('express');
const Snippet = require('../models/Snippet');
const jwt = require('jsonwebtoken');

const router = express.Router();

function authOptional(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (token) {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    } catch (_) {
      // ignore invalid token for optional auth
    }
  }
  next();
}

function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// GET / - all snippets
router.get('/', async (req, res) => {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    res.json(snippets);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /add - add new snippet (auth optional for now)
router.post('/add', authOptional, async (req, res) => {
  try {
    const { code, caption } = req.body;
    if (!code) return res.status(400).json({ message: 'Code required' });
    const snippet = await Snippet.create({ code, caption, userId: req.user?.id });
    res.status(201).json(snippet);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /like/:id - like a snippet
router.post('/like/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    if (!snippet) return res.status(404).json({ message: 'Not found' });
    res.json(snippet);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /comment/:id - add a comment
router.post('/comment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Text required' });
    const snippet = await Snippet.findById(id);
    if (!snippet) return res.status(404).json({ message: 'Not found' });
    snippet.comments.push({ user: 'Anon', text });
    await snippet.save();
    res.json(snippet);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
