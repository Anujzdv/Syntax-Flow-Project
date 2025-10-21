const router = require('express').Router();
const { createSnippet, getSnippets, likeSnippet, leaderboard } = require('../controllers/snippetController');

router.post('/', createSnippet);
router.get('/', getSnippets);
router.post('/:id/like', likeSnippet);
router.get('/leaderboard', leaderboard);

module.exports = router;
