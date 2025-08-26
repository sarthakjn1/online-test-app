import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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

            // Save JWT token to localStorage
            localStorage.setItem("token", response.data.access);
            console.log("Login success:", response.data);


            // Redirect to dashboard/home page
            navigate("/instructions");


        } catch (error) {
            console.error("Error logging in:", error.response?.data || error.message);
        }
    }

    return (
        <div className="login-container card text-center" style={{ width: '25rem' }}>
            <div className="card-body">
                <h5 className="card-title">Login</h5>
                <br />
                <label className="input-ele" htmlFor="username">Username:
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label className="input-ele" htmlFor="password">Password:
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <a href="#" className="btn btn-primary" onClick={(e) => handleLogin(e)}>Login</a>
            </div>
        </div>
    )
}

export default Login