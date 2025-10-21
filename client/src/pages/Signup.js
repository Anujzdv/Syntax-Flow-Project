import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '../services/api';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', { name, email });
      setMessage({ type: 'success', text: `Welcome, ${res.data.name}!` });
      setName('');
      setEmail('');
    } catch (err) {
      const text = err.response?.data?.message || err.message;
      setMessage({ type: 'danger', text });
    }
  };

  return (
    <>
      <h3>Signup</h3>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Button type="submit">Create Account</Button>
      </Form>
    </>
  );
}
