import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/quiz.css";

// ✅ KEEPING your exact dummyQuiz untouched
const dummyQuiz = {
  category_id: 1,
  category_title: "JavaScript",
  totalTime: 60, // mins
  totalQuestions: 35,
  questions: [
    {
      id: 1,
      question_txt: "console.log(1 + '2' + '2');",
      options: [
        { id: 17, option_text: "32", isCorrect: false },
        { id: 18, option_text: "122", isCorrect: true },
        { id: 19, option_text: "14", isCorrect: false },
        { id: 20, option_text: "NaN", isCorrect: false },
      ],
    },
    {
      id: 2,
      question_txt: "Which of the following is NOT a JavaScript data type?",
      options: [
        { id: 5, option_text: "Number", isCorrect: false },
        { id: 6, option_text: "Boolean", isCorrect: false },
        { id: 7, option_text: "Character", isCorrect: true },
        { id: 8, option_text: "Undefined", isCorrect: false },
      ],
    },
    {
      id: 3,
      question_txt: "Which of the following statements is true about let and var?",
      options: [
        { id: 13, option_text: "var has block scope, let has function scope", isCorrect: false },
        { id: 14, option_text: "var and let both have block scope", isCorrect: false },
        { id: 15, option_text: "let has block scope, var has function scope", isCorrect: true },
        { id: 16, option_text: "Both are the same", isCorrect: false },
      ],
    },
    {
      id: 4,
      question_txt: "What is the value of x after execution? let x = 0; x ||= 5;",
      options: [
        { id: 9, option_text: "0", isCorrect: false },
        { id: 10, option_text: "5", isCorrect: true },
        { id: 11, option_text: "undefined", isCorrect: false },
        { id: 12, option_text: "false", isCorrect: false },
      ],
    },
    {
      id: 5,
      question_txt: "What does === operator do in JavaScript?",
      options: [
        { id: 21, option_text: "Compares values and data types", isCorrect: true },
        { id: 22, option_text: "Converts operands before comparing", isCorrect: false },
        { id: 23, option_text: "Checks for reference equality only", isCorrect: false },
        { id: 24, option_text: "Compares only values", isCorrect: false },
      ],
    },
    {
    id: 6,
    question_txt: "What is JSX in React?",
    options: [
      { id: 25, option_text: "A templating engine", isCorrect: false },
      { id: 26, option_text: "A syntax extension for JavaScript", isCorrect: true },
      { id: 27, option_text: "A new programming language", isCorrect: false },
      { id: 28, option_text: "A CSS preprocessor", isCorrect: false },
    ],
  },
  {
    id: 7,
    question_txt: "Which hook is used for side effects in React?",
    options: [
      { id: 29, option_text: "useEffect", isCorrect: true },
      { id: 30, option_text: "useState", isCorrect: false },
      { id: 31, option_text: "useContext", isCorrect: false },
      { id: 32, option_text: "useReducer", isCorrect: false },
    ],
  },
  {
    id: 8,
    question_txt: "What is the default behavior of useState when updating state?",
    options: [
      { id: 33, option_text: "It merges new state with old state", isCorrect: false },
      { id: 34, option_text: "It replaces the old state", isCorrect: true },
      { id: 35, option_text: "It ignores state changes", isCorrect: false },
      { id: 36, option_text: "It updates asynchronously only", isCorrect: false },
    ],
  },
  {
    id: 9,
    question_txt: "Which method is used to render React elements into the DOM?",
    options: [
      { id: 37, option_text: "React.render()", isCorrect: false },
      { id: 38, option_text: "ReactDOM.render()", isCorrect: true },
      { id: 39, option_text: "renderReact()", isCorrect: false },
      { id: 40, option_text: "DOM.renderReact()", isCorrect: false },
    ],
  },
  {
    id: 10,
    question_txt: "What is the purpose of useMemo hook?",
    options: [
      { id: 41, option_text: "To memoize expensive calculations", isCorrect: true },
      { id: 42, option_text: "To manage side effects", isCorrect: false },
      { id: 43, option_text: "To optimize rendering by caching components", isCorrect: false },
      { id: 44, option_text: "To store local variables", isCorrect: false },
    ],
  },
  {
    id: 11,
    question_txt: "Which of the following is TRUE about React keys?",
    options: [
      { id: 45, option_text: "Keys must be globally unique", isCorrect: false },
      { id: 46, option_text: "Keys help React identify elements in a list", isCorrect: true },
      { id: 47, option_text: "Keys are optional in lists", isCorrect: false },
      { id: 48, option_text: "Keys should always be random numbers", isCorrect: false },
    ],
  },
  {
    id: 12,
    question_txt: "What will happen if you update state directly without setState/useState?",
    options: [
      { id: 49, option_text: "Component will still re-render", isCorrect: false },
      { id: 50, option_text: "React will throw an error", isCorrect: false },
      { id: 51, option_text: "UI will not update", isCorrect: true },
      { id: 52, option_text: "Nothing will happen", isCorrect: false },
    ],
  },
  {
    id: 13,
    question_txt: "What does React.StrictMode do?",
    options: [
      { id: 53, option_text: "Prevents rendering of components", isCorrect: false },
      { id: 54, option_text: "Highlights potential problems in an application", isCorrect: true },
      { id: 55, option_text: "Optimizes bundle size", isCorrect: false },
      { id: 56, option_text: "Handles async errors", isCorrect: false },
    ],
  },
  {
    id: 14,
    question_txt: "Which hook would you use to share data across multiple components without prop drilling?",
    options: [
      { id: 57, option_text: "useReducer", isCorrect: false },
      { id: 58, option_text: "useEffect", isCorrect: false },
      { id: 59, option_text: "useContext", isCorrect: true },
      { id: 60, option_text: "useMemo", isCorrect: false },
    ],
  },
  {
    id: 15,
    question_txt: "Which method is used to create refs in functional components?",
    options: [
      { id: 61, option_text: "React.createRef()", isCorrect: false },
      { id: 62, option_text: "useRef()", isCorrect: true },
      { id: 63, option_text: "makeRef()", isCorrect: false },
      { id: 64, option_text: "setRef()", isCorrect: false },
    ],
  },
  {
    id: 16,
    question_txt: "React components re-render when:",
    options: [
      { id: 65, option_text: "Props change", isCorrect: false },
      { id: 66, option_text: "State changes", isCorrect: false },
      { id: 67, option_text: "Context changes", isCorrect: false },
      { id: 68, option_text: "All of the above", isCorrect: true },
    ],
  },
  {
    id: 17,
    question_txt: "What is React Fiber?",
    options: [
      { id: 69, option_text: "A new CSS framework", isCorrect: false },
      { id: 70, option_text: "React's new reconciliation engine", isCorrect: true },
      { id: 71, option_text: "A database library", isCorrect: false },
      { id: 72, option_text: "A state management tool", isCorrect: false },
    ],
  },
  {
    id: 18,
    question_txt: "What does lazy loading in React mean?",
    options: [
      { id: 73, option_text: "Delaying rendering of components until they are needed", isCorrect: true },
      { id: 74, option_text: "Loading all components at once", isCorrect: false },
      { id: 75, option_text: "Caching API requests", isCorrect: false },
      { id: 76, option_text: "Optimizing state updates", isCorrect: false },
    ],
  },
  {
    id: 19,
    question_txt: "What is the purpose of React.Suspense?",
    options: [
      { id: 77, option_text: "Handle errors in components", isCorrect: false },
      { id: 78, option_text: "Show fallback content while loading", isCorrect: true },
      { id: 79, option_text: "Prevent unnecessary re-renders", isCorrect: false },
      { id: 80, option_text: "Manage global state", isCorrect: false },
    ],
  },
  {
    id: 20,
    question_txt: "Which is NOT a valid React hook?",
    options: [
      { id: 81, option_text: "useLayoutEffect", isCorrect: false },
      { id: 82, option_text: "useReducer", isCorrect: false },
      { id: 83, option_text: "useMount", isCorrect: true },
      { id: 84, option_text: "useRef", isCorrect: false },
    ],
  },
  {
    id: 21,
    question_txt: "In React, props are:",
    options: [
      { id: 85, option_text: "Mutable", isCorrect: false },
      { id: 86, option_text: "Immutable", isCorrect: true },
      { id: 87, option_text: "Optional", isCorrect: false },
      { id: 88, option_text: "Global variables", isCorrect: false },
    ],
  },
  {
    id: 22,
    question_txt: "Which of the following correctly describes useCallback?",
    options: [
      { id: 89, option_text: "Caches a function to prevent re-creation", isCorrect: true },
      { id: 90, option_text: "Caches a component tree", isCorrect: false },
      { id: 91, option_text: "Prevents state updates", isCorrect: false },
      { id: 92, option_text: "Handles lifecycle methods", isCorrect: false },
    ],
  },
  {
    id: 23,
    question_txt: "What happens if no dependency array is passed to useEffect?",
    options: [
      { id: 93, option_text: "Effect runs only once", isCorrect: false },
      { id: 94, option_text: "Effect never runs", isCorrect: false },
      { id: 95, option_text: "Effect runs after every render", isCorrect: true },
      { id: 96, option_text: "Effect runs only on unmount", isCorrect: false },
    ],
  },
  {
    id: 24,
    question_txt: "What is the default behavior of React forms?",
    options: [
      { id: 97, option_text: "React automatically handles form state", isCorrect: false },
      { id: 98, option_text: "Form inputs are uncontrolled by default", isCorrect: true },
      { id: 99, option_text: "React prevents form submission", isCorrect: false },
      { id: 100, option_text: "Inputs are controlled by default", isCorrect: false },
    ],
  },
  {
    id: 25,
    question_txt: "Which React feature allows state to be shared between multiple components?",
    options: [
      { id: 101, option_text: "Props", isCorrect: false },
      { id: 102, option_text: "Context API", isCorrect: true },
      { id: 103, option_text: "Refs", isCorrect: false },
      { id: 104, option_text: "Portals", isCorrect: false },
    ],
  },
  {
    id: 26,
    question_txt: "What is a React Fragment?",
    options: [
      { id: 105, option_text: "A way to group multiple elements without adding extra nodes to DOM", isCorrect: true },
      { id: 106, option_text: "A lifecycle method", isCorrect: false },
      { id: 107, option_text: "A React hook", isCorrect: false },
      { id: 108, option_text: "A built-in state manager", isCorrect: false },
    ],
  },
  {
    id: 27,
    question_txt: "What is the return type of useState?",
    options: [
      { id: 109, option_text: "An object with state and setState", isCorrect: false },
      { id: 110, option_text: "An array with state and updater function", isCorrect: true },
      { id: 111, option_text: "A promise", isCorrect: false },
      { id: 112, option_text: "A function", isCorrect: false },
    ],
  },
  {
    id: 28,
    question_txt: "Which of the following is TRUE about React Portals?",
    options: [
      { id: 113, option_text: "They render children into a DOM node outside the parent hierarchy", isCorrect: true },
      { id: 114, option_text: "They prevent re-rendering", isCorrect: false },
      { id: 115, option_text: "They only work with hooks", isCorrect: false },
      { id: 116, option_text: "They are deprecated", isCorrect: false },
    ],
  },
  {
    id: 29,
    question_txt: "Which lifecycle method is used for API calls in class components?",
    options: [
      { id: 117, option_text: "componentWillMount", isCorrect: false },
      { id: 118, option_text: "componentDidMount", isCorrect: true },
      { id: 119, option_text: "componentWillUpdate", isCorrect: false },
      { id: 120, option_text: "shouldComponentUpdate", isCorrect: false },
    ],
  },
  {
    id: 30,
    question_txt: "Which statement about Virtual DOM is TRUE?",
    options: [
      { id: 121, option_text: "It directly manipulates the real DOM", isCorrect: false },
      { id: 122, option_text: "It is a lightweight copy of the real DOM", isCorrect: true },
      { id: 123, option_text: "It is slower than the real DOM", isCorrect: false },
      { id: 124, option_text: "It replaces the real DOM completely", isCorrect: false },
    ],
  },
  {
    id: 31,
    question_txt: "What is React's default rendering strategy?",
    options: [
      { id: 125, option_text: "Partial Rendering", isCorrect: false },
      { id: 126, option_text: "Reconciliation with Virtual DOM", isCorrect: true },
      { id: 127, option_text: "Direct DOM updates", isCorrect: false },
      { id: 128, option_text: "Static Rendering", isCorrect: false },
    ],
  },
  {
    id: 32,
    question_txt: "What is the purpose of error boundaries in React?",
    options: [
      { id: 129, option_text: "To catch JavaScript errors in a component tree", isCorrect: true },
      { id: 130, option_text: "To prevent API failures", isCorrect: false },
      { id: 131, option_text: "To optimize rendering", isCorrect: false },
      { id: 132, option_text: "To replace try-catch", isCorrect: false },
    ],
  },
  {
    id: 33,
    question_txt: "React updates the DOM using:",
    options: [
      { id: 133, option_text: "Shadow DOM", isCorrect: false },
      { id: 134, option_text: "Virtual DOM diffing", isCorrect: true },
      { id: 135, option_text: "Direct DOM access", isCorrect: false },
      { id: 136, option_text: "XML DOM parser", isCorrect: false },
    ],
  },
  {
    id: 34,
    question_txt: "Which of the following is a controlled component in React?",
    options: [
      { id: 137, option_text: "Input field with value managed by state", isCorrect: true },
      { id: 138, option_text: "Button without onClick", isCorrect: false },
      { id: 139, option_text: "Select field without value", isCorrect: false },
      { id: 140, option_text: "Uncontrolled textarea", isCorrect: false },
    ],
  },
  {
    id: 35,
    question_txt: "Which hook is used for performance optimization in functional components?",
    options: [
      { id: 141, option_text: "useState", isCorrect: false },
      { id: 142, option_text: "useEffect", isCorrect: false },
      { id: 143, option_text: "useMemo & useCallback", isCorrect: true },
      { id: 144, option_text: "useContext", isCorrect: false },
    ],
  },
  ],
};

