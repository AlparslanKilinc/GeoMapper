const GraphicsModel = require('../models/map-graphicsdata-model.js');

const saveMapGraphicsData = async (req, res) => {
  // Logic to save map graphics data
  // save map graphics data to database and return the id of the saved data
  const mapGraphics = req.body;
  const newGraphics = new GraphicsModel(mapGraphics);
  const { _id } = await newGraphics.save();
  res.json({ _id });
};

const updateMapGraphicsData = async (req, res) => {
  const { mapGraphicsId } = req.params;
  // Logic to update map graphics data
};

module.exports = { saveMapGraphicsData, updateMapGraphicsData };
