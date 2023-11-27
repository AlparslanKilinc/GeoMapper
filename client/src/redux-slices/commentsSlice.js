import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mapId: null,
    comments: [
        {
            id: 1,
            author: 'User1',
            text: 'This is the first comment.',
            date_posted: new Date().toDateString(),
            profilePic: ''
        },
        {
            id: 2,
            author: 'User2',
            text: 'Another comment here.',
            date_posted: new Date().toDateString(),
            profilePic: ''
        },
    ],
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action) => {
            const newComment = {
                id: state.comments.length + 1, // You may want to use a more sophisticated method to generate unique IDs
                ...action.payload,
                date_posted: new Date().toDateString(),
            };
            return {
                ...state,
                comments: [...state.comments, newComment],
            };
        },
    },
});

export const {
    addComment
} = commentsSlice.actions;

export default commentsSlice.reducer;
