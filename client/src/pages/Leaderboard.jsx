import React, { useEffect, useState } from 'react';
import { leaderboardApi } from '../services/api';

export default function Leaderboard() {
  const [data, setData] = useState({ users: [], snippets: [] });

  useEffect(() => {
    (async () => {
      const res = await leaderboardApi.get();
      setData(res);
    })();
  }, []);

  return (
    <div className="row g-4">
      <div className="col-md-6">
        <h3>Top Users</h3>
        <ul className="list-group">
          {data.users.map((u) => (
            <li key={u._id} className="list-group-item d-flex justify-content-between">
              <span>{u.username}</span>
              <span className="badge bg-primary rounded-pill">{u.score}</span>
            </li>
          ))}
          {!data.users.length && <li className="list-group-item">No users yet.</li>}
        </ul>
      </div>
      <div className="col-md-6">
        <h3>Top Snippets</h3>
        <ul className="list-group">
          {data.snippets.map((s) => (
            <li key={s._id} className="list-group-item d-flex justify-content-between">
              <span>{s.title} <small className="text-muted">({s.language})</small></span>
              <span className="badge bg-success rounded-pill">{s.likes}</span>
            </li>
          ))}
          {!data.snippets.length && <li className="list-group-item">No snippets yet.</li>}
        </ul>
      </div>
    </div>
  );
}
