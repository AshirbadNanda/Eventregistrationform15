import React, { useState } from "react";
import axios from "axios";
import "./EventRegistrationForm.css";

const EventRegistrationForm = ({ eventName }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventDate: "",
    message: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("event", eventName);
    formDataToSend.append("eventDate", formData.eventDate);
    formDataToSend.append("message", formData.message);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      const res = await axios.post(
        "http://localhost:7000/api/register",
        formDataToSend
      );
      setMessage(res.data.message);
    } catch (error) {
      setMessage("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-form-container">
      <h2 className="heading">Register for {eventName}</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Event Date</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message..."
          />
        </div>
        <div className="form-group">
          <label>Upload Image (Optional)</label>
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EventRegistrationForm;
