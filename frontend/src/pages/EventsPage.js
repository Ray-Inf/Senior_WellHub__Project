import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './EventsPage.css';  // Import the CSS file

function JulyEventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const julyEvents = [
    { id: 1, title: 'Senior Yoga Session', date: 'July 10, 2024', location: 'Community Center', time: '10:00 AM' },
    { id: 2, title: 'Health Seminar: Nutrition Tips', date: 'July 15, 2024', location: 'Senior Hall', time: '2:00 PM' },
    { id: 3, title: 'Walking Club Meetup', date: 'July 17, 2024', location: 'Park Entrance', time: '8:00 AM' },
    { id: 4, title: 'Art Class for Seniors', date: 'July 20, 2024', location: 'Art Studio', time: '1:00 PM' },
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <h1 className="page-title">Community Events</h1>
          <Link to="/home" className="home-link">
            <button className="home-btn">Home</button>
          </Link>
        </div>
      </header>
      <div className="events-container">
        <h2 className="events-title">Events in July</h2>
        <ul className="events-list">
          {julyEvents.map(event => (
            <li key={event.id} className="event-item" onClick={() => handleEventClick(event)}>
              <strong className="event-title">{event.title}</strong>
              <span className="event-date">{event.date}</span>
            </li>
          ))}
        </ul>
        {selectedEvent && (
          <div className="event-details">
            <h3 className="event-details-title">{selectedEvent.title}</h3>
            <p className="event-details-info">Date: {selectedEvent.date}</p>
            <p className="event-details-info">Location: {selectedEvent.location}</p>
            <p className="event-details-info">Time: {selectedEvent.time}</p>
            <button className="close-button" onClick={handleClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default JulyEventsPage;
