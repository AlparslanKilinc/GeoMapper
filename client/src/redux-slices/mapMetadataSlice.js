import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../store-request-api/mapMetaDataRequestApi'

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
  title: 'Goat Debate',
  loading: false,
  error: null,
  metadataArray: [],
};

export const addMetaData = createAsyncThunk('/metadata/addmetadata', async({author, mapId,title, description, tags, mapGraphicsType, comments},  { rejectWithValue }) =>{
  try {
    console.log("in adding metadata slice")
    const response = await api.addMetaData({
      mapId: mapId,
      author: author,
      title: title,
      description: description,
      tags: tags,
      mapGraphicsType: mapGraphicsType,
      comments: comments
    })
    return response;
  } catch (err) {
    console.log(error)
    return rejectWithValue(err.response.data);
  }

})

export const getMetaDataByMapId = createAsyncThunk('/metadata/getMetaDataByMapId', async(mapId, { rejectWithValue }) =>{
  try{
    const response = await api.getMetaDataByMapId(mapId)
    console.log(response)
  }catch(error){
    return rejectWithValue(error.response.data);
  }
})

const metaDataSlice = createSlice({
  name: 'mapMetadata',
  initialState: mapMetadataInitialState,
  reducers: {
    changeMapTitle: (state, action) => {
      state.title = action.payload;
    },
    changeMapDescription: (state, action) => {
      state.description = action.payload;
    },
    setMapGraphicsType: (state, action) => {
      state.mapGraphicsType = action.payload;
    },
    changeMapId: (state, action) => {
      state.mapId = action.payload;
    },
    changeLikes: (state, action) => {
      state.likes = action.payload;
    },
    changeForks: (state, action) => {
      state.forks = action.payload;
    },
    changeAuthorId: (state, action) => {
      state.author.id = action.payload;
    },
    changeAuthorUsername: (state, action) => {
      state.author.username = action.payload;
    },
    changeDateCreated: (state, action) => {
      state.dateCreated = action.payload;
    },
    changeForkedStatus: (state, action) => {
      state.forkedFrom.isForked = action.payload;
    },
    changeOriginalMapId: (state, action) => {
      state.forkedFrom.originalMapId = action.payload;
    },
    changeTags: (state, action) => {
      state.tags = action.payload;
    },
    changeComments: (state, action) => {
      state.comments = action.payload;
    },
    changePublishDate: (state, action) => {
      state.publishDate = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(addMetaData.fulfilled, (state, action) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getMetaDataByMapId.fulfilled, (state, action) => {
          const metadata = action.payload;
          state.metadataArray.push(metadata);
          state.loading = false;
          state.error = null;
        })
        .addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state, action) => {
              state.message = action.payload?.errorMessage || 'An error occurred';
              state.isLoading = false;
            })
  }
});

export const {
  changeMapTitle,
  changeMapDescription,
  setMapGraphicsType,
  changeMapId,
  changeLikes,
  changeForks,
  changeAuthorId,
  changeAuthorUsername,
  changeDateCreated,
  changeForkedStatus,
  changeOriginalMapId,
  changeTags,
  changeComments,
  changeMapGraphicsType,
  changePublishDate,
  changeTitle,

} = metaDataSlice.actions;
export default metaDataSlice.reducer;