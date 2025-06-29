// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark" style={{ backgroundColor: "#228B22" }}>
      <div className="container-fluid">
        <span className="navbar-brand">🌱 Tree Club</span>
        <div className="navbar-nav">
          <Link className="nav-link" to="/clubs">Clubs</Link>
          <Link className="nav-link" to="/create-club">Create Club</Link>
          <Link className="nav-link" to="/create-event">Create Event</Link>
          <Link className="nav-link" to="/profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
