// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand navbar-dark" style={{ backgroundColor: "#228B22" }}>
      <div className="container-fluid">
        <span className="navbar-brand">🌱 Tree Club</span>
        <div className="navbar-nav">
          <Link className="nav-link" to="/clubs">Clubs</Link>
          <Link className="nav-link" to="/create-club">Create Club</Link>
          <Link className="nav-link" to="/create-event">Create Event</Link>
          <Link className="nav-link" to="/profile">Profile</Link>
          <button className="nav-link btn btn-link" style={{ color: "#fff", textDecoration: "none" }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
