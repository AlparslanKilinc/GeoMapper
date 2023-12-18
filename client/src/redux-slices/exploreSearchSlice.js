import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apis from '../store-request-api/mapRequestApi';



const initialState = {
  metaDataList: [],
  searchOptions: {
    sortBy: [{ field: 'likes', order: 'desc' }],
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
    publishedMaps: [],
  searchResults: []

};

export const getAllPublishedMaps = createAsyncThunk(
  "map/getAllPublishedMaps",
  async (sortBy, { rejectWithValue }) => {
    try {
      const response = await apis.getAllPublishedMaps(sortBy);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const search = createAsyncThunk(
  "map/search",
  async (query, { rejectWithValue }) => {
    try {
      const response = await apis.search(query);
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
      .addCase(getAllPublishedMaps.fulfilled, (state, action) => {
        state.publishedMaps = action.payload;
        state.isLoadingPublishedMaps = false;
      })
      .addCase(search.fulfilled, (state, action) => {
        console.log(action.payload)
          state.publishedMaps = action.payload;
      })
  }
});
export const{
  resetExploreData
} = exploreSlice.actions

export default exploreSlice.reducer;
