// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ClubList from "./ClubList";
import ClubDetails from "./ClubDetails";
import EventDetails from "./EventDetails";
import CreateClub from "./forms/CreateClub";
import CreateEvent from "./forms/CreateEvent";
import Profile from './Profile';
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function PrivateRoute({ children, auth }) {
  const location = useLocation();
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    setAuth(!!localStorage.getItem("token"));
  }, []);

  return (
    <div>
      {auth && <Navbar />}
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/*"
            element={
              <PrivateRoute auth={auth}>
                <Routes>
                  <Route path="/" element={<ClubList />} />
                  <Route path="/clubs" element={<ClubList />} />
                  <Route path="/clubs/:id" element={<ClubDetails />} />
                  <Route path="/events/:id" element={<EventDetails />} />
                  <Route path="/create-club" element={<CreateClub />} />
                  <Route path="/create-event" element={<CreateEvent />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
