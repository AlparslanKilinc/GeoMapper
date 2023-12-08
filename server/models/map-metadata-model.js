const mongoose = require("mongoose");
const userSchema = require("./user-model").schema;
const mapSchema = require("./map-model").schema;
const commentSchema = require("./comment-model").schema;


const forkedFromSchema = new mongoose.Schema({
    isForked: { type: Boolean, default: false },
    originalMapId: { type: mongoose.Schema.Types.ObjectId, ref: "Map" },
});


const mapMetadataSchema = new mongoose.Schema(
  {
    mapId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Map',
      required: true,
    },
      title: {type: String, default: ""},
    likes: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    dateCreated: { type: Date, default: Date.now },
    description: { type: String, default: "" },
    forkedFrom: forkedFromSchema,
    tags: { type: [String], default: [] },
    mapGraphicsType: { type: String, default: "" },
    publishDate: { type: Date, default: null },
  },
  { timestamps: true }
);
forkedFromSchema.path('isForked').default(false);
forkedFromSchema.path('originalMapId').default(null);
module.exports = mongoose.model("MapMetadata", mapMetadataSchema);
