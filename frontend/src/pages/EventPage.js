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

  if (!event) return <p>Loading event...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Trees Planted:</strong> {event.trees_planted}</p>

      <h3>Reviews</h3>
      {event.reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {event.reviews.map(review => (
            <li key={review.id}>
              ⭐ {review.rating} — {review.comment} (User {review.user_id})
            </li>
          ))}
        </ul>
      )}

      <h3>Leave a Review</h3>
      <ReviewForm eventId={event.id} />
    </div>
  );
}

export default EventPage;
