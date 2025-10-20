import React, { useState } from 'react';
import api from '../api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', form);
      const token = res.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        setMessage('Logged in');
      } else {
        setMessage('Login failed');
      }
    } catch (e) {
      setMessage('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <input placeholder="Email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
        </div>
        <div>
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}
