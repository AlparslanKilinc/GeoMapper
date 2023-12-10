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

    // get the username of the user by id
    const { userName } = await User.findById(userId).select('userName');
    mapData.authorUserName = userName;

    // Upload the image to Google Cloud Storage
    const name = `${mapData.title}-${userId}`;
    const imageUrl = await uploadToGoogleCloud(req.file, name);
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

const getAllDrafts = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId)
      .select('draftedMaps') // Select only the fields you need
      .populate('draftedMaps'); // Populate the draftedMaps array

    // Check if user exists
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Respond with the user's drafted and published maps
    res.status(200).send({
      draftedMaps: user.draftedMaps
    });
  } catch (error) {
    // Handle any errors
    console.error('Error fetching maps:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

const getAllPublishedMaps = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId)
      .select('publishedMaps') // Select only the fields you need
      .populate('publishedMaps'); // Populate the draftedMaps array

    // Check if user exists
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Respond with the user's drafted and published maps
    res.status(200).send({
      publishedMaps: user.publishedMaps
    });
  } catch (error) {
    // Handle any errors
    console.error('Error fetching maps:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createMap,
  getAllDrafts,
  getAllPublishedMaps
};
