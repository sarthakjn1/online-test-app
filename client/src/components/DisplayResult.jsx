import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/displayResult.css";

const DisplayResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="text-center mt-5">
        ❌ No result data found. Please retake the exam.
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  const { quizData, user, score, total_marks } = state;

  // Map user answers for quick lookup
  const userAnswers = {};
  if (user && Array.isArray(user)) {
    user.forEach((ans) => {
      userAnswers[ans.question_id] = ans;
    });
  }

  // 🔹 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10; // show 10 per page

  // Calculate current page questions
  const indexOfLastQ = currentPage * questionsPerPage;
  const indexOfFirstQ = indexOfLastQ - questionsPerPage;
  const currentQuestions = quizData?.questions?.slice(indexOfFirstQ, indexOfLastQ);

  const totalPages = Math.ceil((quizData?.questions?.length || 0) / questionsPerPage);

  return (
    <div className="container-fluid mt-5">
      {/* Score Summary */}
      <div className="card shadow-lg p-4 mb-4 result-summary">
        <h2 className="text-center">📊 Exam Summary</h2>
        <hr />
        <h5 className="text-center">
          <strong>Score:</strong>{" "}
          <span className="text-success">{score}</span> / {total_marks}
        </h5>
      </div>

      <h3 className="mb-4 text-center">📝 Your Responses</h3>

      {currentQuestions && currentQuestions.length > 0 ? (
        currentQuestions.map((q, idx) => {
          const userAns = userAnswers[q.id];
          const selectedAnswer = userAns?.selected_option || "Not Answered";

          return (
            <div key={q.id} className="card shadow-sm p-4 mb-4 question-card">
              <h5>
                Q{indexOfFirstQ + idx + 1}. {q.question_txt}
              </h5>

              <ul className="list-group mt-3">
                {q.options.map((opt) => {
                  const isCorrect = opt.isCorrect;
                  const isUserSelected = userAns?.selected_option === opt.option_text;

                  // highlight logic
                  let itemClass = "";
                  if (isCorrect) itemClass = "list-group-item-success";
                  if (isUserSelected && !isCorrect) itemClass = "list-group-item-danger";

                  return (
                    <li key={opt.id} className={`list-group-item ${itemClass}`}>
                      {opt.option_text}
                      {isUserSelected && (
                        <span className="badge bg-primary ms-2">Your Choice</span>
                      )}
                      {isCorrect && (
                        <span className="badge bg-success ms-2">Correct</span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-3">
                <p>
                  <strong>Time Spent:</strong> {userAns?.time_taken || 0}s
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-muted">No questions available.</p>
      )}

      {/* 🔹 Pagination Controls */}
      <div className="d-flex justify-content-center align-items-center my-4">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          ⬅ Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary ms-2"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next ➡
        </button>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
};

export default DisplayResult;

