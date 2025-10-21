import React, { useEffect, useState } from 'react';
import { quizApi } from '../services/api';

export default function Quiz() {
  const [language, setLanguage] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await quizApi.list({ language: language || undefined });
      setQuizzes(data);
    })();
  }, [language]);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setAnswers({});
    setScore(null);
  };

  const submitQuiz = () => {
    let s = 0;
    selectedQuiz.questions.forEach((q, idx) => {
      if (Number(answers[idx]) === q.correctIndex) s += 1;
    });
    setScore(s);
  };

  if (selectedQuiz) {
    return (
      <div>
        <button className="btn btn-link" onClick={() => setSelectedQuiz(null)}>&larr; Back</button>
        <h3>{selectedQuiz.title}</h3>
        {selectedQuiz.questions.map((q, idx) => (
          <div key={idx} className="card card-body mb-3">
            <strong>Q{idx + 1}. {q.prompt}</strong>
            {q.options.map((opt, i) => (
              <div className="form-check" key={i}>
                <input className="form-check-input" type="radio" name={`q-${idx}`} id={`q-${idx}-${i}`} onChange={() => setAnswers((a) => ({ ...a, [idx]: i }))} checked={Number(answers[idx]) === i} />
                <label className="form-check-label" htmlFor={`q-${idx}-${i}`}>{opt}</label>
              </div>
            ))}
          </div>
        ))}
        <button className="btn btn-primary" onClick={submitQuiz}>Submit</button>
        {score !== null && (
          <div className="alert alert-info mt-3">Score: {score} / {selectedQuiz.questions.length}</div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex gap-2 align-items-center mb-3">
        <h2 className="mb-0">Quizzes</h2>
        <select className="form-select w-auto" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">All Languages</option>
          {['C', 'C++', 'Python', 'Java', 'JavaScript'].map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>
      <div className="row g-3">
        {quizzes.map((q) => (
          <div className="col-md-4" key={q._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5>{q.title}</h5>
                <p className="text-muted">{q.language}</p>
                <button className="btn btn-outline-primary" onClick={() => startQuiz(q)}>Take Quiz</button>
              </div>
            </div>
          </div>
        ))}
        {!quizzes.length && <p>No quizzes found.</p>}
      </div>
    </div>
  );
}
