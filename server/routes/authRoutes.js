const router = require('express').Router();
const { signup, login, leaderboard } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/leaderboard', leaderboard);

module.exports = router;
