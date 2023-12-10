const Map = require('../models/map-model'); // assuming you have a Map model
const User = require('../models/user-model'); // assuming you have a User model
const { uploadToGoogleCloud } = require('../googleCloudStorage');

const createMap = async (req, res) => {
  try {
    // Assuming 'image' is the key for the uploaded file
    // and other map data is sent as JSON in the request body
    const userId = req.userId;
    const mapData = JSON.parse(req.body.map);
    mapData.authorId = userId;

    // Upload the image to Google Cloud Storage
    const imageUrl = await uploadToGoogleCloud(req.file);
    mapData.thumbnailUrl = imageUrl; // Add the image URL to the map data

    // Create and save the new map
    const newMap = new Map(mapData);
    const savedMap = await newMap.save();

    // Update the user's draftedMaps array
    await User.findByIdAndUpdate(userId, { $push: { draftedMaps: savedMap._id } });

    res.status(200).json({ _id: savedMap._id, thumbnailUrl: imageUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMap
};

module.exports = {
  createMap
};
