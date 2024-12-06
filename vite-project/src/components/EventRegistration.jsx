import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./EventRegistration.css";

function EventRegistration() {
  const { eventName } = useParams();
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/registrations/${eventName}`)
      .then((response) => {
        setRegistrations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching registrations:", error);
      });
  }, [eventName]);

  return (
    <div className="registrations-container">
      <h1>Registrations for {eventName}</h1>
      {registrations.length > 0 ? (
        <div className="registration-cards">
          {registrations.map((reg) => (
            <div key={reg._id} className="registration-card">
              <h3>{reg.name}</h3>
              <p>Email: {reg.email}</p>
              <p>Event Date: {new Date(reg.eventDate).toLocaleDateString()}</p>
              <p>Message: {reg.message}</p>
              {reg.image && <img src={reg.image} alt="User's image" />}
            </div>
          ))}
        </div>
      ) : (
        <p>No students have registered for this event yet.</p>
      )}
    </div>
  );
}

export default EventRegistration;
