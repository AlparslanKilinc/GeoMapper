import { createSlice } from '@reduxjs/toolkit';

// Map Metadata Slice
const mapMetadataInitialState = {
  mapId: null,
  likes: 0,
  forks: 0,
  author: { id: null, username: '' },
  dateCreated: null,
  description: '',
  forkedFrom: { isForked: false, originalMapId: null },
  tags: [],
  comments: [],
  mapGraphicsType: null,
  publishDate: null
};

const metaDataSlice = createSlice({
  name: 'mapMetadata',
  initialState: mapMetadataInitialState,
  reducers: {
    setMapGraphicsType: (state, action) => {
      state.mapGraphicsType = action.payload;
    }
  }
});

export const { setMapGraphicsType } = metaDataSlice.actions;
export default metaDataSlice.reducer;
