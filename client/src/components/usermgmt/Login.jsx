import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../styles/login.css'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMsg("")
    setLoading(true)

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/login/", {
        username: username.trim(),
        password: password
      });

      // Save JWT token + user id
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("user_id", response.data.user_id)

      console.log("Login success:", response.data);
      navigate("/instructions");
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);

      if (error.response) {
        // ✅ Show backend-provided message
        if (error.response.data.error === "Invalid username") {
          setErrorMsg("❌ Username not found.");
        } else if (error.response.data.error === "Invalid password") {
          setErrorMsg("❌ Wrong password.");
        } else {
          setErrorMsg("❌ Login failed. Please try again.");
        }
      } else {
        setErrorMsg("❌ Server not reachable. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center vh-100 position-relative">

      {/* 🔹 Home Button (Top Right) */}
      <button
        className="btn btn-danger position-absolute"
        style={{ top: "20px", right: "20px" }}
        onClick={() => navigate("/")}
      >
        Home
      </button>

      <div className="card shadow-lg border-0 rounded-4" style={{ width: '28rem' }}>
        <div className="card-body p-4">
          <h3 className="card-title mb-4 text-center fw-bold">Login</h3>

          {/* Error Message */}
          {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group mb-3">
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

            <div className="form-group mb-3">
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

            <button
              type="submit"
              className="login-btn btn btn-primary btn-block w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
