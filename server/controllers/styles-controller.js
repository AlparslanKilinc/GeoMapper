const StylesModel = require('../models/map-stylesdata-model.js');

const saveMapStylesData = async (req, res) => {
  const mapStyles = req.body;
  newPlaylist = new StylesModel(mapStyles);
  const { _id } = await newPlaylist.save();
  res.json({ _id });
};

const updateMapStylesDataById = async (req, res) => {
  const mapStyles = req.body;
  const mapStylesId = req.params.mapStylesId;
  const updatedStyles = await StylesModel.findByIdAndUpdate(mapStylesId, mapStyles, { new: true });
  res.json(updatedStyles);
};

const getMapStylesDataById = async (req, res) => {
  const mapStylesId = req.params.mapStylesId;
  const mapStyles = await StylesModel.findById(mapStylesId);
  res.json(mapStyles);
};

module.exports = { saveMapStylesData, updateMapStylesDataById, getMapStylesDataById };
