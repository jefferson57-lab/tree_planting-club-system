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

  const isAdmin = localStorage.getItem("role") === "admin";

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

  if (!event) return <div className="container mt-4"><div className="alert alert-info">Loading...</div></div>;

  return (
    <div className="container mt-4">
      <div className="card mb-4 shadow">
        <div className="card-body">
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
              {isAdmin && (
                <button type="submit" className="btn btn-success btn-sm me-2">
                  Save
                </button>
              )}
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
              <h2 className="card-title">{event.name}</h2>
              <p className="card-text">{event.description}</p>
              <span className="badge bg-info mb-2">Date: {event.date}</span>
              <span className="badge bg-success ms-2 mb-2">Trees planted: {event.trees_planted}</span>
              {isAdmin && (
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => setEditing(true)}
                >
                  Edit Event
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h3>Reviews</h3>
        <ul className="list-group">
          {reviews.length === 0 ? (
            <li className="list-group-item text-muted">No reviews yet.</li>
          ) : (
            reviews.map((r) => (
              <li key={r.id} className="list-group-item">
                <span className="me-2">⭐ {r.rating}</span>
                {r.comment}
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="mb-4">
        <h4>Leave a Review</h4>
        <Formik
          initialValues={{ rating: "", comment: "" }}
          validationSchema={reviewSchema}
          onSubmit={handleSubmitReview}
        >
          <Form>
            <div className="mb-2">
              <label className="form-label">Rating</label>
              <Field as="select" name="rating" className="form-select">
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="rating" component="div" className="text-danger" />
            </div>
            <div className="mb-2">
              <label className="form-label">Comment</label>
              <Field name="comment" className="form-control" />
              <ErrorMessage name="comment" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-success btn-sm">Submit Review</button>
          </Form>
        </Formik>
      </div>

      {isAdmin && (
        <button className="btn btn-danger mb-3" onClick={handleDelete}>
          Delete Event
        </button>
      )}
    </div>
  );
}

export default EventDetails;
