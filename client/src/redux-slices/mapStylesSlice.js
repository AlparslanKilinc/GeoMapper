import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapId: null, // Reference to the main Map
  colors: [], // Colors configurations for the symbols
  shape: 'circle', // Shape type for the map symbols
  size: 0, // Size of the map symbols
  height: 0, // Height for 3D elements
  borderColor: 'black', // black hex code
  borderWidth: 1 // Width of borders of map elements
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
    }
  }
});

export const { changeSelectedShape, changeBorderColor, changeBorderWidth } =
  mapStylesDataSlice.actions;

export default mapStylesDataSlice.reducer;
