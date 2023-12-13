import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import apis from '../store-request-api/mapRequestApi';

export const saveMap = createAsyncThunk(
  'mapMetadata/saveMapMetaData',
  async ({ thumbnailFile }, thunkApi) => {
    try {
      const map = thunkApi.getState().mapMetadata;
      const response = await apis.createMap(map, thumbnailFile);
      return response.data._id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const updateMapMetaDataById = createAsyncThunk(
  'mapMetadata/updateMapMetaDataById',
  async (thumbnailFile, thunkApi) => {
    try {
      const mapMetaData = thunkApi.getState().mapMetadata;
      const response = await apis.updateMap(mapMetaData, thumbnailFile);
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
      console.log('response.data', response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

// Map Metadata Slice
const mapMetadataInitialState = {
  mapId: null,
  graphicsDataId: null,
  stylesDataId: null,
  geoDataId: null,
  authorUserName: '',
  authorId: null,
  title: '',
  thumbnailUrl: '',
  likes: 0,
  forks: 0,
  dateCreated: null,
  description: '',
  forkedFrom: { isForked: false, originalMapId: null },
  tags: [],
  comments: [],
  mapGraphicsType: '',
  publishDate: null,
  isSavingMap: false
};

const metaDataSlice = createSlice({
  name: 'mapMetadata',
  initialState: mapMetadataInitialState,
  reducers: {
    resetMapMetaData: () => mapMetadataInitialState,
    resetMapMetaDataFromDraft: (state, action) => {
      return {
        ...mapMetadataInitialState, 
        mapId: state.mapId, 
        mapGraphicsType: state.mapGraphicsType,
        graphicsDataId: state.graphicsDataId,
        stylesDataId: state.stylesDataId,
        geoDataId: state.geoDataId,
      };
    },
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
    },
    updateDataIds: (state, action) => {
      state.graphicsDataId = action.payload.graphicsDataId;
      state.stylesDataId = action.payload.stylesDataId;
      state.geoDataId = action.payload.geoDataId;
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
        const { ...mapMetadata } = action.payload;
        return {
          ...mapMetadata,
          mapId: mapMetadata._id,
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
        const { ...mapMetadata } = action.payload;

        return {
          ...mapMetadata,
          isLoadingMap: false,
          mapId: mapMetadata._id
        };
      })
      .addCase(getMapMetaDataById.rejected, (state) => {
        state.isLoadingMap = false;
      });
  }
});

export const {
  changeMapTitle,
  changeMapDescription,
  setMapGraphicsType,
  resetMapMetaData,
  updateDataIds,
  resetMapMetaDataFromDraft
} = metaDataSlice.actions;
export default metaDataSlice.reducer;
