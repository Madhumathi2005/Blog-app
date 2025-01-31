import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/Home.css';
import Navbar from "./Navbar";
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate hook for routing

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs")
      .then((res) => {
        setBlogs(res.data);
        if (res.data.length > 0) {
          setFeaturedBlog(res.data[Math.floor(Math.random() * res.data.length)]); // Random featured blog
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError("There was an issue fetching the blogs.");
        setLoading(false);
      });
  }, []);

  // Handle "Read More" button click
  const handleReadMore = (id) => {
    navigate(`/blog/${id}`);  // Navigate to the blog detail page using the blog ID
  };

  return (
    <div>
      <Navbar />
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to My Blog</h1>
          <p>Explore inspiring stories, tips, and ideas from passionate writers.</p>
          <button className="hero-btn" onClick={() => navigate('/create')}>Create Your Blog</button>
        </div>
      </div>

      {/* Featured Blog */}
      {featuredBlog && (
        <div className="featured-blog">
          <h2 className="featured-title">Featured Blog</h2>
          <div className="featured-content">
            <img src={featuredBlog.image} alt="Featured" className="featured-image" />
            <div className="featured-details">
              <h2>{featuredBlog.title}</h2>
              <p>{featuredBlog.content.substring(0, 150)}...</p>
              {/* Replaced Link with Button */}
              <button onClick={() => handleReadMore(featuredBlog._id)} className="read-more-btn">
                Read More
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog List */}
      <h1 className="home-title">Our Latest Blog Posts</h1>
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
                {/* Replaced Link with Button */}
                <button onClick={() => handleReadMore(blog._id)} className="read-more-btn">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-blogs">No blogs available</p>
      )}
    </div>
    </div>
  );
};

export default Home;
