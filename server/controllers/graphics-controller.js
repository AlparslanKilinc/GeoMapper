const mapGraphicsModel = require("../models/map-graphics-model");

const saveMapGraphicsData = async (req, res) => {
  // Logic to save map graphics data
};

const updateMapGraphicsData = async (req, res) => {
  const { mapGraphicsId } = req.params;
  // Logic to update map graphics data
};

export { saveMapGraphicsData, updateMapGraphicsData };