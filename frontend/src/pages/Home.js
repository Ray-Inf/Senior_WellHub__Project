import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css"; // Import CSS file for styling

const HomePage = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    // Clear user data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("patientId");
    // Redirect to the login page
    navigate("/login");
  };

  // Assume you have a way to get the user's name from local storage or context
  const userName = "John Doe"; // Replace with actual user data retrieval logic

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <h1>SeniorWell Hub</h1>
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      </header>
      <div className="container">
        <h1 className="welcome-text">Welcome to SeniorWell Hub</h1>
        <div className="section">
          <h2>Our Doctors</h2>
          <p>Meet our experienced medical professionals:</p>
          <Link to="/our-doctors">
            <button className="btn">View Doctors</button>
          </Link>
        </div>
        <div className="section">
          <h2>Medication Management</h2>
          <p>Set reminder for medicines</p>
          <Link to="/medicine">
            <button className="btn">View Medicines</button>
          </Link>
        </div>
        <div className="section">
          <h2>Doctor Appointment Booking</h2>
          <p>Click below to book an appointment:</p>
          <Link to="/book-appointment">
            <button className="btn">Book Appointment</button>
          </Link>
        </div>
        <div className="section">
          <h2>Events</h2>
          <p>Check out upcoming events:</p>
          <Link to="/calendar">
            <button className="btn">View Calendar</button>
          </Link>
        </div>
        <div className="section">
          <h2>About</h2>
          <p>Contact Us</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
