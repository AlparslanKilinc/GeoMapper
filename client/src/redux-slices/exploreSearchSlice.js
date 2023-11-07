import { createSlice } from '@reduxjs/toolkit';

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
  error: null
};

const exploreSlice = createSlice({
  name: 'exploreSearch',
  initialState,
  reducers: {}
});

export default exploreSlice.reducer;
