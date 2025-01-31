import '../css/Profile.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Profile = () => {
  // Load initial data from localStorage, or set default values
  const [username, setUsername] = useState(localStorage.getItem("username") || "Mathi");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-k3iu5uLTUHw4Mb8x8cbGZavp9YjONLRydg&s");
  const [email, setEmail] = useState(localStorage.getItem("email") || "mathi@gmail.com");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "6383508484");
  const [github, setGithub] = useState(localStorage.getItem("github") || "https://github.com/mathi");
  const [address, setAddress] = useState(localStorage.getItem("address") || "1/704 C Siva Shakthi Nagar Sidco, Tiruppur");
  const [newAvatar, setNewAvatar] = useState(null);  // To store the new avatar selected
  const navigate = useNavigate();

  // Handle file input change for avatar image
  const handleImageChange = (e) => {
    const file = e.target.files[0];  // Get the first file selected
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatar(reader.result);  // Store the new avatar
      };
      reader.readAsDataURL(file);  // Convert the image to a base64 string
    }
  };

  // Handle Profile Update
  const handleUpdate = () => {
    // Update localStorage with new values
    if (newAvatar) {
      setAvatar(newAvatar);  // Update the avatar with the new image
      localStorage.setItem("avatar", newAvatar); // Store avatar in localStorage
    }
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("github", github);
    localStorage.setItem("address", address);

    alert("Profile Updated!");  // Display alert after update
  };

  // Handle Sign Out
  const handleSignOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("github");
    localStorage.removeItem("address");
    navigate("/"); // Redirect to Landing Page
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h1 className="profile-title">Profile</h1>
        <div className="profile-info">
          <label htmlFor="file-input" className="profile-avatar-wrapper">
            <img
              className="profile-avatar"
              src={avatar}
              alt="Avatar"
              style={{ cursor: "pointer" }}
            />
          </label>
          {/* Hidden file input to select image */}
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }} // Hide the input
          />

          <div className="profile-details">
            <label className="profile-label">Username: </label>
            <input
              className="profile-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className="profile-label">Email: </label>
            <input
              className="profile-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="profile-label">Phone: </label>
            <input
              className="profile-input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label className="profile-label">GitHub: </label>
            <input
              className="profile-input"
              type="url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />

            <label className="profile-label">Address: </label>
            <textarea
              className="profile-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button className="profile-btn" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
        <div className="profile-footer">
          <button className="signout-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
