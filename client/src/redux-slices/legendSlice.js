import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapId: null,
  orientation: 'verticle',
  bgColor: '#ffffff',
  fontColor: 'black'
};

const legendSlice = createSlice({
  name: 'legendStyles',
  initialState,
  reducers: {
    changeOrientation: (state, action) => {
      state.orientation = action.payload;
    },
    changeBackgroundColor: (state, action) => {
      state.bgColor = action.payload;
    },
    changeFontColor: (state, action) => {
      state.fontColor = action.payload;
    },
    setLegendSlice: (state, action) => {
      const { ...legend } = action.payload;
      return {
        ...legend
      };
    }
  }
});

export const { changeOrientation, changeBackgroundColor, changeFontColor, setLegendSlice } = legendSlice.actions;

export default legendSlice.reducer;
