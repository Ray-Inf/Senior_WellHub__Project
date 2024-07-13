import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./OurDoctors.css"; // Import CSS file for styling

const OurDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/doctors/");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <h1 className="page-title">Our Doctors</h1>
          <Link to="/home" className="home-link">
            <button className="home-btn">Home</button>
          </Link>
        </div>
      </header>
      <div className="doctors-container">
        <div className="doctors-list">
          {doctors.map((doctor, index) => (
            <div className="doctor-card" key={index}>
              <img
                src={
                  doctor.image
                    ? doctor.image
                    : "https://via.placeholder.com/300"
                }
                alt={doctor.name}
                className="doctor-picture"
              />
              <div className="doctor-info">
                <h2>{doctor.name}</h2>
                <p>{doctor.specialization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurDoctors;
