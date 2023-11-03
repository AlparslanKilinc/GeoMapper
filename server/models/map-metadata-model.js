const mongoose = require("mongoose");
const userSchema = require("./user-model").schema;
const mapSchema = require("./map-model").schema;
const commentSchema = require("./comment-model").schema;

const forkedFromSchema = new mongoose.Schema({
  isForked: { type: Boolean, default: false },
  originalMapId: { type: mongoose.Schema.Types.ObjectId, ref: "Map" },
  default: null,
});

const mapMetadataSchema = new mongoose.Schema(
  {
    mapId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: mapSchema,
      required: true,
    },
    likes: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    author: userSchema,
    dateCreated: { type: Date, default: Date.now },
    description: { type: String, default: "" },
    forkedFrom: forkedFromSchema,
    tags: { type: [String], default: [] },
    comments: { type: [commentSchema], default: [] },
    mapGraphicsType: { type: String, default: "" },
    publishDate: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MapMetadata", mapMetadataSchema);
