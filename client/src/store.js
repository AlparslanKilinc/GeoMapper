import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './redux-slices/authSlice';
import mapMetadataReducer from './redux-slices/mapMetadataSlice';
import mapGraphicsReducer from './redux-slices/mapGraphicsDataSlice';
import mapStyleReducer from './redux-slices/mapStylesSlice';
import mapReducer from './redux-slices/mapSlice';
import exploreSearchReducer from './redux-slices/exploreSearchSlice';
import geojsonReducer from './redux-slices/geoJSONSlice';
import commentsReducer from './redux-slices/commentsSlice';
import undoRedoReducer from './redux-slices/undoRedoSlice';
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  mapMetadata: mapMetadataReducer,
  mapGraphics: mapGraphicsReducer,
  mapStyles: mapStyleReducer,
  map: mapReducer,
  exploreSearch: exploreSearchReducer,
  geojson: geojsonReducer,
  comments: commentsReducer,
  undoRedo: undoRedoReducer,
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: true
});
export const persistor = persistStore(store);