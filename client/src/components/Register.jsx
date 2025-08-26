import React from 'react'
import '../styles/register_styles.css'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [user_category, setUserCategory] = useState("Student")



    const handleUserRegistration = async function (e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/users/register/", {
                first_name: firstname,
                last_name: lastname,
                username: username,
                password: password,
                usertype: 1,
                category: user_category === "Student" ? 1 : 2,
                email: emailId,
            });
            console.log("Register success:", response.data);
            alert("User registered successfully!");
        } catch (error) {
            console.error("Error registering:", error.response?.data || error.message);
        }
    }


    return (
        <div className="login-container card text-center" style={{ width: '30rem' }}>
            <div className="card-body">
                <h5 className="card-title">Register</h5>
                <label className="input-ele" htmlFor="first_name">First Name:
                    <input type="text" id="first_name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                </label>
                <br />
                <label className="input-ele" htmlFor="last_name">Last Name:
                    <input type="text" id="last_name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                </label>
                <br />
                <label className="input-ele" htmlFor="username">Username:
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label className="input-ele" htmlFor="emailid">Email Id:
                    <input type="email" id="emailid" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                </label>
                <label className="input-ele" htmlFor="password">Password:
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <label className="input-ele" htmlFor="user_category">
                    Category:
                </label>
                <select className="input-ele" name="user_category" id="user_category" value={user_category}
                    onChange={(e) => setUserCategory(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                </select>
                <br />
                <a href="#" className="btn btn-primary" onClick={(e) => handleUserRegistration(e)}>Register</a>
            </div>
        </div>
    )
}

export default Register