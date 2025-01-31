import '../css/EditBlog.css';
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
const EditBlog = () => {
  const { id } = useParams();  
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
        setImage(res.data.image);
      })
      .catch((err) => console.error("Error fetching blog details:", err));
  }, [id]);

  // Handle Blog Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedBlog = { title, content, image };

    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, updatedBlog);
      alert("Blog updated successfully!");
      navigate(`/blog/${id}`);  // Redirect back to the Blog Detail page
    } catch (err) {
      console.error("Error updating the blog:", err);
      alert("Error updating the blog. Please try again.");
    }
  };

  // Loading state while blog is being fetched
  if (!blog) return <h2>Loading...</h2>;

  return (
    <div>
      <Navbar />
    <div className="edit-blog-container" id="edit-blog-container">
      <h1 className="edit-blog-title" id="edit-blog-title">Edit Blog</h1>
      <form onSubmit={handleUpdate} className="edit-blog-form" id="edit-blog-form">
        <label htmlFor="edit-blog-title-input" className="edit-blog-label">
          Title:
          <input
            type="text"
            id="edit-blog-title-input"
            className="edit-blog-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label htmlFor="edit-blog-content-input" className="edit-blog-label">
          Content:
          <textarea
            id="edit-blog-content-input"
            className="edit-blog-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>

        <label htmlFor="edit-blog-image-input" className="edit-blog-label">
          Image URL:
          <input
            type="url"
            id="edit-blog-image-input"
            className="edit-blog-input"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        <button type="submit" className="edit-blog-btn" id="edit-blog-btn">
          Update Blog
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditBlog;
