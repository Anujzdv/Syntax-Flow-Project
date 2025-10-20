import React, { useEffect, useMemo, useState } from 'react';
import api from '../api';

export default function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api.get('/quizzes')
      .then((res) => {
        if (!isMounted) return;
        setQuizzes(res.data || []);
      })
      .catch(() => setError('Failed to load quizzes'))
      .finally(() => setLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  const questions = useMemo(() => {
    if (!quizzes || quizzes.length === 0) return [];
    // Flatten questions from all quizzes for simplicity
    return quizzes.flatMap((q) => q.questions || []);
  }, [quizzes]);

  const handleSelect = (qIdx, optIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answers = questions.map((_, idx) => (selectedAnswers[idx] ?? null));
    try {
      const res = await api.post('/quizzes/submit', { answers });
      setScore(res.data?.score ?? 0);
    } catch (err) {
      setError('Failed to submit answers');
    }
  };

  if (loading) return <div>Loading quiz…</div>;
  if (error) return <div style={{ color: 'crimson' }}>{error}</div>;
  if (questions.length === 0) return <div>No quizzes available yet.</div>;

  return (
    <div>
      <h2>Quiz</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, qIdx) => (
          <div key={qIdx} style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>{q.question}</div>
            <div>
              {(q.options || []).map((opt, optIdx) => (
                <label key={optIdx} style={{ display: 'block', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name={`q-${qIdx}`}
                    checked={selectedAnswers[qIdx] === optIdx}
                    onChange={() => handleSelect(qIdx, optIdx)}
                  />{' '}
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {score !== null && (
        <div style={{ marginTop: 16 }}>
          <strong>Your score:</strong> {score}/{questions.length}
        </div>
      )}
    </div>
  );
}
