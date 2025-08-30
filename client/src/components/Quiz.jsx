import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Quiz = () => {
    const { categoryId } = useParams();
    const [quizData, setQuizData] = useState(null);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/quiz/question/by-category/${categoryId}/`) // replace with your backend IP + route
            .then((res) => {
                setQuizData(res.data);
            })
            .catch((err) => {
                console.error("Error fetching quiz data:", err);
            });
    }, []);

    const handleSelect = (questionId, optionId) => {
        setAnswers({
            ...answers,
            [questionId]: optionId,
        });
    };


    if (!quizData) return <p>Loading quiz...</p>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Quiz</h2>
            {quizData && quizData.questions.map((q, idx) => (
                <div key={q.id} className="card mb-3 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">
                            {idx + 1}. {q.question_txt}
                        </h5>
                        <div className="list-group">
                            {q.options.map((opt) => (
                                <label
                                    key={opt.id}
                                    className={`list-group-item list-group-item-action ${opt.id
                                        }`}
                                    style={{ cursor: "pointer" }}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${q.id}`}
                                        value={opt.id}
                                        onChange={() => handleSelect(q.id, opt.id)}
                                        className="form-check-input me-2"
                                    />
                                    {opt.option_text}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <div className="text-center mt-4">
                <button
                    className="btn btn-primary"
                    onClick={() => console.log("Selected Answers:", answers)}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};


export default Quiz;