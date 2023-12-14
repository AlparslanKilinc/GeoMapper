import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apis from '../store-request-api/mapRequestApi';

// create async thunk action creators that fetches drafts

export const fetchDrafts = createAsyncThunk('maps/fetchDrafts', async (_, thunkApi) => {
  try {
    const response = await apis.getDrafts();
    const draftedMaps = response.data.draftedMaps;
    return draftedMaps;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response.data);
  }
});

export const fetchUserPublishedMaps = createAsyncThunk(
  'maps/fetchUserPublishedMaps',
  async (_, thunkApi) => {
    try {
      const response = await apis.getUserPublishedMaps();
      return response.data.publishedMaps;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  mapId: null,
  drafts: [],
  publishedMaps: [],
  isLoadingDrafts: false,
  isLoadingPublishedMaps: false
};

const mapSlice = createSlice({
  name: 'maps',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrafts.pending, (state) => {
        state.isLoadingDrafts = true;
      })
      .addCase(fetchDrafts.fulfilled, (state, action) => {
        state.isLoadingDrafts = false;
        state.drafts = action.payload;
      })
      .addCase(fetchDrafts.rejected, (state) => {
        state.isLoadingDrafts = false;
      })
      .addCase(fetchUserPublishedMaps.pending, (state) => {
        state.isLoadingPublishedMaps = true;
      })
      .addCase(fetchUserPublishedMaps.fulfilled, (state, action) => {
        state.isLoadingPublishedMaps = false;
        state.publishedMaps = action.payload;
      })
      .addCase(fetchUserPublishedMaps.rejected, (state) => {
        state.isLoadingPublishedMaps = false;
      });
  }
});

export default mapSlice.reducer;
