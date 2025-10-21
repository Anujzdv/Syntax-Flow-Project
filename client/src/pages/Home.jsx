import React from 'react';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="display-5">Welcome to SyntaxFlow</h1>
      <p className="lead">Practice quizzes, share snippets, climb the leaderboard.</p>
      <div className="row g-3 mt-4">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Quizzes</h5>
              <p className="card-text">Test your knowledge across languages.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Snippets</h5>
              <p className="card-text">Save and like useful code snippets.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Leaderboard</h5>
              <p className="card-text">See top users and snippets.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
