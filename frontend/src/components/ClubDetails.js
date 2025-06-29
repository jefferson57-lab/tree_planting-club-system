// src/components/ClubDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchClub } from '../api';
import MembershipForm from './MembershipForm';

function ClubDetails() {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState({});
  const navigate = useNavigate();

  const loadClub = () => {
    fetchClub(id).then(club => {
      setClub(club);
      setEditValues({
        name: club.name,
        description: club.description,
        location: club.location,
      });
    });
  };

  useEffect(() => {
    loadClub();
  }, [id]);

  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/clubs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editValues),
    });
    setEditing(false);
    loadClub();
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this club?")) {
      await fetch(`/api/clubs/${id}`, { method: "DELETE" });
      navigate("/clubs");
    }
  };

  if (!club) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="card mb-4">
        <div className="card-body">
          {editing ? (
            <form onSubmit={handleEditSubmit}>
              <input
                name="name"
                value={editValues.name}
                onChange={handleEditChange}
                className="form-control mb-2"
                placeholder="Name"
              />
              <textarea
                name="description"
                value={editValues.description}
                onChange={handleEditChange}
                className="form-control mb-2"
                placeholder="Description"
              />
              <input
                name="location"
                value={editValues.location}
                onChange={handleEditChange}
                className="form-control mb-2"
                placeholder="Location"
              />
              <button type="submit" className="btn btn-success btn-sm me-2">Save</button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>Cancel</button>
            </form>
          ) : (
            <>
              <h2 className="card-title">{club.name}</h2>
              <p className="card-text">{club.description}</p>
              <p><strong>Location:</strong> {club.location}</p>
              <button className="btn btn-primary btn-sm me-2" onClick={() => setEditing(true)}>Edit Club</button>
            </>
          )}
        </div>
      </div>

      <h3>Members</h3>
      <ul className="list-group mb-4">
        {club.memberships && club.memberships.length > 0 ? (
          club.memberships.map(m => (
            <li key={m.id} className="list-group-item d-flex justify-content-between align-items-center">
              {m.user ? m.user.username : `User ${m.user_id}`} ({m.role})
              <button
                className="btn btn-danger btn-sm"
                onClick={async () => {
                  if (window.confirm("Remove this member?")) {
                    await fetch(`/api/memberships/${m.id}`, { method: "DELETE" });
                    loadClub();
                  }
                }}
              >
                Remove
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item">No members yet.</li>
        )}
      </ul>

      <h3>Events</h3>
      <ul className="list-group mb-4">
        {club.events && club.events.length > 0 ? (
          club.events.map(event => (
            <li key={event.id} className="list-group-item d-flex justify-content-between align-items-center">
              <Link to={`/events/${event.id}`}>
                {event.name} – {new Date(event.date).toLocaleDateString()}
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={async () => {
                  if (window.confirm("Delete this event?")) {
                    await fetch(`/api/events/${event.id}`, { method: "DELETE" });
                    loadClub();
                  }
                }}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item">No events yet.</li>
        )}
      </ul>

      <h3>Join This Club</h3>
      <MembershipForm clubId={club.id} onMembershipCreated={loadClub} />

      <button className="btn btn-danger mb-3" onClick={handleDelete}>
        Delete Club
      </button>
    </div>
  );
}

export default ClubDetails;
