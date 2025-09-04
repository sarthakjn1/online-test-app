import React from "react";

const OverallStats = ({ overallStats }) => {
  return (
    <div className="row">
      <div className="col-md-4 mb-3">
        <div className="card shadow-sm">
          <div className="card-body text-center">
            <h5 className="card-title">Total Quizzes</h5>
            <p className="display-6">{overallStats.total_quizzes}</p>
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="card shadow-sm">
          <div className="card-body text-center">
            <h5 className="card-title">Active Users (Last 7 Days)</h5>
            <p className="display-6">{overallStats.active_users_last_7_days}</p>
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="card shadow-sm">
          <div className="card-body text-center">
            <h5 className="card-title">Average Score (%)</h5>
            <p className="display-6">{Math.round(overallStats.avg_score, 2)}</p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default OverallStats;
