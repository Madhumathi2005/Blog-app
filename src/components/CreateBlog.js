import '../css/CreateBlog.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from "./Navbar";
const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate(); // Create navigate object for navigation

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem("draft"));
    if (savedDraft) {
      setTitle(savedDraft.title || "");
      setContent(savedDraft.content || "");
      setImage(savedDraft.image || "");
    }
  }, []);

  // Save draft to localStorage whenever any of the fields change
  useEffect(() => {
    const draft = { title, content, image };
    localStorage.setItem("draft", JSON.stringify(draft)); // Save to localStorage
  }, [title, content, image]);

  // Handle blog submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/blogs", { title, content, image });
    alert("Blog Created!");
    localStorage.removeItem("draft"); // Clear the draft after successful creation
    navigate("/home"); // Redirect to Home page after successful submission
  };

  // Handle save draft
  const handleSaveDraft = () => {
    const draft = { title, content, image };
    localStorage.setItem("draft", JSON.stringify(draft)); // Save to localStorage
    alert("Blog saved to Drafts!");
    navigate("/drafts");  // Redirect to drafts page
  };

  return (
    <div>
      <Navbar />
    <div className="create-blog-container">
      <h1 className="create-blog-title">Create a Blog</h1>
      <form className="create-blog-form" onSubmit={handleSubmit}>
        <input 
          className="create-blog-input" 
          type="text" 
          placeholder="Title" 
          value={title} // Bind to state
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <textarea 
          className="create-blog-textarea" 
          placeholder="Content" 
          value={content} // Bind to state
          onChange={(e) => setContent(e.target.value)} 
          required
        ></textarea>
        <input 
          className="create-blog-input" 
          type="text" 
          placeholder="Image URL" 
          value={image} // Bind to state
          onChange={(e) => setImage(e.target.value)} 
        />
        <button className="create-blog-btn" type="submit">Create</button>
        <button className="save-draft-btn" type="button" onClick={handleSaveDraft}>Save as Draft</button> {/* Save as Draft Button */}
      </form>
    </div>
    </div>
  );
};

export default CreateBlog;
