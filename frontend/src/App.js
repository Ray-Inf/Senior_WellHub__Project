import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/Home";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import OurDoctors from "./pages/doctors";
import Medicine from "./pages/Medicine";
import Medrem from "./pages/medrem";
import Addrem from "./pages/addrem";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Login />} />
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/our-doctors" element={<OurDoctors />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/medication-reminder" element={<Medrem />} />
        <Route path="/add-medication" element={<Addrem />} />
      </Routes>
    </Router>
  );
};

export default App;
