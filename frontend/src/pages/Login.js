import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Login({ setAuth }) {
  const navigate = useNavigate();

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="mb-4 text-center">Login</h2>
          <Formik
            initialValues={{ email: "", password: "", role: "user" }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: values.email, password: values.password }),
              })
                .then((res) => res.json().then((data) => ({ status: res.status, data })))
                .then(({ status, data }) => {
                  if (status === 200) {
                    localStorage.setItem("token", data.access_token);
                    localStorage.setItem("user_id", data.user_id);
                    localStorage.setItem("role", data.role); // Store role from backend
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
                  <label className="form-label">Login as</label>
                  <Field as="select" name="role" className="form-select" disabled>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Field>
                  <div className="form-text">
                    Your actual role is determined by your account.
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <p className="mt-3 text-center">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;