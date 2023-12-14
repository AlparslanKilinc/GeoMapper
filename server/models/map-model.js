const mongoose = require('mongoose');

const forkedFromSchema = new mongoose.Schema({
  isForked: { type: Boolean, default: false },
  originalMapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Map' }
});

const mapSchema = new mongoose.Schema(
  {
    graphicsDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MapGraphics'
    },
    stylesDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MapStyles'
    },
    geoDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Geo'
    },
    authorUserName: String,
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: { type: String, default: '' },
    thumbnailUrl: { type: String, default: '' },
    likes: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    dateCreated: { type: Date, default: Date.now },
    description: { type: String, default: '' },
    forkedFrom: forkedFromSchema,
    tags: { type: [String], default: [] },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    mapGraphicsType: { type: String, default: '' },
    publishDate: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Map', mapSchema);
