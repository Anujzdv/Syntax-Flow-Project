const express = require('express');
const router = express.Router();
const { createSnippet, getSnippets, likeSnippet } = require('../controllers/snippetController');

router.get('/', getSnippets);
router.post('/', createSnippet);
router.post('/:id/like', likeSnippet);

module.exports = router;
