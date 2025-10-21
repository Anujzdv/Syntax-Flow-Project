const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const snippetRoutes = require('./routes/snippetRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/snippets', snippetRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Mongo connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/syntaxflow';
mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
