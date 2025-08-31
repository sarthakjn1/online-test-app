import React from "react";
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
  console.log("in ds quiz data", quizData)
  console.log("user journery", user)


  // Map user answers for quick lookup by question_id
  const userAnswers = {};
  if (user && Array.isArray(user)) {
    user.forEach((ans) => {
      console.log("ans.question_id", ans.question_id);
      userAnswers[ans.question_id] = ans;
    });
  }
  console.log("userAnswers", userAnswers)

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

      {quizData?.questions && quizData.questions.length > 0 ? (
        quizData.questions.map((q, idx) => {
          const userAns = userAnswers[q.id];
          console.log(userAns)

          const selectedAnswer = userAns?.selected_option || "Not Answered";
          const correctAnswer = userAns?.correct_answer || "N/A";
          console.log(selectedAnswer)
          console.log(correctAnswer)

          return (
            <div key={q.id} className="card shadow-sm p-4 mb-4 question-card">
              <h5>
                Q{idx + 1}. {q.question_txt}
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

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
};

export default DisplayResult;