const Quiz = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(dummyQuiz.totalTime * 60);
  const [results, setResults] = useState(false); // now just boolean
  const [questionTimes, setQuestionTimes] = useState({});
  const [startTime, setStartTime] = useState(Date.now());
  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false); 
  const [score, setScore] = useState(0);

  // Timer countdown with auto-submit
  useEffect(() => {
    if (results) return; // stop timer after submit

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit(true); // auto-submit when time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [results]);

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
    if (results) return; // lock answers after submit
    setAnswers((prev) => {
      if (prev[qid] === optionId) {
        const updated = { ...prev };
        delete updated[qid];
        return updated;
      }
      return { ...prev, [qid]: optionId };
    });
  };

const handleSubmit = () => {
  // calculate score
  let finalScore = 0;
  dummyQuiz.questions.forEach((q, index) => {
    const selectedOptionId = answers[index + 1]; // answers keyed by q index + 1
    const correctOption = q.options.find((opt) => opt.isCorrect);
    if (selectedOptionId === correctOption?.id) {
      finalScore++;
    }
  });
    setScore(finalScore)
    setResults(true);
    setShowPopup(true); // show success popup
    setSubmitted(true)

  // Prepare JSON to send to backend
  const analyticsData = dummyQuiz.questions.map((q, index) => {
    const selectedOptionId = answers[index + 1];
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

  console.log("Analytics JSON", analyticsData);
};


const q = dummyQuiz.questions[currentQ];

  return (
    <div className="quiz-page">
      {/* Sidebar */}
        <div className="sidebar">
            {dummyQuiz.questions.map((_, index) => (
            <button
                key={index}
                className={`
                ${currentQ === index ? "active" : ""}
                ${answers[index + 1] ? "answered" : ""}
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
            <div >
              <hr/>
             Score: {score} / {dummyQuiz.questions.length}
               
            </div>
            )}
        </div>
      {/* Main quiz area */}
      <div className="quiz-container">
        <div className="timer text-end fw-bold" style={{ color: "crimson" }}>
          Time Left: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
        <h2>Category: {category.toUpperCase()}</h2>
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
              {currentQ < dummyQuiz.questions.length - 1 ? (
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
            <h2>✅ Test submitted successfully</h2>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;