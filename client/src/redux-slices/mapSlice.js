import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapId: null,
  mapMetadataId: null,
  mapStylesId: null,
  mapGraphicsDataId: null
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {}
});

export default mapSlice.reducer;
