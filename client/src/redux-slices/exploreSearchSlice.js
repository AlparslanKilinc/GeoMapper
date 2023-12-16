import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apis from "../store-request-api/mapRequestApi.js";

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
  currentPage: 1,
  pageSize: 10,
  hasMorePublishedMaps: true,
  isLoadingPublishedMaps: false,
    publishedMaps: []
};
export const fetchAllPublishedMaps = createAsyncThunk(
    'maps/fetchAllMaps',
    async ({ page, pageSize }, { rejectWithValue }) => {
      try {
        const response = await apis.getAllPublishedMaps({ page, pageSize });
        return response.data;
      } catch (error) {
        console.error(error);
        return rejectWithValue(error.response?.data);
      }
    }
);

const exploreSlice = createSlice({
  name: 'exploreSearch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchAllPublishedMaps.fulfilled, (state, action) =>{
          const { publishedMaps, pagination } = action.payload;
          state.isLoadingPublishedMaps = false;
          state.publishedMaps = [...publishedMaps];
          state.hasMorePublishedMaps = pagination.currentPage < pagination.totalPages;
          state.currentPage = pagination.currentPage + 1;
          state.pageSize = pagination.pageSize;
        })
        .addCase(fetchAllPublishedMaps.pending, (state, action) =>{
          state.isLoadingPublishedMaps = true;
        })
        .addCase(fetchAllPublishedMaps.rejected, (state, action) =>{
          state.isLoadingPublishedMaps = false;
        })
  }
});

export default exploreSlice.reducer;
