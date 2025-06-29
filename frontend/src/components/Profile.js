// src/components/Profile.js
import React, { useEffect, useState } from "react";

function Profile() {
  const [memberships, setMemberships] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/api/memberships")
      .then((res) => res.json())
      .then((data) => {
        const userMemberships = data.filter((m) => m.user_id === 1);
        setMemberships(userMemberships);
      });

    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        const userReviews = data.filter((r) => r.user_id === 1);
        setReviews(userReviews);
      });
  }, []);

  return (
    <div>
      <h2>Your Profile</h2>

      <h3>Joined Clubs</h3>
      <ul>
        {memberships.map((m) => (
          <li key={m.id}>
            Club ID: {m.club_id}, Role: {m.role}, Joined: {m.joined_at}
          </li>
        ))}
      </ul>

      <h3>Your Reviews</h3>
      <ul>
        {reviews.map((r) => (
          <li key={r.id}>
            Event ID: {r.event_id} | ⭐ {r.rating} <br />
            "{r.comment}" on {r.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
