import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
});

function CreateClub({ onClubCreated }) {
  return (
    <div className="container">
      <h3>Create a New Club</h3>
      <Formik
        initialValues={{
          name: "",
          description: "",
          location: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const owner_id = localStorage.getItem("user_id");
          fetch("/api/clubs/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...values, owner_id: Number(owner_id) }),
          })
            .then((res) => res.json())
            .then((club) => {
              alert("Club created!");
              resetForm();
              if (onClubCreated) onClubCreated(club);
            })
            .catch(() => alert("Error creating club"))
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
              <ErrorMessage
                name="description"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <Field className="form-control" name="location" />
              <ErrorMessage name="location" component="div" className="text-danger" />
            </div>

            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Create Club
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateClub;