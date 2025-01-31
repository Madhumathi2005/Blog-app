import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/DraftPage.css';
import Navbar from "./Navbar";
const DraftPage = () => {
  const [draft, setDraft] = useState(null);
  const navigate = useNavigate();

  // Load draft from localStorage
  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem("draft"));
    setDraft(savedDraft);
  }, []);

  // Handle delete draft
  const handleDeleteDraft = () => {
    localStorage.removeItem("draft");
    setDraft(null); // Clear the draft from state
  };

  // Handle creating post from draft
  const handleCreatePost = async () => {
    if (draft) {
      try {
        // Create a new post with the draft data
        await axios.post("http://localhost:5000/api/blogs", {
          title: draft.title,
          content: draft.content,
          image: draft.image
        });
        
        alert("Post Created from Draft!");
        
        // Clear the draft from localStorage
        localStorage.removeItem("draft");
        
        // Navigate to home page or desired page after creation
        navigate("/home");
      } catch (error) {
        console.error("Error creating the post:", error);
        alert("Error creating the post. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar />
    <div className="draft-page-container">
      <h1>Drafts</h1>
      {draft ? (
        <div className="draft">
          <h2>{draft.title}</h2>
          <p>{draft.content}</p>
          
          {/* Buttons for actions */}
          <button onClick={handleDeleteDraft}>Delete Draft</button>
          <button onClick={handleCreatePost} className="create-post-btn">Create Post</button> {/* Create Post Button */}
        </div>
      ) : (
        <p>No drafts available.</p>
      )}
    </div>
    </div>
  );
};

export default DraftPage;
