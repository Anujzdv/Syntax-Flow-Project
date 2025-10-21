import React, { useState } from 'react';
import { authApi } from '../services/api';

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '' });
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await authApi.signup(form);
      setUser(res);
    } catch (err) {
      setError(err?.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Signup</h2>
        <form onSubmit={submit} className="card card-body">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input name="username" className="form-control" value={form.username} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email (optional)</label>
            <input type="email" name="email" className="form-control" value={form.email} onChange={onChange} />
          </div>
          <button className="btn btn-primary">Create</button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {user && <div className="alert alert-success mt-3">Created user: {user.username}</div>}
        </form>
      </div>
    </div>
  );
}
