import { createSlice } from '@reduxjs/toolkit';

// Map Metadata Slice
const mapMetadataInitialState = {
  mapId: null,
  likes: 0,
  forks: 0,
  author: { id: null, username: '' },
  dateCreated: null,
  description: 'This a map of the US population density by state.',
  forkedFrom: { isForked: false, originalMapId: null },
  tags: [],
  comments: [],
  mapGraphicsType: 'Choropleth Map',
  publishDate: null,
  title: 'Goat Debate'
};

const metaDataSlice = createSlice({
  name: 'mapMetadata',
  initialState: mapMetadataInitialState,
  reducers: {
    //TODO add reducers
    resetMapMetaData: () => initialState,
    changeMapTitle: (state, action) => {
      state.title = action.payload;
    },
    changeMapDescription: (state, action) => {
      state.description = action.payload;
    },
    setMapGraphicsType: (state, action) => {
      state.mapGraphicsType = action.payload;
    }
  }
});

export const { changeMapTitle, changeMapDescription, setMapGraphicsType, resetMapMetaData } = metaDataSlice.actions;
export default metaDataSlice.reducer;
