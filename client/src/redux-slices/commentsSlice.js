import { createSlice } from "@reduxjs/toolkit";

// Map Metadata Slice
const initialState = {
    comments: []
};

const commentsSlice = createSlice({
        name: 'comments',
        initialState,
        reducers: {
            addComment: (state, action) =>{
                const { author, text, datePosted, authorProfilePicture } = action.payload;
                state.comments.push({
                    author,
                    text,
                    datePosted,
                    authorProfilePicture,
                });
            },
            clearComments: (state) => {
                state.comments = [];
            },
        },
    });

export const { addComment, clearComments} = commentsSlice.actions;
export default commentsSlice.reducer;
