const Map = require('../models/map-model'); // assuming you have a Map model
const User = require('../models/user-model'); // assuming you have a User model
const { uploadImage, deleteFileFromGCS } = require('../imageService');

const createMap = async (req, res) => {
  try {
    // Assuming 'image' is the key for the uploaded file
    // and other map data is sent as JSON in the request body
    const userId = req.userId;
    const mapData = JSON.parse(req.body.map);
    const mapGraphicsId = mapData.graphicsDataId;
    mapData.authorId = userId;

    // get the username of the user by id
    const { userName } = await User.findById(userId).select('userName');
    mapData.authorUserName = userName;

    // Upload the image to Google Cloud Storage
    const name = `${mapData.title}-${mapGraphicsId}-${userId}`;
    const imageUrl = await uploadImage(req.file, name);
    mapData.thumbnailUrl = imageUrl; // Add the image URL to the map data

    // Create and save the new map
    const newMap = new Map(mapData);
    const savedMap = await newMap.save();
    console.log('savedMap', savedMap);
    // Update the user's draftedMaps array
    await User.findByIdAndUpdate(userId, { $push: { draftedMaps: savedMap._id } });


    res.status(200).json({ _id: savedMap._id, thumbnailUrl: imageUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMap = async (req, res) => {
  try {
    const userId = req.userId;
    const mapData = JSON.parse(req.body.map);
    const mapId = req.params.mapId;

    // Fetch the existing map
    const existingMap = await Map.findById(mapId);
    if (!existingMap) {
      return res.status(404).json({ message: 'Map not found' });
    }

    // Get the username of the user by id
    const { userName } = await User.findById(userId).select('userName');
    mapData.authorUserName = userName;

    let imageUrl;
    if (req.file) {
      // If a new image is provided, delete the old image
      if (existingMap.thumbnailUrl) {
        await deleteFileFromGCS(existingMap.thumbnailUrl);
      }

      // Upload the new image
      const name = `${mapData.title}-${mapId}-${userId}`;
      imageUrl = await uploadImage(req.file, name);
      mapData.thumbnailUrl = imageUrl; // Add the new image URL to the map data
    }

    const update = { ...mapData };
    delete update._id;

    const updatedMap = await Map.findOneAndUpdate({ _id: mapId }, update, { new: true });

    res.status(200).json(updatedMap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const publishMap = async (req, res) => {
  try {
    const userId = req.userId;
    const mapData = req.body;
    const publishDate = mapData.publishDate;
    const mapId = req.params.mapId;

    // Fetch the existing map
    const existingMap = await Map.findById(mapId);
    if (!existingMap) {
      return res.status(404).json({ message: 'Map not found' });
    }

    // Update the user's publishMaps array if the map is published otherwise this field is null
    if (publishDate) {
      await User.findByIdAndUpdate(userId, { $push: { publishedMaps: mapData._id } });
      /// remove from draftedMaps
      await User.findByIdAndUpdate(userId, { $pull: { draftedMaps: mapData._id } });
    }

    const update = { ...mapData };
    delete update._id;

    await Map.findOneAndUpdate({ _id: mapId }, update, { new: true });

    res.status(200).json({ message: 'Map published successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMapDataById = async (req, res) => {
  const mapId = req.params.mapId;

  try {
    const map = await Map.findById(mapId);

    if (!map) {
      return res.status(404).send({ message: 'Map not found' });
    }

    res.status(200).send(map);
  } catch (error) {
    console.error('Error fetching map:', error);
    res.status(500).send({ message: 'Internal Server Error' });
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

const getUserPublishedMaps = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId)
      .select('publishedMaps') // Select only the fields you need
      .populate('publishedMaps'); // Populate the publishedMaps array

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
  getUserPublishedMaps,
  getMapDataById,
  updateMap,
  publishMap
};
