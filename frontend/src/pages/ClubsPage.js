import React, { useEffect, useState } from 'react';
import { fetchClubs } from '../api';
import { Link } from 'react-router-dom';

function ClubsPage() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetchClubs().then(data => setClubs(data));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>All Tree Planting Clubs</h2>
      <ul>
        {clubs.map(club => (
          <li key={club.id}>
            <Link to={`/clubs/${club.id}`}>
              <strong>{club.name}</strong> – {club.location}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClubsPage;
