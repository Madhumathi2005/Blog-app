import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage"; 
import Login from "./components/Login"; 
import Register from "./components/Register"; 
import Home from "./components/Home";
import CreateBlog from "./components/CreateBlog";
import BlogDetail from "./components/BlogDetail";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import EditBlog from "./components/EditBlog"; 
import MyBlogs from "./components/MyBlogs";
import Favorites from './components/Favorites';
import DraftsPage from "./components/DraftPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} /> {/* First Page, before login */}
        
        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 

        {/* Main App Pages (Visible after Login) */}
        <Route path="/home" element={<Home />} /> 
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/drafts" element={<DraftsPage />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
