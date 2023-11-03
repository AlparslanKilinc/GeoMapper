import { createSlice } from "@reduxjs/toolkit";

// Map Metadata Slice
const mapMetadataInitialState = {
  mapId: null,
  likes: 0,
  forks: 0,
  author: { id: null, username: "" },
  dateCreated: null,
  description: "",
  forkedFrom: { isForked: false, originalMapId: null },
  tags: [],
  comments: [],
  mapGraphicsType: "",
  publishDate: null,
};

const metaDataSlice = createSlice({
  name: "mapMetadata",
  initialState: mapMetadataInitialState,
  reducers: {
    //TODO add reducers
  },
});

export default metaDataSlice.reducer;
