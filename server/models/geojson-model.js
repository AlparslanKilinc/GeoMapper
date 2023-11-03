const mongoose = require("mongoose");

const geoSchema = new mongoose.Schema({
  geoJSON: mongoose.Schema.Types.GeoJSON,
});

module.exports = mongoose.model("Geo", geoSchema);
