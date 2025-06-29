// src/components/EventDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const reviewSchema = Yup.object({
  rating: Yup.number().min(1).max(5).required(),
  comment: Yup.string().required(),
});

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then(setEvent);

    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((r) => r.event_id === parseInt(id));
        setReviews(filtered);
      });
  }, [id]);

  const handleSubmitReview = (values, { resetForm }) => {
    fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, event_id: parseInt(id), user_id: 1 }),
    })
      .then((res) => res.json())
      .then((newReview) => {
        setReviews([...reviews, newReview]);
        resetForm();
      });
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Trees planted: {event.trees_planted}</p>

      <h3>Reviews</h3>
      <ul>
        {reviews.map((r) => (
          <li key={r.id}>
            ⭐ {r.rating} - {r.comment}
          </li>
        ))}
      </ul>

      <h4>Leave a Review</h4>
      <Formik
        initialValues={{ rating: "", comment: "" }}
        validationSchema={reviewSchema}
        onSubmit={handleSubmitReview}
      >
        <Form>
          <label>Rating</label>
          <Field as="select" name="rating">
            <option value="">Select</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Field>
          <ErrorMessage name="rating" component="div" />

          <label>Comment</label>
          <Field name="comment" />
          <ErrorMessage name="comment" component="div" />

          <button type="submit">Submit Review</button>
        </Form>
      </Formik>
    </div>
  );
}

export default EventDetails;
