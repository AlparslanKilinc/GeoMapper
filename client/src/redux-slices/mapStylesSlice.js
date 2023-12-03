import { createSlice } from '@reduxjs/toolkit';

const hexColorPalette = {
  lightRed: '#ff6666',
  darkRed: '#8b0000',
  lightGreen: '#90ee90',
  darkGreen: '#006400',
  lightBlue: '#add8e6',
  darkBlue: '#00008b',
  lightYellow: '#ffffe0',
  darkYellow: '#ffd700',
  lightOrange: '#ffd580',
  darkOrange: '#ff8c00',
  lightPurple: '#e6e6fa',
  darkPurple: '#800080',
  lightPink: '#ffb6c1',
  darkPink: '#ff1493'
};

const initialState = {
  mapId: null, // Reference to the main Map
  colors: [], // Colors configurations for the symbols
  colorPalette: [
    [hexColorPalette.lightBlue, hexColorPalette.darkBlue],
    [hexColorPalette.lightGreen, hexColorPalette.darkGreen],
    [hexColorPalette.lightPurple, hexColorPalette.darkPurple],
    [hexColorPalette.lightPink, hexColorPalette.darkPink],
    [hexColorPalette.lightRed, hexColorPalette.darkRed],
    [hexColorPalette.lightYellow, hexColorPalette.darkYellow],
    [hexColorPalette.lightOrange, hexColorPalette.darkOrange]
  ],
  colorPaletteIdx: 0,
  shape: 'circle', // Shape type for the map symbols
  size: 0, // Size of the map symbols
  height: 0, // Height for 3D elements
  borderColor: 'black', // black hex code
  borderWidth: 1, // Width of borders of map elements
  mapBackgroundColor: 'white',
  isTilelayerVisible: false,
  selectedPropUniqueValues: [], // Unique values for the selected property,
  selectedFeature: null,
  continousColorScale: [],
  opacity: 1,
  labels: [],
  defaultLabelColor: 'white',
  defaultLabelSize: 12,
  defaultLabelFont: 'Outfit'
};

const mapStylesDataSlice = createSlice({
  name: 'mapStyles',
  initialState,
  reducers: {
    changeSelectedShape: (state, action) => {
      state.shape = action.payload;
    },
    changeBorderColor: (state, action) => {
      state.borderColor = action.payload;
    },
    changeBorderWidth: (state, action) => {
      state.borderWidth = action.payload;
    },
    changeBackgroundColor: (state, action) => {
      state.mapBackgroundColor = action.payload;
    },
    toggleTilelayerVisibility: (state, action) => {
      state.isTilelayerVisible = !state.isTilelayerVisible;
    },
    setColors: (state, action) => {
      state.colors = action.payload;
    },
    setColorPaletteIdx: (state, action) => {
      state.colorPaletteIdx = action.payload;
    },
    changeColorByName: (state, action) => {
      const { name, color } = action.payload;
      const colorCopy = [...state.colors];
      const colorConfig = colorCopy.find((c) => c.name === name);
      colorConfig.color = color;
      state.colors = colorCopy;
    },
    setSelectedPropUniqueValues: (state, action) => {
      state.selectedPropUniqueValues = action.payload;
    },
    setContinousColorScale: (state, action) => {
      state.continousColorScale = action.payload;
    },
    setOpacity: (state, action) => {
      state.opacity = action.payload;
    },
    setLabelPositions: (state, action) => {
      state.labelPositions = action.payload;
    },
    setLabelPositionByIdx: (state, action) => {
      const { idx, position } = action.payload;
      state.labels[idx][position] = position;
    },
    addLabelPosition: (state, action) => {
      // modify this to be add label
      // new structure for labelPositions = [{position:[],color:string,}]
      state.labels.push({
        position: action.payload
      });
    },
    setLabelColor: (state, action) => {
      const { idx, color } = action.payload;
      state.labels[idx].color = color;
    },
    setLabelSize: (state, action) => {
      const { idx, size } = action.payload;
      state.labels[idx].size = size;
    },
    setLabelFont: (state, action) => {
      const { idx, font } = action.payload;
      state.labels[idx].font = font;
    },
    setDefaultLabelColor: (state, action) => {
      state.defaultLabelColor = action.payload;
    },
    setDefaultLabelSize: (state, action) => {
      state.defaultLabelSize = action.payload;
    },
    setDefaultLabelFont: (state, action) => {
      state.defaultLabelFont = action.payload;
    }
  }
});

export const {
  changeSelectedShape,
  changeBorderColor,
  changeBorderWidth,
  changeBackgroundColor,
  toggleTilelayerVisibility,
  setColors,
  setColorPaletteIdx,
  changeColorByName,
  setSelectedPropUniqueValues,
  setContinousColorScale,
  setOpacity,
  setLabelPositions,
  setLabelPositionByIdx,
  addLabelPosition,
  setLabelColor,
  setLabelSize,
  setLabelFont,
  setDefaultLabelColor,
  setDefaultLabelSize,
  setDefaultLabelFont
} = mapStylesDataSlice.actions;

export default mapStylesDataSlice.reducer;
