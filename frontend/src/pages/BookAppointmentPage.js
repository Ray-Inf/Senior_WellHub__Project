import React, { useState, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import "./BookAppointmentPage.css"; // Import CSS file for styling
import axios from "axios";
import Notification from "./Notification";

const BookAppointmentPage = () => {
  const [doctorName, setDoctorName] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [date_time, setDate_time] = useState("");
  const [reason, setReason] = useState("");
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch doctors from the backend
    axios
      .get("http://127.0.0.1:8000/api/doctors/")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the doctors!", error);
      });
  }, []);

  useEffect(() => {
    if (showSuccessPopup) {
      // Navigate to home page after a delay (example: 3 seconds)
      setTimeout(() => {
        navigate("/");
      }, 3000); // Redirect after 3 seconds
    }
  }, [showSuccessPopup, navigate]);

  useEffect(() => {
    const storedPatientId = localStorage.getItem("patientId");
    if (storedPatientId) {
      setPatientId(storedPatientId); // Example: Retrieve patientId from localStorage
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId) {
      console.error("PatientId is not set!");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/appointments",
        {
          doctor: doctorName,
          patient: patientId,
          date_time: date_time,
          reason: reason,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      setShowSuccessPopup(true);

      console.log("Appointment booked successfully:", response.data);
    } catch (error) {
      if (error.response) {
        const { doctor, patient } = error.response.data;
        if (doctor) {
          console.error("Doctor validation error:", doctor);
          // Handle/display doctor validation error
        }
        if (patient) {
          console.error("Patient validation error:", patient);
          // Handle/display patient validation error
        }
        // Handle other validation errors or generic error message
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div>
      <header className="header">
        <div className="header-content">
        <h1 className="page-title">Book Appointment</h1>
          <Link to="/home" className="home-link">
            <button className="home-btn">Home</button>
          </Link>
        </div>
      </header>
      <div className="container">
        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-group">
            <label>Doctor Name:</label>
            <select
              value={doctorName || ""}
              onChange={(e) => setDoctorName(e.target.value)}
              required
              className="select-doctor"
            >
              <option value="" className="select-doctor">Select a Doctor</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Patient Name:</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Appointment Time:</label>
            <input
              type="datetime-local"
              value={date_time}
              onChange={(e) => setDate_time(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Reason for Appointment:</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
          <div>
          <button type="submit" className="btn">
            Submit
          </button>
          {showSuccessPopup && (
            <Notification
              message="Appointment booked successfully!"
              onClose={() => setShowSuccessPopup(false)}
            />
          )}
          </div>
          <div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/home")}
          >
            Cancel
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointmentPage;