const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapStyleSchema = new mongoose.Schema({
  mapId: { type: String, default: null },
  colors: [{ type: Schema.Types.Mixed }],
  heatmapColorType: { type: String, default: 'continuous' },
  colorPalette: [[String]],
  colorSteps: [{
    range: {
      from: { type: Number, required: true },
      to: { type: Number, required: true }
    },
    color: { type: String, required: true }
  }],
  colorPaletteIdx: { type: Number, default: 0 },
  orientation: { type: String, default: 'vertical' },
  bgColor: { type: String, default: '#ffffff' },
  fontColor: { type: String, default: 'black' },
  shape: { type: String, default: 'circle' },
  size: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  borderColor: { type: String, default: '#808080' },
  borderWidth: { type: Number, default: 2 },
  fillColor: { type: String, default: '#EDEDED' },
  mapBackgroundColor: { type: String, default: 'white' },
  isTilelayerVisible: { type: Boolean, default: false },
  selectedPropUniqueValues: { type: [String], default: ['default'] },
  selectedFeature: { type: String, default: null },
  continousColorScale: { type: [String], default: [] },
  opacity: { type: Number, default: 1 },
  labels: [{ type: mongoose.Schema.Types.Mixed }],
  defaultLabelColor: { type: String, default: 'white' },
  defaultLabelSize: { type: Number, default: 12 },
  defaultLabelFont: { type: String, default: 'Outfit' }
});

const MapStyle = mongoose.model('MapStyles', MapStyleSchema);

module.exports = MapStyle;
