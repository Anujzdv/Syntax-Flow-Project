import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    api.get('/users/leaderboard')
      .then((res) => {
        if (!active) return;
        setUsers(res.data || []);
      })
      .catch(() => setError('Failed to load leaderboard'));
    return () => {
      active = false;
    };
  }, []);

  if (error) return <div style={{ color: 'crimson' }}>{error}</div>;

  return (
    <div>
      <h2>Leaderboard</h2>
      {users.length === 0 ? (
        <div>No users yet.</div>
      ) : (
        <ol>
          {users.map((u) => (
            <li key={u._id}>
              {u.username} — {u.points} pts
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
