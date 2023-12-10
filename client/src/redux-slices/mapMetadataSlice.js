import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import apis from '../store-request-api/mapRequestApi';

export const saveMap = createAsyncThunk(
  'mapStyles/saveMapStylesData',
  async ({ map, thumbnailFile }, thunkApi) => {
    try {
      const response = await apis.createMap(map, thumbnailFile);
      return response.data._id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

// Map Metadata Slice
const mapMetadataInitialState = {
  mapId: null,
  thumbnailUrl: '',
  likes: 0,
  forks: 0,
  author: { id: null, username: '' },
  dateCreated: null,
  description: '',
  forkedFrom: { isForked: false, originalMapId: null },
  tags: [],
  comments: [],
  mapGraphicsType: '',
  publishDate: null,
  title: '',
  isSavingMap: false
};

const metaDataSlice = createSlice({
  name: 'mapMetadata',
  initialState: mapMetadataInitialState,
  reducers: {
    //TODO add reducers
    changeMapTitle: (state, action) => {
      state.title = action.payload;
    },
    changeMapDescription: (state, action) => {
      state.description = action.payload;
    },
    setMapGraphicsType: (state, action) => {
      state.mapGraphicsType = action.payload;
    },
    setThumbnailUrl: (state, action) => {
      state.thumbnailUrl = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveMap.pending, (state) => {
        // Handle the loading state
        // For example, set a loading flag to true
        state.isSavingMap = true;
      })
      .addCase(saveMap.fulfilled, (state, action) => {
        // Handle the successful async action
        // For example, update your state with the returned data
        // action.payload will contain the response.data from your async thunk
        // payload should be id
        state.mapId = action.payload;
        state.isSavingMap = false;
      })
      .addCase(saveMap.rejected, (state, action) => {
        // Handle the error state
        // For example, set an error message
        // action.payload will contain the error response.data if rejectWithValue was used
        state.isSavingMap = false;
      });
  }
});

export const { changeMapTitle, changeMapDescription, setMapGraphicsType } = metaDataSlice.actions;
export default metaDataSlice.reducer;
