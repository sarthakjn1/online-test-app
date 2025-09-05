import React from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/home_instructor.css"

const InstructorHome = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Analytics Dashboard",
      desc: "Track performance, insights & usage trends",
      icon: "📊", // emoji instead of lucide-react
      action: () => navigate("/analytics"),
    },
    {
      title: "Add Questions",
      desc: "Create, categorize & manage quiz questions",
      icon: "➕", // emoji instead of lucide-react
      action: () => navigate("/bulkquestionadd"),
    },
  ];
  return (
    <div className="home-instructor-container">
      {/* <div className="home-instructor-overlay"></div> */}
      <button
        className="btn btn-danger position-absolute"
        style={{ top: "20px", right: "20px" }}
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <div className="home-instructor-header-box">
         <h1 className="home-instructor-header">Instructor Home</h1>
          <p className="home-instructor-subtitle">
    Manage the platform with ease – choose what you want to do today
  </p>
      </div>

      <div className="home-instructor-grid">
        {options.map((opt, idx) => (
          <div key={idx} className="home-instructor-card" onClick={opt.action}>
            <div>{opt.icon}</div>
            <h2>{opt.title}</h2>
            <p>{opt.desc}</p>
            <button className="home-instructor-button">Go</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorHome;
