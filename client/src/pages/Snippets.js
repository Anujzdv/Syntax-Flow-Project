import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import api from '../services/api';

export default function Snippets() {
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [code, setCode] = useState('');

  const loadSnippets = async () => {
    const res = await api.get('/snippets');
    setSnippets(res.data);
  };

  useEffect(() => {
    loadSnippets();
  }, []);

  const createSnippet = async (e) => {
    e.preventDefault();
    await api.post('/snippets', { title, language, code, author: 'Anonymous' });
    setTitle('');
    setCode('');
    loadSnippets();
  };

  const like = async (id) => {
    await api.post(`/snippets/${id}/like`);
    loadSnippets();
  };

  return (
    <>
      <h3>Snippets</h3>
      <Form onSubmit={createSnippet} className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Control placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Col>
          <Col md={3}>
            <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option>JavaScript</option>
              <option>Python</option>
              <option>Java</option>
              <option>C</option>
              <option>C++</option>
            </Form.Select>
          </Col>
          <Col md={5} className="mt-2 mt-md-0">
            <Form.Control as="textarea" rows={1} placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} required />
          </Col>
        </Row>
        <Button type="submit" className="mt-2">Create</Button>
      </Form>

      <Row>
        {snippets.map((s) => (
          <Col md={6} key={s._id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{s.title} <small className="text-muted">({s.language})</small></Card.Title>
                <pre className="bg-light p-2"><code>{s.code}</code></pre>
                <Button size="sm" onClick={() => like(s._id)}>Like ({s.likes})</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
