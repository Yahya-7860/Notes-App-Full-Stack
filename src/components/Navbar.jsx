import React from "react";
import "../CSS Folder/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const hclick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/login");
  };
  const username = localStorage.getItem("username");
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Notes App</h1>
      </div>
      <div className="navbar-links">
        <span className="welcome-message">Hello, {username}</span>
        <button className="navbar-button">
          <a className="navRegister" href="/register">
            Register New User
          </a>
        </button>
        <button className="navbar-button logout" onClick={hclick}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
