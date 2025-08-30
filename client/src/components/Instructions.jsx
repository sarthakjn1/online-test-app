
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import booksLeft from "../assets/books_image.png";
import axios from "axios"

function Instructions() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();

    const [categories, setCategories] = useState([])
    const handleLogout = function () {
        localStorage.removeItem("token");
        alert("Logged out successfully!");
    }


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/quiz/master_category/");
                setCategories(res.data);
                console.log("Fetched categories:", res.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleStart = () => {
        if (!selectedCategory) {
            alert("Please select a category before starting!");
            return;
        }
        navigate(`/quiz/${selectedCategory.id}`);
    };

    return (
        <div className="d-flex flex-row vh-100 vw-100 bg-light">

            <div className="d-flex justify-content-center align-items-center p-3">
                <img
                    src={booksLeft}
                    alt="Books Left"
                    className="img-fluid"
                    style={{ maxHeight: "90%", maxWidth: "100%" }}
                />
            </div>


            <div className="card flex-grow-1 h-100 border-0 rounded-0">
                <div className="card-body d-flex flex-column justify-content-center align-items-center text-center p-5">

                    <h2 className="text-center mb-4">Test Instructions</h2>
                    <p className="lead">
                        Please read the following instructions carefully before starting the test:
                    </p>

                    <ul className="list-group list-group-flush mb-4">
                        <li className="list-group-item">The test duration is <b>60 minutes</b>.</li>
                        <li className="list-group-item">You are being <b>proctored</b> throughout the test.</li>
                        <li className="list-group-item">Do not cheat or seek external help.</li>
                        <li className="list-group-item">Do not switch tabs or open another browser window.</li>
                        <li className="list-group-item">Answer all questions carefully — you cannot go back once started.</li>
                    </ul>

                    <h4 className="mt-4">Select Test Category:</h4>
                    <div className="d-flex gap-3 mt-3 flex-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`btn ${selectedCategory === cat ? "btn-primary" : "btn-outline-primary"
                                    }`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>

                    {selectedCategory && (
                        <div className="mt-5 p-4 border rounded text-center bg-light">
                            <h5 className="mb-3">
                                You selected: <b>{selectedCategory.title}</b>
                            </h5>
                            <div className="d-flex justify-content-center gap-3">
                                <button className="btn btn-success btn-lg" onClick={handleStart}>
                                    Start Test
                                </button>
                                <button
                                    className="btn btn-secondary btn-lg"
                                    onClick={() => setSelectedCategory("")}
                                >
                                    Go Back
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div class="position-absolute top-0 end-0 m-3">
                <button className="btn btn-danger" onClick={(handleLogout)}  >Logout</button>
            </div>
        </div>
    );
}

export default Instructions;

