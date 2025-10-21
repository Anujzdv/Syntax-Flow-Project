import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email });
      setMessage({ type: 'success', text: `Logged in as ${res.data.name}` });
      setEmail('');
    } catch (err) {
      const text = err.response?.data?.message || err.message;
      setMessage({ type: 'danger', text });
    }
  };

  return (
    <>
      <h3>Login</h3>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </>
  );
}
