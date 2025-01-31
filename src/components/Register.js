import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/Registration.css';
import Navbar1 from "./Navbar1";
const Register = () => {
  // State variables for capturing input fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  
  const navigate = useNavigate(); // Hook to navigate after successful registration

  // Handle the registration form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    try {
      // Sending registration data to the backend
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
        avatar
      });

      // If registration is successful, alert the user and navigate to login
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      // Log the error for debugging and show a failure message
      console.error(error);  // Log the error to see more details
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <Navbar1 />
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      {/* Registration Form */}
      <form className="register-form" onSubmit={handleRegister}>
        <input
          id="username-input"
          className="register-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          id="email-input"
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="password-input"
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          id="avatar-input"
          className="register-input"
          type="text"
          placeholder="Avatar URL (Optional)"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <button id="register-btn" className="register-btn" type="submit">Register</button>
      </form>
      {/* Link to login page if user already has an account */}
      <p className="register-prompt">
        Already have an account? <span className="login-link" onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
    </div>
  );
};

export default Register;
