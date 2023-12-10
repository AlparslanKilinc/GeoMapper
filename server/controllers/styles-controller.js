const StylesModel = require('../models/map-stylesdata-model.js');

const saveMapStylesData = async (req, res) => {
  // Logic to save map styles data
  // save map styles data to database and return the id of the saved data
  const mapStyles = req.body;
  newPlaylist = new StylesModel(mapStyles);
  const { _id } = await newPlaylist.save();
  res.json({ _id });
};

const updateMapStyles = async (req, res) => {
  const { mapStylesId } = req.params;
  // Logic to update map styles
};

module.exports = { saveMapStylesData, updateMapStyles };
