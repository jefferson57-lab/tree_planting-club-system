import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchClub } from '../api';
import MembershipForm from '../components/MembershipForm';

function ClubPage() {
  const { id } = useParams();
  const [club, setClub] = useState(null);

  useEffect(() => {
    fetchClub(id).then(setClub);
  }, [id]);

  if (!club) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{club.name}</h2>
      <p>{club.description}</p>
      <p><strong>Location:</strong> {club.location}</p>

      <h3>Events</h3>
      <ul>
        {club.events.map(event => (
          <li key={event.id}>
            <a href={`/events/${event.id}`}>
              {event.name} — {new Date(event.date).toLocaleDateString()}
            </a>
          </li>
        ))}
      </ul>

      <h3>Join Club</h3>
      <MembershipForm clubId={club.id} />
    </div>
  );
}

export default ClubPage;
