import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css"; // Import CSS file for styling

const HomePage = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) {
        navigate("/login"); // Redirect to login if no token is found
        return;
      }
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/current_user",
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle error (e.g., redirect to login page if authentication fails)
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  const handleSignOut = () => {
    // Clear user data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("patientId");
    // Redirect to the login page
    navigate("/login");
  };

  // Determine user name display
  const userName = user ? user.username : "Guest"; // Fallback if user is not yet fetched

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <h1>SeniorWell Hub</h1>
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <button className="signout-btn" onClick={handleSignOut}>
              Sign Out
            </button>
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
          <p>Set reminder for medicines:</p>
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
          <h2>Community Events</h2>
          <p>Check out upcoming events:</p>
          <Link to="/events">
            <button className="btn">Show Events</button>
          </Link>
        </div>
        <div className="section">
          <h2>About</h2>
          <p>Contact us at <span><strong>9667894567</strong></span></p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
