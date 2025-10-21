import React from 'react';
import { Card } from 'react-bootstrap';

export default function Home() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Welcome to SyntaxFlow</Card.Title>
        <Card.Text>
          Practice quizzes by language, share code snippets, and climb the leaderboard.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
