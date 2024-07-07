import React from "react";
import { Link } from "react-router-dom";
import "./OurDoctors.css"; // Import CSS file for styling

const OurDoctors = () => {
  const doctors = [
    {
      name: "Dr. John Doe",
      specialization: "Cardiologist",
      picture: "https://via.placeholder.com/300", // Placeholder image URL
    },
    {
      name: "Dr. Jane Smith",
      specialization: "Pediatrician",
      picture: "https://via.placeholder.com/300", // Placeholder image URL
    },
    {
      name: "Dr. Michael Brown",
      specialization: "Orthopedic Surgeon",
      picture: "https://via.placeholder.com/300", // Placeholder image URL
    },
    {
      name: "Dr. Emily Davis",
      specialization: "Dermatologist",
      picture: "https://via.placeholder.com/300", // Placeholder image URL
    },
    {
      name: "Dr. William Johnson",
      specialization: "Neurologist",
      picture: "https://via.placeholder.com/300", // Placeholder image URL
    },
    {
      name: "Dr. Linda Wilson",
      specialization: "Oncologist",
      picture: "https://via.placeholder.com/300", // Placeholder image URL
    },
  ];

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
              <img src={doctor.picture} alt={doctor.name} className="doctor-picture" />
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
