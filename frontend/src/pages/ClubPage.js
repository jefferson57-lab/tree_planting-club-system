import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchClub } from '../api';
import MembershipForm from '../components/MembershipForm';

function ClubPage() {
  const { id } = useParams();
  const [club, setClub] = useState(null);

  useEffect(() => {
    fetchClub(id).then(setClub);
  }, [id]);

  if (!club) return <div className="container mt-4"><div className="alert alert-info">Loading...</div></div>;

  return (
    <div className="container mt-4">
      <div className="card mb-4 shadow">
        <div className="card-body">
          <h2 className="card-title">{club.name}</h2>
          <p className="card-text">{club.description}</p>
          <span className="badge bg-success mb-2">{club.location}</span>
        </div>
      </div>

      <div className="mb-4">
        <h3>Events</h3>
        <ul className="list-group">
          {club.events.map(event => (
            <li key={event.id} className="list-group-item">
              <Link to={`/events/${event.id}`}>
                {event.name} — {new Date(event.date).toLocaleDateString()}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3>Join Club</h3>
        <MembershipForm clubId={club.id} />
      </div>
    </div>
  );
}

export default ClubPage;
