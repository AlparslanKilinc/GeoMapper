import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apis from '../store-request-api/geojsonRequestApi';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import { setChoroplethData } from './mapGraphicsDataSlice';

const getRandomNbaPlayer = () => {
  const teams = ['Lebron', 'Kobe', 'Jordan'];
  return teams[parseInt(Math.random() * teams.length)];
};

const getType = (value) => {
  if (typeof value === 'number') {
    return 'number';
  } else if (typeof value === 'string') {
    return 'text';
  }
};

const processGeojson = (geojson) => {
  let regions = [];
  let columnTypes = {};
  columnTypes['GOAT'] = 'text';
  geojson.features.forEach((feature, index) => {
    // Extract only the first 5 properties
    let firstFiveProperties = Object.fromEntries(Object.entries(feature.properties).slice(0, 5));
    for (const [key, value] of Object.entries(firstFiveProperties)) {
      columnTypes[key] = getType(value);
    }

    regions.push({ ...firstFiveProperties, GOAT: getRandomNbaPlayer() });
    feature.properties = { regionIdx: index };
  });

  // Assuming that all features have the same properties,
  // this will get the property names from the first region
  let propertyNames = regions.length > 0 ? Object.keys(regions[0]) : [];
  return { regions, propertyNames, columnTypes };
};

export const fetchGeojsonById = createAsyncThunk(
  'geojson/fetchGeojsonById',
  async (id, thunkApi) => {
    try {
      const response = await apis.getGeojsonById(id);
      const geojson = geobuf.decode(new Pbf(response.data));
      const { regions, propertyNames, columnTypes } = processGeojson(geojson);
      thunkApi.dispatch(setChoroplethData({ regions, propertyNames, columnTypes }));
      return { geoJSON: geojson, selectedGeoId: id };
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchGeojson = createAsyncThunk(
  'geojson/fetchGeojson',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apis.getGeojson();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteGeojsonById = createAsyncThunk(
  'geojson/deleteGeojsonById',
  async (_, { rejectWithValue, getState }) => {
    try {
      const id = getState().geojson.selectedGeoId;
      const response = await apis.deleteGeojsonById(id);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: 'An error occurred. Please try again.' });
      }
    }
  }
);

export const uploadGeoJSON = createAsyncThunk(
  'geojson/uploadGeoJSON',
  async (geoJSON, thunkApi) => {
    try {
      const { regions, propertyNames, columnTypes } = processGeojson(geoJSON);
      thunkApi.dispatch(setChoroplethData({ regions, propertyNames, columnTypes }));
      return { geoJSON: geoJSON };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchGeojson = createAsyncThunk(
  'geojson/searchGeojson',
  async (query, { rejectWithValue }) => {
    try {
      const response = await apis.searchGeojson(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createGeojson = createAsyncThunk('geojson/createGeojson', async (_, thunkApi) => {
  try {
    const encodeGeojson = geobuf.encode(thunkApi.getState().geojson.geojson.geoJSON, new Pbf());
    const response = await apis.createGeojson(encodeGeojson, null, true, 'untitled');
    console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

const initialState = {
  items: [],
  selectedGeoId: '',
  geojson: {},
  isLoadingItems: true,
  isLoadingGeojson: false,
  isSavingGeojson: false
};

const geoJsonSlice = createSlice({
  name: 'geojson',
  initialState,
  reducers: {
    resetGeoJsonData: () => initialState,
    startLoadingGeojson: (state) => {
      state.isLoadingGeojson = true;
    },
    stopLoadingGeojson: (state) => {
      state.isLoadingGeojson = false;
    },
    setSelectedGeoId: (state, action) => {
      state.selectedGeoId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeojson.pending, (state) => {
        state.isLoadingItems = true;
      })
      .addCase(fetchGeojson.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoadingItems = false;
      })
      .addCase(fetchGeojson.rejected, (state) => {
        state.isLoadingItems = false;
      })
      .addCase(fetchGeojsonById.pending, (state) => {
        state.isLoadingGeojson = true;
      })
      .addCase(fetchGeojsonById.fulfilled, (state, action) => {
        state.geojson = action.payload;
        state.selectedGeoId = action.payload.selectedGeoId;
        state.isLoadingGeojson = false;
      })
      .addCase(fetchGeojsonById.rejected, (state) => {
        state.isLoadingGeojson = false;
      })
      .addCase(createGeojson.pending, (state) => {
        state.isSavingGeojson = true;
      })
      .addCase(createGeojson.fulfilled, (state, action) => {
        state.selectedGeoId = action.payload.id;
        state.isSavingGeojson = false;
      })
      .addCase(createGeojson.rejected, (state) => {
        state.isSavingGeojson = false;
      })
      .addCase(searchGeojson.pending, (state) => {
        state.isLoadingItems = true;
      })
      .addCase(uploadGeoJSON.fulfilled, (state, action) => {
        state.geojson = { geoJSON: action.payload.geoJSON };
        state.isLoadingGeojson = false;
        state.selectedGeoId = null;
      })
      .addCase(uploadGeoJSON.rejected, (state) => {
        state.isLoadingGeojson = false;
      })
      .addCase(searchGeojson.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoadingItems = false;
      })
      .addCase(searchGeojson.rejected, (state) => {
        state.isLoadingItems = false;
      })
      .addCase(deleteGeojsonById.pending, (state) => {
        state.isLoadingItems = true;
      })
      .addCase(deleteGeojsonById.fulfilled, (state) => {
        state.selectedGeoId = null;
        state.geojson = {};
        state.isLoadingItems = false;
      })
      .addCase(deleteGeojsonById.rejected, (state) => {
        state.selectedGeoId = null;
        state.geojson = {};
        state.isLoadingItems = false;
      });
  }
});

export const { startLoadingGeojson, stopLoadingGeojson, resetGeoJsonData, setSelectedGeoId } =
  geoJsonSlice.actions;
export default geoJsonSlice.reducer;
