import React from 'react';
import { NavLink } from 'react-router-dom';

const linkStyle = {
  marginRight: '12px',
  textDecoration: 'none',
  color: '#222',
  fontWeight: 600,
};

export default function Navbar() {
  return (
    <nav style={{ padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ fontWeight: 800, fontSize: 18, marginRight: 16 }}>SyntaxFlow</div>
      <NavLink to="/" style={linkStyle}>Home</NavLink>
      <NavLink to="/quiz" style={linkStyle}>Quiz</NavLink>
      <NavLink to="/snippets" style={linkStyle}>Snippets</NavLink>
      <NavLink to="/leaderboard" style={linkStyle}>Leaderboard</NavLink>
      <NavLink to="/profile" style={linkStyle}>Profile</NavLink>
    </nav>
  );
}
