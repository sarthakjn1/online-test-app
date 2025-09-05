import React, { useState } from 'react'
import '../../styles/register_styles.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [username, setUsername] = useState("")
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [user_category, setUserCategory] = useState("Student")
  const [errorMsg, setErrorMsg] = useState("")   // For validation messages
  const [loading, setLoading] = useState(false) // For button disable
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!firstname.trim() || !lastname.trim() || !username.trim() || !emailId.trim() || !password.trim()) {
      setErrorMsg("⚠️ Please fill all fields with valid inputs (no spaces only).");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId.trim())) {
      setErrorMsg("⚠️ Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      setErrorMsg("⚠️ Password must be at least 6 characters long.");
      return false;
    }

    setErrorMsg("");
    return true;
  };

  const handleUserRegistration = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/api/users/register/", {
        first_name: firstname.trim(),
        last_name: lastname.trim(),
        username: username.trim(),
        password: password,
        usertype: 1,
        category: user_category === "Student" ? 1 : 2,
        email: emailId.trim(),
      });
      console.log("Register success:", response.data);
      alert("✅ User registered successfully!");
      navigate("/login"); // redirect to login page
    } catch (error) {
      const errorDetail = error.response?.data || error.message;
      console.error("Error registering:", errorDetail);

      if (error.response?.status === 400 && error.response?.data?.email) {
        setErrorMsg("❌ User already registered with this email.");
      } else if (error.response?.status === 400 && error.response?.data?.username) {
        setErrorMsg("❌ Username already exists.");
      } else {
        setErrorMsg("❌ Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg border-0 rounded-4" style={{ width: '28rem' }}>
        <div className="card-body p-4">
          <h3 className="card-title mb-4 text-center fw-bold">Create Account</h3>

          {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}

          <form onSubmit={handleUserRegistration}>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">First Name</label>
              <input type="text" className="form-control" id="first_name" value={firstname}
                onChange={(e) => setFirstname(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="last_name" value={lastname}
                onChange={(e) => setLastname(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" value={username}
                onChange={(e) => setUsername(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label htmlFor="emailid" className="form-label">Email</label>
              <input type="email" className="form-control" id="emailid" value={emailId}
                onChange={(e) => setEmailId(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className="mb-4">
              <label htmlFor="user_category" className="form-label">Category</label>
              <select className="form-select" id="user_category" value={user_category}
                onChange={(e) => setUserCategory(e.target.value)}>
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
              </select>
            </div>

            <div className="d-grid">
              <button type="submit" className="register-btn btn btn-primary btn-block w-100" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
