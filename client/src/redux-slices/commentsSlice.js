import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mapId: null, // Reference to the main Map
    author: '',
    text: '',
    date_posted: new Date(),

};

const commentsSlice = createSlice({
    name: 'mapStyles',
    initialState,
    reducers: {
        changeAuthor: (state, action) => {
            state.shape = action.payload;
        },
        changeText: (state, action) => {
            state.shape = action.payload;
        },
    }
});

export const {
    changeAuthor,
    changeText


} = commentsSlice.actions;

export default commentsSlice.reducer;
