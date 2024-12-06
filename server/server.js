const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 7000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://Ashir:ashir1505@ashir-cluster.azxz9vk.mongodb.net/EventRegistrationForm",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Schema and Model
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  event: String,
  eventDate: Date,
  image: String,
  message: String,
});

const Registration = mongoose.model("Registration", registrationSchema);

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Routes

// Register for an event
app.post("/api/register", upload.single("image"), async (req, res) => {
  try {
    const { name, email, event, eventDate, message } = req.body;

    const newRegistration = new Registration({
      name,
      email,
      event,
      eventDate,
      image: req.file ? `/uploads/${req.file.filename}` : "", // Handle optional image upload
      message,
    });

    await newRegistration.save();
    res.status(201).json({
      message: "Registration successful",
      registration: newRegistration,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering", error });
  }
});

// Get all registrations for a specific event
app.get("/api/registrations/:event", async (req, res) => {
  try {
    const registrations = await Registration.find({ event: req.params.event });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registrations", error });
  }
});

// Get all events (Optional - if you want to fetch a list of all events)
app.get("/api/events", async (req, res) => {
  try {
    const events = await Registration.distinct("event");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
