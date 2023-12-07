const mongoose = require("mongoose");

const mapSchema = new mongoose.Schema(
  {
    graphicsDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MapGraphicsData",
        default: null,
    },
    stylesDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MapStylesData",
        default: null,
    },
    metadataId: { type: mongoose.Schema.Types.ObjectId, ref: "MapMetadata",  default: null, },
    geoData: { type: mongoose.Schema.Types.ObjectId, ref: "Geo",  default: null, },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Map", mapSchema);
