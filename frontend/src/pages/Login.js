import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Login({ setAuth }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          })
            .then((res) => res.json().then((data) => ({ status: res.status, data })))
            .then(({ status, data }) => {
              if (status === 200) {
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("user_id", data.user_id);
                setAuth(true);
                navigate("/clubs");
              } else {
                setErrors({ email: "Invalid credentials" });
              }
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />

            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />

            <button type="submit" disabled={isSubmitting}>Login</button>
          </Form>
        )}
      </Formik>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}

export default Login;