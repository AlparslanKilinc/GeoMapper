const mapGraphicsModel = require('../models/map-graphicsdata-model.js');

const saveMapGraphicsData = async (req, res) => {
  // Logic to save map graphics data
};

const updateMapGraphicsData = async (req, res) => {
  const { mapGraphicsId } = req.params;
  // Logic to update map graphics data
};

module.exports = { saveMapGraphicsData, updateMapGraphicsData };
