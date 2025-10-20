import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './components/Quiz';
import Leaderboard from './components/Leaderboard';
import SnippetFeed from './components/SnippetFeed';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '16px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/snippets" element={<SnippetFeed />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
