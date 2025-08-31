import React from "react";

const CategoryAttemptsTable = ({ data }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Category Attempts</h5>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Average Score</th>
              <th scope="col">Attempts</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cat) => (
              <tr key={cat.category_id}>
                <td>{cat.category_name}</td>
                <td>{cat.avg_score}</td>
                <td>{cat.attempts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryAttemptsTable;
