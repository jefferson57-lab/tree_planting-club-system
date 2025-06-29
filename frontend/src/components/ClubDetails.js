// src/components/ClubDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchClub } from '../api';
import MembershipForm from './MembershipForm';

function ClubDetails() {
  const { id } = useParams();
  const [club, setClub] = useState(null);

  const loadClub = () => {
    fetchClub(id).then(setClub);
  };

  useEffect(() => {
    loadClub();
  }, [id]);

  if (!club) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{club.name}</h2>
          <p className="card-text">{club.description}</p>
          <p><strong>Location:</strong> {club.location}</p>
        </div>
      </div>

      <h3>Members</h3>
      <ul className="list-group mb-4">
        {club.memberships && club.memberships.length > 0 ? (
          club.memberships.map(m => (
            <li key={m.id} className="list-group-item">
              {m.user ? m.user.username : `User ${m.user_id}`} ({m.role})
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
            <li key={event.id} className="list-group-item">
              <Link to={`/events/${event.id}`}>
                {event.name} – {new Date(event.date).toLocaleDateString()}
              </Link>
              <div>
                <small>{event.description}</small>
                <br />
                <small>Trees planted: {event.trees_planted}</small>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item">No events yet.</li>
        )}
      </ul>

      <h3>Join This Club</h3>
      <MembershipForm clubId={club.id} onMembershipCreated={loadClub} />
    </div>
  );
}

export default ClubDetails;
