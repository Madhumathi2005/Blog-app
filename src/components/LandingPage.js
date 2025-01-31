import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/LandingPage.css"; 
import Navbar1 from "./Navbar1";
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar1 />
    <div id="landing-container" className="landing-page">
      <h1 className="landing-title">Welcome to My Blog App</h1>
      <p className="landing-description">Share your thoughts with the world</p>
      <button 
        onClick={() => navigate("/login")} 
        className="landing-btn"
      >
        Get Started
      </button>
    </div>
    </div>
  );
};

export default LandingPage;
