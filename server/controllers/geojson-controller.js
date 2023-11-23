const Geo = require('../models/geojson-model.js');

const getGeojsonIdNamePairs = async (req, res) => {
  const geojson = await Geo.find({}, '_id name').sort('name');
  // send the geojson documents back to the client
  res.json(geojson);
};

const getGeojsonById = async (req, res) => {
  try {
    const { id } = req.params;
    const geojson = await Geo.findById(id);

    if (!geojson) {
      return res.status(404).send({ message: 'GeoJSON not found' });
    }

    const buffer = geojson.compressedGeoJSON.buffer;

    res.setHeader('Content-Type', 'application/octet-stream');

    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving GeoJSON' });
  }
};

const createGeojson = async (req, res) => {
  try {
    const { ownerId, isPrivate, name } = req.query; // Extract additional parameters from URL query
    const compressedGeoJSON = req.body; // The compressed GeoJSON is in the request body

    let buffer = Buffer.from(compressedGeoJSON);

    const newGeoJSON = new Geo({
      compressedGeoJSON: buffer,
      ownerId: ownerId,
      isPrivate: isPrivate === 'true', // Convert string to boolean
      name: name
    });

    await newGeoJSON.save();
    res.status(201).send({ message: 'GeoJSON created successfully', id: newGeoJSON._id });
  } catch (error) {
    res.status(500).send({ message: 'Error creating GeoJSON', error: error.message });
  }
};

const searchGeojson = async (req, res) => {
  try {
    const { query } = req.params;
    const searchResults = await Geo.find({ name: { $regex: query, $options: 'i' } });
    res.json(searchResults);
  } catch (error) {
    res.status(500).send({ message: 'Error performing search', error: error.message });
  }
};

module.exports = { getGeojsonById, getGeojsonIdNamePairs, createGeojson, searchGeojson };
