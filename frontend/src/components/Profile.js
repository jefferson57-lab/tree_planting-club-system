// src/components/Profile.js
import React, { useEffect, useState } from "react";

function Profile() {
  const [memberships, setMemberships] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState({ username: "", email: "" });

  useEffect(() => {
    const userId = Number(localStorage.getItem("user_id"));

    fetch(`/api/memberships`)
      .then((res) => res.json())
      .then((data) => {
        const userMemberships = data.filter((m) => m.user_id === userId);
        setMemberships(userMemberships);
        if (userMemberships.length > 0 && userMemberships[0].user) {
          setUser(userMemberships[0].user);
          setEditValues({
            username: userMemberships[0].user.username,
            email: userMemberships[0].user.email,
          });
        } else {
          fetch(`/api/auth/users/${userId}`)
            .then((res) => res.json())
            .then((u) => {
              setUser(u);
              setEditValues({ username: u.username, email: u.email });
            })
            .catch(() => setUser(null));
        }
      });

    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        const userReviews = data.filter((r) => r.user_id === userId);
        setReviews(userReviews);
      });
  }, []);

  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const userId = Number(localStorage.getItem("user_id"));
    await fetch(`/api/auth/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editValues),
    });
    setEditing(false);
    setUser({ ...user, ...editValues });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow mb-4">
        <div className="card-body">
          <h2>
            {user ? `Hey ${user.username}` : "Your Profile"}
            {user && (
              <span className={`badge ms-2 ${user.role === "admin" ? "bg-danger" : "bg-secondary"}`}>
                {user.role}
              </span>
            )}
          </h2>
          {editing ? (
            <form onSubmit={handleEditSubmit}>
              <input
                name="username"
                value={editValues.username}
                onChange={handleEditChange}
                className="form-control mb-2"
                placeholder="Username"
              />
              <input
                name="email"
                value={editValues.email}
                onChange={handleEditChange}
                className="form-control mb-2"
                placeholder="Email"
              />
              <button type="submit" className="btn btn-success btn-sm me-2">Save</button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>Cancel</button>
            </form>
          ) : (
            <button className="btn btn-primary btn-sm mb-3" onClick={() => setEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h3>Joined Clubs</h3>
        <ul className="list-group">
          {memberships.map((m) => (
            <li key={m.id} className="list-group-item">
              Club: {m.club && m.club.name ? m.club.name : m.club_id}
              , Role: <span className="badge bg-info">{m.role}</span>, Joined: {m.joined_at}
            </li>
          ))}
          {memberships.length === 0 && (
            <li className="list-group-item text-muted">No club memberships yet.</li>
          )}
        </ul>
      </div>

      <div className="mb-4">
        <h3>Your Reviews</h3>
        <ul className="list-group">
          {reviews.map((r) => (
            <li key={r.id} className="list-group-item">
              Event ID: {r.event_id} | ⭐ {r.rating} <br />
              "{r.comment}" on {r.created_at}
            </li>
          ))}
          {reviews.length === 0 && (
            <li className="list-group-item text-muted">No reviews yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
