import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import api from '../services/api';

export default function Quiz() {
  const [language, setLanguage] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const fetchQuizzes = async () => {
    const res = await api.get('/quizzes', { params: { language } });
    setQuizzes(res.data);
  };

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleTakeQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setAnswers({});
    setResult(null);
  };

  const gradeQuiz = () => {
    if (!selectedQuiz) return;
    let score = 0;
    selectedQuiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) score += 1;
    });
    setResult({ score, total: selectedQuiz.questions.length });
  };

  return (
    <>
      <h3>Quizzes</h3>
      <Form className="mb-3">
        <Form.Label>Filter by Language</Form.Label>
        <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">All</option>
          <option>C</option>
          <option>C++</option>
          <option>Python</option>
          <option>Java</option>
          <option>JavaScript</option>
        </Form.Select>
      </Form>

      {!selectedQuiz && (
        <Row>
          {quizzes.map((q) => (
            <Col md={6} lg={4} className="mb-3" key={q._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{q.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{q.language}</Card.Subtitle>
                  <Button onClick={() => handleTakeQuiz(q)}>Take Quiz</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {selectedQuiz && (
        <Card>
          <Card.Body>
            <Card.Title>{selectedQuiz.title}</Card.Title>
            {selectedQuiz.questions.map((question, idx) => (
              <div className="mb-3" key={idx}>
                <strong>Q{idx + 1}. {question.prompt}</strong>
                {question.options.map((opt, oIdx) => (
                  <Form.Check
                    key={oIdx}
                    type="radio"
                    id={`q-${idx}-o-${oIdx}`}
                    name={`q-${idx}`}
                    label={opt}
                    checked={answers[idx] === oIdx}
                    onChange={() => setAnswers({ ...answers, [idx]: oIdx })}
                  />
                ))}
              </div>
            ))}
            <Button onClick={gradeQuiz}>Submit</Button>{' '}
            <Button variant="secondary" onClick={() => setSelectedQuiz(null)}>Back</Button>
            {result && (
              <Alert variant="info" className="mt-3">
                You scored {result.score} / {result.total}
              </Alert>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
}
