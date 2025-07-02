import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEvent } from '../api';
import ReviewForm from '../components/ReviewForm';

function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvent(id).then(setEvent);
  }, [id]);

  if (!event) return <div className="container mt-4"><div className="alert alert-info">Loading event...</div></div>;

  return (
    <div className="container mt-4">
      <div className="card mb-4 shadow">
        <div className="card-body">
          <h2 className="card-title">{event.name}</h2>
          <p className="card-text">{event.description}</p>
          <span className="badge bg-info mb-2">Date: {new Date(event.date).toLocaleDateString()}</span>
          <span className="badge bg-success ms-2 mb-2">Trees Planted: {event.trees_planted}</span>
        </div>
      </div>

      <div className="mb-4">
        <h3>Reviews</h3>
        {event.reviews.length === 0 ? (
          <div className="alert alert-secondary">No reviews yet.</div>
        ) : (
          <ul className="list-group">
            {event.reviews.map(review => (
              <li key={review.id} className="list-group-item">
                ⭐ {review.rating} — {review.comment} (User {review.user_id})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <h3>Leave a Review</h3>
        <ReviewForm eventId={event.id} />
      </div>
    </div>
  );
}

export default EventPage;
