const mongoose = require('mongoose');

const mapGraphicsSchema = new mongoose.Schema({
  mapId: { type: String, required: false, default: null },
  points: [{ type: mongoose.Schema.Types.Mixed }],
  regions: [{ type: mongoose.Schema.Types.Mixed }],
  columnTypes: Map,
  addedColumns: [String],
  nameByProperty: String,
  latByProperty: String,
  lonByProperty: String,
  colorByProperty: String,
  sizeByProperty: String,
  heightByProperty: String,
  fixedSymbolSize: Number,
  fixedOpacity: Number,
  opacityByProperty: String,
  fixedColor: String,
  labelByProperty: String,
  isLabelVisible: Boolean,
  propertyNames: [String],
  pointProperties: [String],
  selectedRegionIdx: Number,
  columnValidationErrors: Map,
  cellValidationErrors: Map,
  randomColumnCounter: Number,
  validationMessage: String,
  addSymbolMode: Boolean,
  selectedPointKey: Number,
  valuePerDot: Number,
  dotDensityByProperty: [String],
  maxSymbolSize: Number,
  minSymbolSize: Number,
  minProperty: Number,
  maxProperty: Number
});

const MapGraphics = mongoose.model('MapGraphics', mapGraphicsSchema);

module.exports = MapGraphics;

