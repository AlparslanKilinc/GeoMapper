import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapId: null, // Assuming you will be using ObjectId to link it
  points: [],
  regions: [],
  colorByProperty: '',
  sizeByProperty: '',
  propertyNames: []
};

const mapGraphicsDataSlice = createSlice({
  name: 'mapGraphics',
  initialState,
  reducers: {
    // TODO: add reducers
  }
});

// Export the actions and the reducer
// You can uncomment the below line when you add reducers
// export const { yourAction1, yourAction2 } = mapGraphicsDataSlice.actions;
export default mapGraphicsDataSlice.reducer;
