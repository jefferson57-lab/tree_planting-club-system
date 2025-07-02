import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="mb-4 text-center">Sign Up</h2>
          <Formik
            initialValues={{ username: "", email: "", password: "", role: "user" }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              })
                .then((res) => res.json().then((data) => ({ status: res.status, data })))
                .then(({ status, data }) => {
                  if (status === 201) {
                    navigate("/login");
                  } else {
                    setErrors({ email: data.error || "Signup failed" });
                  }
                })
                .finally(() => setSubmitting(false));
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <Field name="username" className="form-control" />
                  <ErrorMessage name="username" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <Field name="password" type="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Sign up as</label>
                  <Field as="select" name="role" className="form-select">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Field>
                </div>

                <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
          <p className="mt-3 text-center">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;