const House = require("../models/houseModel");
// const { trusted } = require("mongoose");

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
    const houseUpdates = req.body; 

    if (!Array.isArray(houseUpdates)) {
      return res.status(400).json({ message: "Invalid input format" });
    }

    const updateResults = [];

    for (const houseUpdate of houseUpdates) {
      const { id, points } = houseUpdate;

      if (!id || typeof points !== 'number' || points < 0) {
        updateResults.push({ id, status: "failed", message: "Invalid id or points value" });
        continue;
      }

      const updatedHouse = await House.findByIdAndUpdate(
        id, 
        { points }, 
        { new: true, runValidators: true }
      );

      if (!updatedHouse) {
        updateResults.push({ id, status: "failed", message: "House not found" });
      } else {
        updateResults.push({ id, status: "success", house: updatedHouse });
      }
    }

    return res.status(200).json({ message: "House updates processed", results: updateResults });
  } catch (error) {
    console.error(error + "chla hi nhi update house"); // Log the error for debugging purposes
    return res.status(500).json({ message: "Server error" });
  }
};