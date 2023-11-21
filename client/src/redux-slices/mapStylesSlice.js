import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapId: null, // Reference to the main Map
  colors: [], // Colors configurations for the symbols
  shape: 'circle', // Shape type for the map symbols
  size: 0, // Size of the map symbols
  height: 0, // Height for 3D elements
  borderColor: 'black', // black hex code
  borderWidth: 1, // Width of borders of map elements
  selectedPropUniqueValues: [], // Unique values for the selected property,
  selectedFeature: null
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
    setColors: (state, action) => {
      state.colors = action.payload;
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
    setSelectedFeature: (state, action) => {
      state.selectedFeature = action.payload;
    }
  }
});

export const {
  changeSelectedShape,
  changeBorderColor,
  changeBorderWidth,
  setColors,
  changeColorByName,
  setSelectedPropUniqueValues,
  setSelectedFeature
} = mapStylesDataSlice.actions;

export default mapStylesDataSlice.reducer;
