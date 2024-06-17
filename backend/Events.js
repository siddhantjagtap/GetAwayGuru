const express = require("express");
const cors = require("cors");
const Events = require("./Models/events.model"); // Ensure the correct path to your model
const app = express();

app.use(cors());
app.use(express.json());

// Route to get events by location
app.get("/events/location/:Location", async (req, res) => {
  const { Location } = req.params;
  try {
    const locationTitleCase =
      Location.charAt(0).toUpperCase() + Location.slice(1).toLowerCase();
    const events = await Events.find({
      Location: { $regex: new RegExp("^" + locationTitleCase, "i") },
    });

    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ message: "No event found for the specified location" });
    }
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching events");
  }
});

// Route to get event by name
app.get("/events/name/:eventName", async (req, res) => {
  const { eventName } = req.params;
  // Convert hyphens back to spaces
  const decodedEventName = decodeURIComponent(eventName).replace(/-/g, ' ')
  try {
    const event = await Events.findOne({ 
      Event_Name: { $regex: new RegExp(decodedEventName, "i") }
    });

    if (!event) {
      return res.status(404).json({ message: "No event found with the specified name" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching event");
  }
});

// Route to get all events
app.get("/events", async (req, res) => {
  try {
    const events = await Events.find();

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching events");
  }
});

// Route to get events by category
app.get("/events/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const categoryTitleCase =
      category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    const events = await Events.find({
      Event_Category: { $regex: new RegExp("^" + categoryTitleCase, "i") },
    });

    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for the specified category" });
    }
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching events");
  }
});

module.exports = app;
