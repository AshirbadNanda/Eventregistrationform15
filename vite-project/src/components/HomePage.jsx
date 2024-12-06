import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const events = ["Sports", "Marathon", "Start Up"];

  return (
    <div className="home-page-container">
      <h2>Upcoming Events</h2>
      <div className="events-container">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <h3>{event}</h3>
            <p>Click to register for {event}</p>
            <Link to={`/event/${event}/register`} className="register-btn">
              Register
            </Link>
            <Link to={`/event/${event}`} className="view-registrations-btn">
              View Registrations
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
