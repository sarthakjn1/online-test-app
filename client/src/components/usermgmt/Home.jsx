import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css"; 
import UFF_icon from "../../assets/user_friendly_feature_icon.png"
import RTR_icon from "../../assets/Real_time_results.png"
import PT_icon from "../../assets/progress_tracking.png"


function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container "> 
 
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-3" href="/">Online Test Portal</a>
          <div className="ms-auto">
            <button
              className="btn btn-outline-light me-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="btn btn-warning"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </nav>

  
      <header className="hero-section d-flex flex-column justify-content-center align-items-center text-center text-white">
        
        <h1 className="fw-bold display-4">Welcome to Online Test Portal</h1>
        <p className="lead mt-3">
          A modern platform to practice, prepare, and succeed in your exams.
        </p>
        <div className="mt-4">
          <button
            className="btn btn-lg btn-primary me-3"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
          <button
            className="btn btn-lg btn-outline-light"
            onClick={() => navigate("/register")}
          >
            Register Now
          </button>
        </div>
      </header>

      
      <section className="features container-fluid text-center py-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={UFF_icon}
              alt="User Friendly"
              className="feature-icon"
            />
            <h4 className="mt-3">User Friendly</h4>
            <p>Simple and intuitive design for smooth test experience.</p>
          </div>
          <div className="col-md-4">
            <img
              src={RTR_icon}
              alt="Real-Time Results"
              className="feature-icon"
            />
            <h4 className="mt-3">Instant Results</h4>
            <p>Get detailed insights and results as soon as you finish.</p>
          </div>
          <div className="col-md-4">
            <img
              src={PT_icon}
              alt="Progress Tracking"
              className="feature-icon"
            />
            <h4 className="mt-3">Track Progress</h4>
            <p>Monitor your learning journey and improve over time.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-dark text-white text-center py-3">
        <p className="mb-0">© {new Date().getFullYear()} Online Test Portal. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
