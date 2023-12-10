const Map = require('../models/map-model'); // assuming you have a Map model

const createMap = async (req, res) => {
  // Logic to create a map
  const userId = req.userId;
  const map = req.body;
  map.authorId = userId;
  const newMap = new Map(map);
  const savedMap = await newMap.save();
  res.status(200).json({ _id: savedMap._id });
};

module.exports = {
  createMap
};
