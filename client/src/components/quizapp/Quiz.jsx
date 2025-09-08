import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/quiz.css";

const Quiz = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [quizData, setQuizData] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [results, setResults] = useState(false);
  const [questionTimes, setQuestionTimes] = useState({});
  const [startTime, setStartTime] = useState(Date.now());
  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const intervalRef = useRef();
  const hasSubmittedRef = useRef(false);
  const token = localStorage.getItem("token");

  // Fetch questions
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/quiz/question/by-category/${categoryId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        setQuizData(res.data);
        setTimeLeft(res.data.totalTime * 60); // totalTime in minutes -> seconds
      })
      .catch((err) => {
        console.error("Error fetching quiz data:", err);
      });
  }, [categoryId]);
  
  useEffect(() => {
    if (sessionStorage.getItem("quizCompleted") === "true") {
      navigate("/", { replace: true }); // redirect if quiz already completed
    }
  }, [navigate]);

  useEffect(() => {
    // Prevent accidental reload/close
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Required for Chrome
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Prevent back navigation
    const handlePopState = (event) => {
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Submit quiz
  const handleSubmit = async () => {
    if (!quizData) return;

    const userId = JSON.parse(localStorage.getItem("user_id"));
    const category_id = parseInt(categoryId);

    // Prepare user_journey payload
    const analyticsData = quizData.questions.map((q, index) => ({
      question_id: q.id,
      selected_option_id: answers[q.id] || null,
      time_taken: questionTimes[index] || 0
    }));

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/quiz/results/exam_journey/",
        {
          user: userId,
          category: category_id,
          user_journey: analyticsData
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      const result = res.data;

      setScore(result.score);
      setResults(true);
      setShowPopup(true);
      setSubmitted(true);

      // Navigate to result page
      sessionStorage.setItem("quizCompleted", "true");
      navigate("/displayresult", {
        state: {
          user: result.user,
          exam_id: result.exam_id,
          categoryId: result.categoryId,
          score: result.score,
          total_marks: result.total_marks,
          total_time: result.total_time,
          quizData: result.quizData
        }, replace: true
      });
    } catch (error) {
      console.error("Error submitting the quiz:", error);
      alert("Error saving the quiz");
    }
  };

  // Make handleSubmit stable
  const stableHandleSubmit = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  // Timer countdown
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (!hasSubmittedRef.current) {
            hasSubmittedRef.current = true;
            clearInterval(intervalRef.current);
            handleSubmit();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [handleSubmit]);

  // Track time spent per question
  useEffect(() => {
    return () => {
      const spent = Math.floor((Date.now() - startTime) / 1000);
      setQuestionTimes((prev) => ({
        ...prev,
        [currentQ]: (prev[currentQ] || 0) + spent
      }));
    };
  }, [currentQ]);

  const handleAnswer = (qid, optionId) => {
    if (results) return;
    setAnswers((prev) => ({
      ...prev,
      [qid]: optionId
    }));
  };

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  }

  if (!quizData) {
    return <div>Loading quiz...</div>;
  }

  const q = quizData.questions[currentQ];

  return (
    <div className="quiz-page">
      {/* Sidebar */}
      <div className="sidebar">
        {quizData.questions.map((_, index) => (
          <button
            key={index}
            className={`
              ${currentQ === index ? "active" : ""}
              ${answers[quizData.questions[index].id] ? "answered" : ""}
            `}
            onClick={() => {
              setQuestionTimes((prev) => ({
                ...prev,
                [currentQ]: Math.floor((Date.now() - startTime) / 1000)
              }));
              setCurrentQ(index);
              setStartTime(Date.now());
            }}
          >
            {index + 1}
          </button>
        ))}

        {/* Score after submit */}
        {submitted && (
          <div>
            <hr />
            Score: {score} / {quizData.questions.length}
          </div>
        )}
      </div>

      {/* Main quiz area */}
      <div className="quiz-container">
        <div className="timer text-end fw-bold" style={{ color: "crimson" }}>
          Time Left: {formatTime(timeLeft)}
        </div>
        <h2>Category: {quizData.category_title.toUpperCase()}</h2>
        <br />
        <h3>
          Q{currentQ + 1}. {q.question_txt}
        </h3>
        <div className="options mt-3">
          {q.options.map((opt) => {
            let className = "option";
            const userAns = answers[q.id];

            if (results) {
              // Show selected option
              if (userAns === opt.id) className += " selected";
            } else {
              if (userAns === opt.id) className += " selected";
            }

            return (
              <div
                key={opt.id}
                className={className}
                onClick={() => handleAnswer(q.id, opt.id)}
              >
                {opt.option_text}
              </div>
            );
          })}
        </div>

        <div className="quiz-footer">
          {!results ? (
            <>
              <button
                className="prev-btn"
                disabled={currentQ === 0}
                onClick={() => setCurrentQ(currentQ - 1)}
              >
                Previous
              </button>
              {currentQ < quizData.questions.length - 1 ? (
                <button
                  className="next-btn"
                  onClick={() => setCurrentQ(currentQ + 1)}
                >
                  Next
                </button>
              ) : (
                <button className="next-btn submit-btn" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Go Home
            </button>
          )}
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Test submitted successfully</h2>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
