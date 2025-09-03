import React, { useState } from "react";
import axios from "axios";

const BulkQuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState(1);
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

  // Update category
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentQuestion({ ...currentQuestion, category: e.target.value });
  };

  // Update question text
  const handleQuestionChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, question_txt: e.target.value });
  };

  // Update option text
  const handleOptionChange = (index, e) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index].option_text = e.target.value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  // Mark correct option
  const handleCorrectChange = (index) => {
    const newOptions = currentQuestion.options.map((opt, i) => ({
      ...opt,
      is_correct: i === index,
    }));
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  // Save current question to list and clear form
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

  // Submit all saved questions to backend
  const handleSubmitAll = async () => {
    try {
      const payload = { questions };
      await axios.post("http://127.0.0.1:8000/api/quiz/question/bulk-add/", payload);
      alert("All questions submitted successfully!");
      setQuestions([]); // clear stored questions after submit
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
    <div className="d-flex justify-content-center mt-4">
      <div className="card p-4 shadow" style={{ marginLeft: '600px', maxWidth: "800px", width: "100%" }}>
        <h3 className="mb-3">Add Quiz Question</h3>
        {/* Question text */}
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
              />{"  "}
               Correct
            </div>
          </div>
        ))}
        <br />

        {/* Buttons */}
        <button className="btn btn-primary me-2" onClick={handleSaveQuestion}>
          Save & Next
        </button>
        <br />
        <button className="btn btn-success" onClick={handleSubmitAll}>
          Submit All
        </button>

        {/* Preview saved questions count */}
        <div className="mt-3">
          <strong>{questions.length}</strong> question(s) saved so far
        </div>
      </div>
    </div>
  );
};

export default BulkQuestionForm;
