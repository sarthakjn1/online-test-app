import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/Login.css'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async function (e) {
        e.preventDefault()
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/users/login/", {
                username: username,
                password: password
            });
            console.log(response)
            // Save JWT token to localStorage
            localStorage.setItem("token", response.data.access);
            localStorage.setItem("user_id", response.data.user_id)
            console.log("Login success:", response.data);


            // Redirect to dashboard/home page
            navigate("/instructions");


        } catch (error) {
            console.error("Error logging in:", error.response?.data || error.message);
        }
    }

    return (
        <div className="login-wrapper d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg border-0 rounded-4" style={{ width: '28rem' }}>
            <div className="card-body p-4">
            <h3 className="card-title mb-4 text-center fw-bold">Login</h3>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>

                    <button type="submit" className="login-btn btn btn-primary btn-block">
                    Login
                    </button>
                </form>
                </div>
            </div>
        </div>
    );
}

export default Login