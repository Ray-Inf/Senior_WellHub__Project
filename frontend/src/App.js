import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/Home";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import OurDoctors from "./pages/doctors";
import Medicine from "./pages/Medicine";
import Medrem from "./pages/medrem";
import Addrem from "./pages/addrem";
import JulyEventsPage from './pages/EventsPage';
import "./App.css";

import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/current_user",
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          setIsAuthenticated(true);
          console.log("User authenticated:", response.data);
        } catch (error) {
          setIsAuthenticated(false);
          console.error("Error fetching user:", error);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/book-appointment"
          element={<BookAppointmentPage />}
        ></Route>
        <Route path="/our-doctors" element={<OurDoctors />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/medication-reminder" element={<Medrem />} />
        <Route path="/add-medication" element={<Addrem />} />
        <Route path="/events" element={<JulyEventsPage />} />
      </Routes>
    </Router>
  );
};export default App;

