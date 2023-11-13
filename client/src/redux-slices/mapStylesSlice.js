import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapId: null, // Reference to the main Map
  colors: [], // Colors configurations for the symbols
  shape: 'circle', // Shape type for the map symbols
  size: 0, // Size of the map symbols
  height: 0, // Height for 3D elements
  borderColor: '', // Color for borders of map elements
  borderWidth: 0 // Width of borders of map elements
};

const mapStylesDataSlice = createSlice({
  name: 'mapStyles',
  initialState,
  reducers: {
    changeSelectedShape: (state, action) => {
      state.shape = action.payload;
    }
  }
});

export const { changeSelectedShape } = mapStylesDataSlice.actions;

export default mapStylesDataSlice.reducer;
