import React, { useState } from 'react';
import { authApi } from '../services/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await authApi.login({ username });
      setUser(res);
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Login</h2>
        <form onSubmit={submit} className="card card-body">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <button className="btn btn-primary">Login</button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {user && <div className="alert alert-success mt-3">Welcome back: {user.username}</div>}
        </form>
      </div>
    </div>
  );
}
