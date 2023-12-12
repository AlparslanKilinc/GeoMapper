const GraphicsModel = require('../models/map-graphicsdata-model.js');

const saveMapGraphicsData = async (req, res) => {
  const mapGraphics = req.body;
  const newGraphics = new GraphicsModel(mapGraphics);
  const { _id } = await newGraphics.save();
  res.json({ _id });
};

const updateMapGraphicsDataById = async (req, res) => {
  const mapGraphics = req.body;
  const mapGraphicsId = req.params.mapGraphicsId;
  const updatedGraphics = await GraphicsModel.findByIdAndUpdate(mapGraphicsId, mapGraphics, { new: true });
  res.json(updatedGraphics);
};

const getMapGraphicsDataById = async (req, res) => {
  const mapGraphicsId = req.params.mapGraphicsId;
  const mapGraphics = await GraphicsModel.findById(mapGraphicsId);
  res.json(mapGraphics);
};


module.exports = { saveMapGraphicsData, updateMapGraphicsDataById, getMapGraphicsDataById };
