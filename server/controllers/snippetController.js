const Snippet = require('../models/Snippet');

exports.createSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.create(req.body);
    res.status(201).json(snippet);
  } catch (err) {
    res.status(400).json({ error: 'failed to create snippet', details: err.message });
  }
};

exports.getSnippets = async (req, res) => {
  try {
    const { language } = req.query;
    const filter = language ? { language } : {};
    const snippets = await Snippet.find(filter).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch snippets', details: err.message });
  }
};

exports.likeSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Snippet.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    if (!updated) return res.status(404).json({ error: 'snippet not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'failed to like snippet', details: err.message });
  }
};
