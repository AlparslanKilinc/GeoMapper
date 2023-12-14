const mongoose = require('mongoose');

const geoSchema = new mongoose.Schema({
  compressedGeoJSON: Buffer,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  isPrivate: { type: Boolean, default: false },
  name: String
});

module.exports = mongoose.model('Geo', geoSchema);
