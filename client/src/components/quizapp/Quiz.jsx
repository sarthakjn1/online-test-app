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



  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/quiz/question/by-category/${categoryId}/`, {
        headers: {
          Authorization: `Bearer ${token}`, // JWT token
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        setQuizData(res.data);
        setTimeLeft(res.data.totalTime * 60); // dynamic time

      })
      .catch((err) => {
        console.error("Error fetching quiz data:", err);
      });
  }, [categoryId]);

  const handleSubmit = async () => {
    if (!quizData) return;

    // calculate score
    let finalScore = 0;
    quizData.questions.forEach((q) => {
      const selectedOptionId = answers[q.id];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      if (selectedOptionId === correctOption?.id) {
        finalScore++;
      }
    });

    setScore(finalScore);
    setResults(true);
    setShowPopup(true);
    setSubmitted(true);
    // const user = JSON.parse(localStorage.getItem("user"));

    // const userId = user?.user_id;
    const userId = JSON.parse(localStorage.getItem("user_id"));
    // Prepare JSON to send to backend
    const analyticsData = quizData.questions.map((q, index) => {
      const selectedOptionId = answers[q.id];
      const selectedOption = q.options.find((opt) => opt.id === selectedOptionId);
      const correctOption = q.options.find((opt) => opt.isCorrect);

      return {

        question_id: q.id,
        question_text: q.question_txt,
        selected_option: selectedOption ? selectedOption.option_text : null,
        correct_answer: correctOption.option_text,
        is_correct: selectedOptionId === correctOption.id,
        time_taken: questionTimes[index] || 0,
      };
    });
    const totalSeconds = analyticsData.reduce((acc, q) => acc + Number(q.time_taken || 0), 0);

    const category_id = parseInt(categoryId)
    const ExamManagement_payload = {
      user: userId,
      category: category_id,
      user_journey: analyticsData
    };


    await axios.post("http://127.0.0.1:8000/api/quiz/results/exam_journey/", ExamManagement_payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(async (res) => {
        const UsersresultPayload = {
          user: userId,
          exam: res.data.id,   // directly use exam_id
          category: category_id,
          total_marks: quizData.questions.length,
          score: finalScore,
          total_time: totalSeconds
        };

        const examJourneyData = res.data;
        const resultRes = await axios.post("http://127.0.0.1:8000/api/quiz/results/exam_result/", UsersresultPayload, {
          headers: {
            Authorization: `Bearer ${token}`, // JWT token
            "Content-Type": "application/json"
          }
        });
        return { examJourneyData, resultRes: resultRes.data };
      })
      .then(({ examJourneyData, resultRes }) => {
        navigate("/displayresult", {
          state: {
            quizData: quizData,
            user: examJourneyData.user_journey,
            exam: resultRes.exam,
            score: resultRes.score,
            total_marks: resultRes.total_marks
          }
        })
      })
      .catch((error) => {
        alert("Error saving the quiz")
      });


  };

  // Make handleSubmit stable
  const stableHandleSubmit = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (!hasSubmittedRef.current) {
            hasSubmittedRef.current = true; // mark as submitted
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


  // Save time per question
  useEffect(() => {
    return () => {
      const spent = Math.floor((Date.now() - startTime) / 1000);
      setQuestionTimes((prev) => ({
        ...prev,
        [currentQ]: (prev[currentQ] || 0) + spent,
      }));
    };
  }, [currentQ]);

  const handleAnswer = (qid, optionId) => {
    if (results) return;
    setAnswers((prev) => {
      if (prev[qid] === optionId) {
        const updated = { ...prev };
        delete updated[qid];
        return updated;
      }
      return { ...prev, [qid]: optionId };
    });
  };

  // calcuate total time 


  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
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
                [currentQ]: Math.floor((Date.now() - startTime) / 1000),
              }));
              setCurrentQ(index);
              setStartTime(Date.now());
            }}
          >
            {index + 1}
          </button>
        ))}

        {/*Final Score after submit */}
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
          Time Left: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
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
            const isCorrect = opt.isCorrect;

            if (results) {
              if (userAns === opt.id && isCorrect) className += " correct";
              else if (userAns === opt.id && !isCorrect) className += " wrong";
              else if (isCorrect) className += " correct";
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
