import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapId: null, // Assuming you will be using ObjectId to link it
  points: [],
  regions: [],
  colorByProperty: 'team',
  sizeByProperty: 'population',
  propertyNames: ['population', 'team'],
  isTabularOpened: false,
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
    },

    toggleTabular: (state, action) => {
      state.isTabularOpened = action.payload;
    }
  }
});

export const { changeSizeByProperty, changeColorByProperty, toggleTabular } = mapGraphicsDataSlice.actions;
export default mapGraphicsDataSlice.reducer;
