const mongoose = require('mongoose');

// Define RegionDataSchema
const regionDataSchema = new mongoose.Schema({
  mapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Map' },
  properties: { type: mongoose.Schema.Types.Mixed, default: {} },
  name: { type: String, required: true }
});

// Define PointDataSchema
const pointDataSchema = new mongoose.Schema({
  mapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Map' },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  properties: { type: mongoose.Schema.Types.Mixed, default: {} },
  name: { type: String, required: true }
});

// Define mapGraphicsDataSchema
const mapGraphicsDataSchema = new mongoose.Schema({
  mapId: { type: mongoose.Schema.Types.ObjectId, ref: 'Map' },
  points: { type: [pointDataSchema], default: [] },
  regions: { type: [regionDataSchema], default: [] },
  sizeByProperty: { type: String, default: '' },
  colorByProperty: { type: String, default: '' },
  propertyNames: { type: [{ prop: String, type: String }], default: [] }
});

// Export the schemas
module.exports = {
  RegionData: mongoose.model('RegionData', regionDataSchema),
  PointData: mongoose.model('PointData', pointDataSchema),
  MapGraphicsData: mongoose.model('MapGraphicsData', mapGraphicsDataSchema)
};
