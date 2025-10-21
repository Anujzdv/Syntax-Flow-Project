import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Snippets from './pages/Snippets';
import Leaderboard from './pages/Leaderboard';

export default function App() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">SyntaxFlow</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/quizzes">Quizzes</Nav.Link>
              <Nav.Link as={Link} to="/snippets">Snippets</Nav.Link>
              <Nav.Link as={Link} to="/leaderboard">Leaderboard</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quizzes" element={<Quiz />} />
          <Route path="/snippets" element={<Snippets />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Container>
    </>
  );
}
