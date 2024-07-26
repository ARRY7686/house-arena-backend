import Event from "../models/eventModel.js";
import { isValid, parseISO } from "date-fns";

export async function getEvents(req, res) {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: `Server error-> ${error}` });
  }
}

export async function createEvent(req, res) {
  const { name, date, housePoints, description } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ message: "Invalid or missing name" });
  }

  if (!date || !isValid(parseISO(date)) || date.length != 10) {
    return res.status(400).json({ message: "Invalid or missing date or Wrong Formate (YYYY-MM-DD)" });
  }

  if (
    !housePoints ||
    typeof housePoints !== "object" ||
    !Number.isInteger(housePoints.kong) ||
    !Number.isInteger(housePoints.leo) ||
    !Number.isInteger(housePoints.phoenix) ||
    !Number.isInteger(housePoints.tusker)
  ) {
    return res.status(400).json({ message: "Invalid or missing housePoints" });
  }

  try {
    const newEvent = new Event({ name, date, housePoints, description });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function updateEvent(req, res) {
  try {
    const eventId = req.params.id;
    const { date, housePoints, name, description } = req.body;

    // Find the event by ID
    let event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update the event fields
    if ('date' in req.body) event.date = date;
    if (housePoints) event.housePoints = housePoints;
    if (name) event.name = name;
    if (description) event.description = description;

    // Save the updated event
    await event.save();

    // Send the updated event as the response
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ', error: error.message });
  }
}

export async function deleteEvent(req, res) {}
