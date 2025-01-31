import '../css/MyBlogs.css';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all blogs
    axios
      .get("http://localhost:5000/api/blogs") // No userId needed
      .then((res) => {
        console.log("Fetched blogs: ", res.data); // Debugging log
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError("There was an issue fetching the blogs.");
        setLoading(false);
      });
  }, []); // Empty dependency array to fetch once on mount

  return (
    <div>
      <Navbar />
      <div className="myblogs-container">
        <h1 className="myblogs-title">All Blogs</h1>
        {loading && <p className="loading-message">Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {blogs.length > 0 ? (
          <div className="blog-list">
            {blogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                {blog.image && <img src={blog.image} alt="Blog" className="blog-image" />}
                <div className="blog-content">
                  <h2 className="blog-title">{blog.title}</h2>
                  <p className="blog-excerpt">
                    {blog.content.length > 100 ? `${blog.content.substring(0, 100)}...` : blog.content}
                  </p>
                  <Link to={`/blog/${blog._id}`} className="read-more-link">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-blogs">No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
