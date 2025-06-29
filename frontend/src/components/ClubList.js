// src/components/ClubList.js
import React, { useEffect, useState } from 'react';
import { fetchClubs } from '../api';
import { Link } from 'react-router-dom';
import CreateClub from './forms/CreateClub';

function ClubList() {
  const [clubs, setClubs] = useState([]);

  const loadClubs = () => {
    fetchClubs().then(data => setClubs(data));
  };

  useEffect(() => {
    loadClubs();
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">All Tree Planting Clubs</h2>
      <CreateClub onClubCreated={loadClubs} />
      <ul className="list-group mt-4">
        {clubs.map(club => (
          <li key={club.id} className="list-group-item">
            <Link to={`/clubs/${club.id}`}>
              <strong>{club.name}</strong> – {club.location}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClubList;
