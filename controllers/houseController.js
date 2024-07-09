const House = require("../models/houseModel");
const { trusted } = require("mongoose");

exports.getHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createHouse = async (req, res) => {
  try {
    // const { name, totalPoints } = req.body;
    // const newHouse = new House({ name, totalPoints });
    // await newHouse.save();
    // res.status(201).json(newHouse);
    await House.create({
      name: req.body.name,
      totalPoints: req.body.totalPoints,
    });

    return res.status(201).json({ message: "house Created" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
