import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apis from '../store-request-api/mapRequestApi';
import { getMapGraphicsDataById, saveMapGraphicsData, updateMapGraphicsDataById } from './mapGraphicsDataSlice.js';


const initialState = {
  metaDataList: [],
  searchOptions: {
    sortBy: [{ field: 'likes', order: 'desc' }],
    limit: 10,
    offset: 0,
    page: 1,
    title: {
      value: '',
      matchMode: 'contains'
    },
    description: {
      value: '',
      matchMode: 'contains'
    },
    tags: [],
    dateRange: {
      from: null,
      to: null
    },
    author: {
      name: '',
      id: ''
    },
    fields: ['likes', 'title', 'description', 'date_created']
  },
  isLoading: false,
  error: null,
  isLoadingPublishedMaps: false,
    publishedMaps: []
};

export const getAllPublishedMaps = createAsyncThunk(
  "map/getAllPublishedMaps",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apis.getAllPublishedMaps()
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)


const exploreSlice = createSlice({
  name: 'exploreSearch',
  initialState,
  reducers: {
    resetExploreData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPublishedMaps.fulfilled, (state,actions) => {
        state.publishedMaps = actions.payload
      });
  }
});
export const{
  resetExploreData
} = exploreSlice.actions

export default exploreSlice.reducer;
