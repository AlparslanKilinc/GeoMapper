const mongoose = require("mongoose");

const mapSchema = new mongoose.Schema(
  {
    graphicsDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MapGraphicsData",
    },
    stylesDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MapStylesData",
    },
    metadataId: { type: mongoose.Schema.Types.ObjectId, ref: "MapMetadata" },
    geoData: { type: mongoose.Schema.Types.ObjectId, ref: "Geo" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Map", mapSchema);
