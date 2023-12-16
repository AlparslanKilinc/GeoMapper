import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apis from '../store-request-api/commentRequestApi';

const initialState = {
    comments: []
};

export const addComment = createAsyncThunk(
    "comment/addComment",
    async (commentData, { rejectWithValue }) => {
        try {
            const response = await apis.addComment(commentData);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const getMapComments = createAsyncThunk(
    "comment/",
    async (mapId, { rejectWithValue }) => {
        try {
            const response = await apis.getMapComments(mapId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const commentsSlice = createSlice({
        name: 'comments',
        initialState,
        reducers: {
            clearComments: (state) => {
                state.comments = [];
            },
        },
    extraReducers: (builder) => {
        builder
            .addCase(addComment.fulfilled, (state, action) => {
                console.log(action.payload)
                state.comments = [ action.payload, ...state.comments];
            })
            .addCase(getMapComments.fulfilled, (state, action) =>{
                state.comments = action.payload
                console.log(action.payload)

        });
    },
    });

export const {  clearComments} = commentsSlice.actions;
export default commentsSlice.reducer;
