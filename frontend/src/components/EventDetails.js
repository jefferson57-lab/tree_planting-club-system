// src/components/EventDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then((ev) => {
        setEvent(ev);
        setEditValues({
          name: ev.name,
          description: ev.description,
          date: ev.date ? ev.date.slice(0, 10) : "",
          trees_planted: ev.trees_planted,
        });
      });

    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((r) => r.event_id === parseInt(id));
        setReviews(filtered);
      });
  }, [id]);

  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editValues),
    });
    setEditing(false);
    // reload event
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then(setEvent);
  };

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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await fetch(`/api/events/${id}`, { method: "DELETE" });
      navigate("/clubs");
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      {editing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            name="name"
            value={editValues.name}
            onChange={handleEditChange}
            className="form-control mb-2"
            placeholder="Name"
          />
          <textarea
            name="description"
            value={editValues.description}
            onChange={handleEditChange}
            className="form-control mb-2"
            placeholder="Description"
          />
          <input
            name="date"
            type="date"
            value={editValues.date}
            onChange={handleEditChange}
            className="form-control mb-2"
          />
          <input
            name="trees_planted"
            type="number"
            value={editValues.trees_planted}
            onChange={handleEditChange}
            className="form-control mb-2"
            placeholder="Trees Planted"
          />
          <button type="submit" className="btn btn-success btn-sm me-2">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <p>Date: {event.date}</p>
          <p>Trees planted: {event.trees_planted}</p>
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => setEditing(true)}
          >
            Edit Event
          </button>
        </>
      )}

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

      <button className="btn btn-danger mb-3" onClick={handleDelete}>
        Delete Event
      </button>
    </div>
  );
}

export default EventDetails;
