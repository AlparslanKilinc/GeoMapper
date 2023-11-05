const Geo = require('../models/geojson-model.js');

const getGeojsonIdNamePairs = async (req, res) => {
  // retrieve all geojson documents from the database but select only the _id and name fields
  const geojson = await Geo.find({}, '_id name');
  // send the geojson documents back to the client
  res.json(geojson);
};

const getGeojsonById = async (req, res) => {
  // retrieve the geojson document with the specified id from the database
  const geojson = await Geo.findById(req.params.id);
  // send the geojson document back to the client
  res.json(geojson);
};

module.exports = { getGeojsonById, getGeojsonIdNamePairs };
