import { createSlice } from '@reduxjs/toolkit';
import apis from '../store-request-api/mapRequestApi';

// create async thunk action creators that fetches drafts

export const fetchDrafts = createAsyncThunk('maps/fetchDrafts', async (id, thunkApi) => {
  try {
    const response = await apis.getDrafts();
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response.data);
  }
});

export const fetchPublishedMaps = createAsyncThunk(
  'maps/fetchPublishedMaps',
  async (id, thunkApi) => {
    try {
      const response = await apis.getPublishedMaps();
      return response.data;
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
        state.drafts = action.payload.draftedMaps;
      })
      .addCase(fetchDrafts.rejected, (state) => {
        state.isLoadingDrafts = false;
      })
      .addCase(fetchPublishedMaps.pending, (state) => {
        state.isLoadingPublishedMaps = true;
      })
      .addCase(fetchPublishedMaps.fulfilled, (state, action) => {
        state.isLoadingPublishedMaps = false;
        state.publishedMaps = action.payload.draftedMaps;
      })
      .addCase(fetchPublishedMaps.rejected, (state) => {
        state.isLoadingPublishedMaps = false;
      });
  }
});

export default mapSlice.reducer;
