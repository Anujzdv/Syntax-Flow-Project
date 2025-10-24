import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Snippets from './pages/Snippets';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-brand">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">CricketConnect</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><NavLink className="nav-link" to="/quizzes">Quizzes</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/snippets">Snippets</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink></li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item"><NavLink className="nav-link" to="/signup">Sign up</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/login">Log in</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quizzes" element={<Quiz />} />
          <Route path="/snippets" element={<Snippets />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
