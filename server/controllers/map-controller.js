const Map = require('../models/map-model'); // assuming you have a Map model
const User = require('../models/user-model'); // assuming you have a User model

const createMap = async (req, res) => {
  // Logic to create a map
  const userId = req.userId;
  const map = req.body;
  map.authorId = userId;
  const newMap = new Map(map);
  const savedMap = await newMap.save();

  // retrieve user by id and add this map to the user's drafts array
  await User.findByIdAndUpdate(userId, { $push: { draftedMaps: savedMap._id } });
  res.status(200).json({ _id: savedMap._id });
};

module.exports = {
  createMap
};
