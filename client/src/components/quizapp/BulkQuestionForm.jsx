import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../styles/bulkqsAdd.css';

const BulkQuestionForm = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState(1);
  const token = localStorage.getItem("token");
  const [currentQuestion, setCurrentQuestion] = useState({
    category: category,
    question_txt: "",
    isEnabled: true,
    options: [
      { option_text: "", is_correct: false, isEnabled: true },
      { option_text: "", is_correct: false, isEnabled: true },
      { option_text: "", is_correct: false, isEnabled: true },
      { option_text: "", is_correct: false, isEnabled: true },
    ],
  });
  const goToInstructorHome = () => {
    navigate("/instructor-home");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("usercategory");
    localStorage.removeItem("refresh_token");

    navigate("/")
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentQuestion({ ...currentQuestion, category: e.target.value });
  };

  const handleQuestionChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, question_txt: e.target.value });
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index].option_text = e.target.value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleCorrectChange = (index) => {
    const newOptions = currentQuestion.options.map((opt, i) => ({
      ...opt,
      is_correct: i === index,
    }));
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleSaveQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      category: 1,
      question_txt: "",
      isEnabled: true,
      options: [
        { option_text: "", is_correct: false, isEnabled: true },
        { option_text: "", is_correct: false, isEnabled: true },
        { option_text: "", is_correct: false, isEnabled: true },
        { option_text: "", is_correct: false, isEnabled: true },
      ],
    });
  };

  const handleSubmitAll = async () => {
    try {
      const payload = { questions };

      await axios.post("http://127.0.0.1:8000/api/quiz/question/bulk-add/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert("All questions submitted successfully!");
      setQuestions([]);
      setCurrentQuestion({
        category: 1,
        question_txt: "",
        isEnabled: true,
        options: [
          { option_text: "", is_correct: false, isEnabled: true },
          { option_text: "", is_correct: false, isEnabled: true },
          { option_text: "", is_correct: false, isEnabled: true },
          { option_text: "", is_correct: false, isEnabled: true },
        ],
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting questions!");
    }
  };

  return (
    <div className="question-form-container">
      {/* Back button */}
      <div className="back-btn">
        <button
          className="btn btn-primary"
          onClick={goToInstructorHome}
        >
          Back
        </button>
        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Home
        </button>
      </div>
      <div className="add-question-card">


        <h3 className="mb-3 text-center">Add Quiz Question</h3>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category ID:</label>
          <input
            type="number"
            className="form-control"
            value={currentQuestion.category}
            onChange={handleCategoryChange}
          />
        </div>

        {/* Question text */}
        <div className="mb-3">
          <label className="form-label">Question</label>
          <input
            type="text"
            className="form-control"
            value={currentQuestion.question_txt}
            onChange={handleQuestionChange}
          />
        </div>

        {/* Options */}
        {currentQuestion.options.map((opt, index) => (
          <div key={index} className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder={`Option ${index + 1}`}
              value={opt.option_text}
              onChange={(e) => handleOptionChange(index, e)}
            />
            <div className="input-group-text">
              <input
                type="radio"
                checked={opt.is_correct}
                onChange={() => handleCorrectChange(index)}
              />
              Correct
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="mt-4 d-flex justify-content-between">
          <button className="btn btn-primary" onClick={handleSaveQuestion}>
            Save & Next
          </button>
          <button className="btn btn-success" onClick={handleSubmitAll}>
            Submit All
          </button>
        </div>

        {/* Preview saved questions count */}
        <div className="mt-3 text-center">
          <strong>{questions.length}</strong> question(s) saved so far
        </div>
      </div>
    </div>
  );
};

export default BulkQuestionForm;
