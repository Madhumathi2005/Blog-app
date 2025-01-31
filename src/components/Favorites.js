import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/Favorites.css';
import Navbar from "./Navbar";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Get favorite blogs from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Remove a blog from favorites
  const handleRemoveFavorite = (blogId) => {
    const updatedFavorites = favorites.filter((blog) => blog._id !== blogId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
  };

  return (
    <div>
      <Navbar />
      <div className="favorites-container">
        <h1>My Favorite Blogs</h1>
        {favorites.length > 0 ? (
          <div className="favorite-blogs-list">
            {favorites.map((blog) => (
              <div key={blog._id} className="favorite-blog-card">
                <img src={blog.image} alt={blog.title} className="favorite-blog-image" />
                <h2>{blog.title}</h2>
                <p>{blog.content.substring(0, 100)}...</p>
                <div className="favorite-buttons">
                  <Link to={`/blog/${blog._id}`} className="favorite-read-more">
                    Read More
                  </Link>
                  <button 
                    className="remove-favorite-btn" 
                    onClick={() => handleRemoveFavorite(blog._id)}
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No favorite blogs yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
