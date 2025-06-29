import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Signup() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
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
            <label>Username</label>
            <Field name="username" />
            <ErrorMessage name="username" component="div" />

            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />

            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />

            <button type="submit" disabled={isSubmitting}>Sign Up</button>
          </Form>
        )}
      </Formik>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Signup;