import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mapId: null,
    orientation: 'vertical',
    bgColor:'#ffffff',
    fontColor: 'black',
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
        }, changeFontColor: (state, action) => {
            state.fontColor = action.payload;
        },

    }
});

export const {
   changeOrientation,
    changeBackgroundColor,
    changeFontColor,

} = legendSlice.actions;

export default legendSlice.reducer;
