import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import EventRegistrationForm from "./components/EventRegistrationForm";
import EventRegistration from "./components/EventRegistration";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route
          path="/event/:eventName/register"
          element={<EventRegistrationForm />}
        />
        <Route path="/event/:eventName" element={<EventRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
