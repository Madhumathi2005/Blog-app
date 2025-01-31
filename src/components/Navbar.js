import '../css/Navbar.css';
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">My Blog</h2>
      <div className="navbar-links">
        <Link to="/Home" className="navbar-link">Home</Link>
        <Link to="/create" className="navbar-link">Create</Link>
        <Link to="/myblogs" className="navbar-link">My Blogs</Link>  
        <Link to="/favorites" className="navbar-link">My Favorites</Link>  
        <Link to="/drafts" className="navbar-link">Drafts</Link>  {/* Added Drafts link */}
        <Link to="/profile" className="navbar-link">Profile</Link>
        <Link to="/contact" className="navbar-link">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
