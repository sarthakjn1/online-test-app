import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import booksLeft from "../assets/books_image.png";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/instructions.css";

function Instructions() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        navigate("/")
    };

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

            {/* Left Image Section */}
            <div className="instructions-image d-flex justify-content-center align-items-center p-4">
                <img
                    src={booksLeft}
                    alt="Books Illustration"
                    className="img-fluid rounded shadow"
                />
            </div>

            {/* Right Instructions Section */}
            <div className="card flex-grow-1 h-100 border-0 rounded-0 instructions-card">
                <div className="card-body d-flex flex-column justify-content-center align-items-center text-center p-5">

                    {/* Title */}
                    <h2 className="mb-3 text-primary fw-bold">📘 Test Instructions</h2>
                    <p className="lead fw-bold" style={{ color: 'black' }}>
                        Please read the following instructions carefully before starting your test.
                    </p>

                    {/* Instructions */}
                    <ul className="instruction-list text-start mt-4">
                        <li>The test duration is <b>60 minutes</b>.</li>
                        <li>You are being <b>proctored</b> throughout the test.</li>
                        <li>Do not cheat, seek external help, or use unfair means.</li>
                        <li>Do not switch tabs or open another browser window.</li>
                        <li>Answer all questions carefully — <b>you cannot go back once started</b>.</li>
                        <li>Ensure a <b>stable internet connection</b> during the test.</li>
                        <li>Keep your <b>webcam & microphone enabled</b> if required.</li>
                        <li>Click <b>Start Test</b> only when you are fully ready.</li>
                    </ul>

                    {/* Category Selection */}
                    <h4 className="mt-5">Select Test Category:</h4>
                    <div className="d-flex gap-3 mt-3 flex-wrap justify-content-center">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`btn px-4 py-2 ${selectedCategory === cat ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>

                    {/* Selected Category Info */}
                    {selectedCategory && (
                        <div className="mt-5 p-4 border rounded text-center bg-light shadow-sm w-75">
                            <h5 className="mb-3">
                                You selected: <b className="text-primary">{selectedCategory.title}</b>
                            </h5>
                            <div className="d-flex justify-content-center gap-3">
                                <button className="btn btn-success btn-lg px-4" onClick={handleStart}>
                                    ✅ Start Test
                                </button>
                                <button
                                    className="btn btn-secondary btn-lg px-4"
                                    onClick={() => setSelectedCategory("")}
                                >
                                    ⬅ Go Back
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Logout Button */}
            <div className="position-absolute top-0 end-0 m-3">
                <button className="btn btn-danger px-4" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Instructions;
