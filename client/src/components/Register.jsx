import React from 'react'
import '../styles/register_styles.css'

const Register = () => {
    return (
        <div className="login-container card text-center" style={{ width: '30rem' }}>
            <div className="card-body">
                <h5 className="card-title">Register</h5>
                <label className="input-ele" htmlFor="first_name">First Name: 
                    <input type="text" id="first_name" />
                </label>
                <br />
                <label className="input-ele" htmlFor="last_name">Last Name: 
                    <input type="text" id="last_name" />
                </label>
                <br />
                <label className="input-ele" htmlFor="username">Username: 
                    <input type="text" id="username" />
                </label>
                <br />
                <label className="input-ele" htmlFor="emailid">Email Id: 
                    <input type="email" id="emailid" />
                </label>
                <label className="input-ele" htmlFor="password">Password:
                    <input type="password" id="password" />
                </label>
                <br />
                <label className="input-ele" htmlFor="user_category">
                    Category: 
                </label>
                <select className="input-ele" name="user_category" id="user_category">
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                </select>
                <br />
                <a href="#" className="btn btn-primary">Register</a>
            </div>
        </div>
    )
}

export default Register