import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import apis from '../store-request-api/mapRequestApi';

export const saveMap = createAsyncThunk(
  'mapMetadata/saveMapMetaData',
  async ({ map, thumbnailFile }, thunkApi) => {
    try {
      const response = await apis.createMap(map, thumbnailFile);
      return response.data._id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const updateMapMetaDataById = createAsyncThunk(
  'mapMetadata/updateMapMetaDataById',
  async ({ map, mapId, thumbnailFile }, thunkApi) => {
    try {
      const response = await apis.updateMap(map, mapId, thumbnailFile);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getMapMetaDataById = createAsyncThunk(
  'mapMetadata/getMapMetaDataById',
  async (mapId, thunkApi) => {
    try {
      const response = await apis.getMapDataById(mapId);
      return response.data;
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
    resetMapMetaData: () => mapMetadataInitialState,
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
        state.isSavingMap = true;
      })
      .addCase(saveMap.fulfilled, (state, action) => {
        state.mapId = action.payload;
        state.isSavingMap = false;
      })
      .addCase(saveMap.rejected, (state, action) => {
        state.isSavingMap = false;
      })
      .addCase(updateMapMetaDataById.pending, (state) => {
        state.isSavingMap = true;
      })
      .addCase(updateMapMetaDataById.fulfilled, (state, action) => {
        const { map, ...mapMetadata } = action.payload;
        return {
          ...mapMetadata,
          isSavingMap: false
        };
      })
      .addCase(updateMapMetaDataById.rejected, (state) => {
        state.isSavingMap = false;
      })
      .addCase(getMapMetaDataById.pending, (state) => {
        state.isLoadingMap = true;
      })
      .addCase(getMapMetaDataById.fulfilled, (state, action) => {
        const { map, ...mapMetadata } = action.payload;
        return {
          ...mapMetadata,
          isLoadingMap: false
        };
      })
      .addCase(getMapMetaDataById.rejected, (state) => {
        state.isLoadingMap = false;
      });
  }
});

export const { changeMapTitle, changeMapDescription, setMapGraphicsType, resetMapMetaData } =
  metaDataSlice.actions;
export default metaDataSlice.reducer;
