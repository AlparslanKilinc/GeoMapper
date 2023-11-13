import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapId: null, // Assuming you will be using ObjectId to link it
  points: [],
  regions: [],
  colorByProperty: 'team',
  sizeByProperty: 'population',
  propertyNames: ['population', 'team']
};

const mapGraphicsDataSlice = createSlice({
  name: 'mapGraphics',
  initialState,
  reducers: {
    changeSizeByProperty: (state, action) => {
      state.sizeByProperty = action.payload;
    },

    changeColorByProperty: (state, action) => {
      state.colorByProperty = action.payload;
    }
  }
});

export const { changeSizeByProperty, changeColorByProperty } = mapGraphicsDataSlice.actions;
export default mapGraphicsDataSlice.reducer;
