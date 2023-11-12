import { createSlice } from "@reduxjs/toolkit";

// Map Metadata Slice
const commentsInitialState = {
    comments: [];
};

const commentsDataSlice = createSlice({
    name: "commentsData",
    initialState: commentsInitialState,
    reducers: {
        addComment: (state, action) => {
                const newComment = {
                    author: action.payload.author,
                    datePosted: new Date(),
                    text: action.payload.text,
                    replies: [],
                    is_reply:false
                };
                state.comments.push(newComment);
        },
        replyToComment: (state, action) => {
           const {parentId, replyText, author} = action.payload;
           const commentToReply = state.comments.find(comment => comment.id === parentId);
            if (commentToReply) {
                const newReply = {
                    id: Date.now(), // You might want to use a more robust ID generation method
                    author: author,
                    datePosted: new Date(),
                    text: replyText,
                    is_reply: true,
                };

                commentToReply.replies.push(newReply);
            }

        },
        removeComment: (state, action) => {
            const commentIdToRemove = action.payload;
            state.comments = state.comments.filter(comment => comment.id !== commentIdToRemove);
        },
    }
});
export const { addComment, replyToComment, removeComment } = commentsDataSlice.actions;
export default commentsDataSlice.reducer;
