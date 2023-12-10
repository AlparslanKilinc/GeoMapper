const mapStyles = require('../models/map-stylesdata-model.js');

const saveMapStylesData = async (req, res) => {
  // Logic to save map styles data
};

const updateMapStyles = async (req, res) => {
  const { mapStylesId } = req.params;
  // Logic to update map styles
};

module.exports = { saveMapStylesData, updateMapStyles };
