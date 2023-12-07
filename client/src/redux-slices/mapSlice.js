import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from "../store-request-api/mapRequestApi";

const initialState = {
    mapId: null,
    mapMetadataId: null,
    mapStylesId: null,
    mapGraphicsDataId: null,
    loading: false,
    error: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addMap.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMap.fulfilled, (state, action) => {
                state.loading = false;
                state.mapData = action.payload;
            })
            .addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state, action) => {
                state.message = action.payload?.errorMessage || 'An error occurred';
                state.isLoading = false;
            })
    },
});

export const addMap = createAsyncThunk(
    'map/addMap',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.addMap();
            console.log("response in slice")
            console.log(response)
            console.log(response.data)
            console.log(response._id)
            if (!response._id) {
                throw new Error('Invalid response from the server');
            }
            console.log(response);
            return response;  // Assuming _id is the map ID
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error creating map';
            console.error('Error creating map:', errorMessage);
            return rejectWithValue({ errorMessage });
        }
    }
);

export const updateMap = createAsyncThunk(
    'map/updateMap',
    async ({mapId, graphicsId, stylesId, metadataId, geoId}, { rejectWithValue }) => {
        try {
            const response = await api.updateMap({
                mapId: mapId,
                graphicsDataId: graphicsId,
                stylesDataId: stylesId,
                metadataId: metadataId,
                geoData: geoId,
            });
            if (!response._id) {
                throw new Error('Invalid response from the server');
            }
            return response;  // Assuming _id is the map ID
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error creating map';
            console.error('Error creating map:', errorMessage);
            return rejectWithValue({ errorMessage });
        }
    }

)

export default mapSlice.reducer;
