import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux-slices/authSlice';
import mapMetadataReducer from './redux-slices/mapMetadataSlice';
import mapGraphicsReducer from './redux-slices/mapGraphicsDataSlice';
import mapStyleReducer from './redux-slices/mapStylesSlice';
import mapReducer from './redux-slices/mapSlice';
import exploreSearchReducer from './redux-slices/exploreSearchSlice';
import geojsonReducer from './redux-slices/geoJSONSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mapMetadata: mapMetadataReducer,
    mapGraphics: mapGraphicsReducer,
    mapStyles: mapStyleReducer,
    map: mapReducer,
    exploreSearch: exploreSearchReducer,
    geojson: geojsonReducer,
  },
  devTools: true
});
