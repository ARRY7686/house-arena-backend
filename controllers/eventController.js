const Event = require('../models/eventModel');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createEvent = async (req, res) => {
  const { name, date, housePoints, description, images } = req.body;
  try {
    const newEvent = new Event({ name, date, housePoints, description, images });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
