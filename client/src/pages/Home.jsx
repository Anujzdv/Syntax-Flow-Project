import React from 'react';

export default function Home() {
  return (
    <div className="container py-3">
      <section className="hero mb-4">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <span className="badge-accent mb-3">Live cricket insights</span>
            <h1 className="display-5 mb-2">CricketConnect</h1>
            <p className="lead mb-4">Track matches, compete in quizzes, and connect with fans.</p>
            <div className="d-flex gap-2">
              <a href="#quizzes" className="btn btn-brand btn-lg">Take a Quiz</a>
              <a href="#leaderboard" className="btn btn-accent btn-lg">View Leaderboard</a>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card shadow-md">
              <div className="card-body">
                <h5 className="card-title mb-2">Next Match</h5>
                <p className="text-muted-2 mb-3">IND vs AUS • ODI • Today 7:30 PM</p>
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="fw-semibold">India</div>
                    <div className="text-muted-2">Win Prob. 58%</div>
                  </div>
                  <div>
                    <div className="fw-semibold">Australia</div>
                    <div className="text-muted-2">Win Prob. 42%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mt-4">
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Quizzes</h5>
                <p className="card-text text-muted-2">Test your cricket knowledge and climb ranks.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Snippets</h5>
                <p className="card-text text-muted-2">Share analysis and bite-sized stats with the community.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Leaderboard</h5>
                <p className="card-text text-muted-2">See the top performers and your standings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
