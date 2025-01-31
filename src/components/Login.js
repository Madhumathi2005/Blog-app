import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/Login.css';
import Navbar1 from "./Navbar1";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      alert("Login Successful!");
      navigate("/home");  // Redirect to home page after successful login
    } catch (error) {
      alert("Invalid Credentials");  // Inform the user about invalid login
    }
  };

  return (
    <div>
      <Navbar1 />
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input 
          type="email" 
          className="login-input" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          className="login-input" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="login-btn">Login</button>
      </form>
      <p className="register-prompt">
        New here? <span className="register-link" onClick={() => navigate("/register")}>Register</span>
      </p>
    </div>
    </div>
  );
};

export default Login;
