// src/forms/CreateEvent.js
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authHeaders } from "../../api";

const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.string().required("Date is required"),
  trees_planted: Yup.number()
    .positive("Must be positive")
    .integer("Must be an integer")
    .required("Trees planted is required"),
  club_id: Yup.number().required("Club is required"),
});

function CreateEvent({ onEventCreated }) {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetch("/api/clubs")
      .then((res) => res.json())
      .then(setClubs)
      .catch((err) => console.error("Error loading clubs:", err));
  }, []);

  return (
    <div className="container">
      <h3>Create a New Event</h3>
      <Formik
        initialValues={{
          name: "",
          description: "",
          date: "",
          trees_planted: "",
          club_id: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const payload = {
            ...values,
            date: new Date(values.date).toISOString(),
          };
          fetch("/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json", ...authHeaders() },
            body: JSON.stringify(payload),
          })
            .then((res) => res.json())
            .then((event) => {
              alert("Event created!");
              resetForm();
              if (onEventCreated) onEventCreated(event);
            })
            .catch(() => alert("Error creating event"))
            .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <Field className="form-control" name="name" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <Field className="form-control" name="description" />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label className="form-label">Date</label>
              <Field className="form-control" name="date" type="date" />
              <ErrorMessage name="date" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label className="form-label">Trees Planted</label>
              <Field className="form-control" name="trees_planted" type="number" />
              <ErrorMessage name="trees_planted" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label className="form-label">Club</label>
              <Field className="form-select" name="club_id" as="select">
                <option value="">Select a club</option>
                {clubs.map((club) => (
                  <option key={club.id} value={club.id}>
                    {club.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="club_id" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-success" disabled={isSubmitting}>
              Create Event
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateEvent;
