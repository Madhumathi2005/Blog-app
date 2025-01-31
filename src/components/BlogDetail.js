import '../css/BlogDetails.css';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); // Store comments locally
  const [isLiked, setIsLiked] = useState(false); // Track like status (true = liked, false = not liked)
  const navigate = useNavigate(); // For navigation after delete or update

  // Fetch blog details when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);

        // Check if the blog is already liked (from localStorage)
        const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];
        setIsLiked(likedBlogs.includes(id)); // If blog ID is in likedBlogs, set it as liked
      })
      .catch((err) => console.error("Error fetching blog details:", err));
  }, [id]);

  // Handle Like button click (toggle functionality)
  const handleLike = () => {
    const updatedBlog = { ...blog };
    const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs')) || [];

    if (isLiked) {
      // If already liked, unlike it
      updatedBlog.likes -= 1;
      localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs.filter((blogId) => blogId !== id)));
    } else {
      // If not liked, like it
      updatedBlog.likes += 1;
      localStorage.setItem('likedBlogs', JSON.stringify([...likedBlogs, id]));
    }

    // Update blog in local storage with new like count
    localStorage.setItem(id, JSON.stringify(updatedBlog));

    // Update local state
    setIsLiked(!isLiked);
    setBlog(updatedBlog);
  };

  // Handle Comment submission (front-end only)
  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { text: comment }]); // Add new comment to the list
      setComment(""); // Clear the input
    }
  };

  // Handle Add to Favorites (Add blog to localStorage)
  const handleAddToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.find((fav) => fav._id === blog._id)) {
      favorites.push(blog);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Blog added to favorites!");
    } else {
      alert("Blog is already in your favorites!");
    }
  };

  // Read Aloud functionality using Web Speech API
  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(blog.content);
      // Optional: Set properties for the speech
      utterance.voice = speechSynthesis.getVoices()[0]; // Select the first available voice
      utterance.pitch = 1; // Set pitch
      utterance.rate = 1;  // Set rate of speech
      speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support speech synthesis.");
    }
  };

  // Loading state while blog is being fetched
  if (!blog) return <h2>Loading...</h2>;

  return (
    <div>
      <Navbar />
      <div className="blog-detail-container">
        <h1 className="blog-detail-title">{blog.title}</h1>
        <div className="blog-detail-body">
          <div className="blog-detail-left">
            <img className="blog-detail-image" src={blog.image} alt="Blog" />
          </div>
          <div className="blog-detail-right">
            <div className="blog-detail-content">
              <p>{blog.content}</p>
              <div className="blog-detail-actions">
                <button className="like-button" onClick={handleLike}>
                  {isLiked ? "👎 Unlike" : "👍 Like"} {blog.likes}
                </button>
                <button className="update-button" onClick={() => navigate(`/edit-blog/${id}`)}>Update</button>
                <button className="delete-button" onClick={() => navigate("/")}>Delete</button>
                <button className="read-aloud-button" onClick={handleReadAloud}>Read Aloud</button> {/* Read Aloud Button */}
                <button className="favorites-button" onClick={handleAddToFavorites}>Add to Favorites</button> {/* Add to Favorites */}
              </div>

              <div className="comments-section">
                <h3>Comments</h3>
                <ul className="comments-list">
                  {comments.length > 0 ? (
                    comments.map((c, index) => (
                      <li key={index} className="comment-item">
                        <p>{c.text}</p>
                      </li>
                    ))
                  ) : (
                    <li>No comments yet.</li>
                  )}
                </ul>

                <form className="comment-form" onSubmit={handleComment}>
                  <input
                    className="comment-input"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                  <button className="comment-button" type="submit">Comment</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
