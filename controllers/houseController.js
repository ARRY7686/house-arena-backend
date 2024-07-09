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

exports.updateHousePoints = async (req, res) => {
  try {
    // await House.create({
    //   name: req.body.name,
    //   totalPoints: req.body.totalPoints,
    // });

    // return res.status(201).json({ message: "house Created" });
    await House.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({ message: "House updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
