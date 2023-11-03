import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapId: null, // Reference to the main Map
  geoJSON: {}, // The actual GeoJSON data
};

const geoJSONSlice = createSlice({
  name: "geoJSON",
  initialState,
  reducers: {
    // TODO: add reducers
  },
});

// Export the actions and the reducer
// You can uncomment the below lines when you add reducers.
// export const { yourAction1, yourAction2 } = geoJSONSlice.actions;
export default geoJSONSlice.reducer;
