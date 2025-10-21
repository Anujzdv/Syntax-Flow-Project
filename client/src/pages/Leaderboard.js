import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Card } from 'react-bootstrap';
import api from '../services/api';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [snippetsTop, setSnippetsTop] = useState([]);

  useEffect(() => {
    async function load() {
      const [u, s] = await Promise.all([
        api.get('/auth/leaderboard'),
        api.get('/snippets/leaderboard'),
      ]);
      setUsers(u.data);
      setSnippetsTop(s.data.snippetsTop || []);
    }
    load();
  }, []);

  return (
    <>
      <h3>Leaderboard</h3>
      <Row>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>User Scores</Card.Title>
              <Table striped size="sm">
                <thead>
                  <tr><th>#</th><th>Name</th><th>Score</th></tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <tr key={u._id}><td>{idx+1}</td><td>{u.name}</td><td>{u.score}</td></tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Top Snippet Authors (by likes)</Card.Title>
              <Table striped size="sm">
                <thead>
                  <tr><th>#</th><th>Author</th><th>Total Likes</th></tr>
                </thead>
                <tbody>
                  {snippetsTop.map((s, idx) => (
                    <tr key={idx}><td>{idx+1}</td><td>{s._id || 'Unknown'}</td><td>{s.totalLikes}</td></tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
