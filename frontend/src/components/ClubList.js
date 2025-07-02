// src/components/ClubList.js
import React, { useEffect, useState } from 'react';
import { fetchClubs } from '../api';
import { Link } from 'react-router-dom';

function ClubList() {
  const [clubs, setClubs] = useState([]);

  const loadClubs = () => {
    fetchClubs().then(data => setClubs(data));
  };

  useEffect(() => {
    loadClubs();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">All Tree Planting Clubs</h2>
      <div className="row">
        {clubs.map(club => (
          <div key={club.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{club.name}</h5>
                <p className="card-text">{club.description}</p>
                <span className="badge bg-success mb-2">{club.location}</span>
                <br />
                <Link to={`/clubs/${club.id}`} className="btn btn-outline-primary btn-sm mt-2">
                  View Club
                </Link>
              </div>
            </div>
          </div>
        ))}
        {clubs.length === 0 && (
          <div className="col-12 text-center text-muted">No clubs found.</div>
        )}
      </div>
    </div>
  );
}

export default ClubList;
