const mongoose = require('mongoose');

const geoSchema = new mongoose.Schema({
  geoJSON: {
    type: {
      type: String, // Don't do `{ type: String }` because Mongoose interprets 'type' as a type declaration.
      enum: [
        'Point',
        'LineString',
        'Polygon',
        'MultiPoint',
        'MultiLineString',
        'MultiPolygon',
        'GeometryCollection'
      ], // GeoJSON types
      required: true
    },
    coordinates: mongoose.Schema.Types.Mixed,
    properties: mongoose.Schema.Types.Mixed
  },
  name: String
});

module.exports = mongoose.model('Geo', geoSchema);
