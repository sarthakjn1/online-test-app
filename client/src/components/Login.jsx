import React from 'react'

const Login = () => {
  return (
    <div className="login-container card text-center" style={{ width: '25rem' }}>
            <div className="card-body">
                <h5 className="card-title">Login</h5>
                <br />
                <label className="input-ele" htmlFor="username">Username: 
                    <input type="text" id="username" />
                </label>
                <label className="input-ele" htmlFor="password">Password:
                    <input type="password" id="password" />
                </label>
                <br />
                <a href="#" className="btn btn-primary">Login</a>
            </div>
        </div>
  )
}

export default Login