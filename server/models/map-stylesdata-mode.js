const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
});

const mapStylesDataSchema = new mongoose.Schema({
  mapId: { type: mongoose.Schema.Types.ObjectId, ref: "Map", required: true },
  colors: { type: [colorSchema], default: [] },
  shape: { type: String },
  size: { type: Number },
  height: { type: Number },
  borderColor: { type: String },
  borderWidth: { type: Number },
});

module.exports = mongoose.model("MapStylesData", mapStylesDataSchema);
