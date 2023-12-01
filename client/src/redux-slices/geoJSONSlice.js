import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apis from '../store-request-api/geojsonRequestApi';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import { setChoroplethData, setPointData } from './mapGraphicsDataSlice';

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
  columnTypes['male'] = 'number';
  columnTypes['female'] = 'number';
  geojson.features.forEach((feature, index) => {
    // Extract only the first 5 properties
    let firstFiveProperties = Object.fromEntries(Object.entries(feature.properties).slice(0, 5));
    for (const [key, value] of Object.entries(firstFiveProperties)) {
      columnTypes[key] = getType(value);
    }

    // generate random density from 1 to 100
    const male = parseInt(Math.random() * 10);
    const female = parseInt(Math.random() * 10);
    regions.push({ ...firstFiveProperties, GOAT: getRandomNbaPlayer(), male, female });
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
      thunkApi.dispatch(setPointData());
      return { geoJSON: geojson };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
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

const geoJsonSlice = createSlice({
  name: 'geojson',
  initialState: {
    items: [],
    geojson: {},
    isLoadingItems: true,
    isLoadingGeojson: false
  },
  reducers: {
    setUploadedGeoJSON: (state, action) => {
      state.geojson = { geoJSON: action.payload };
      state.isLoadingGeojson = false;
    },
    startLoadingGeojson: (state) => {
      state.isLoadingGeojson = true;
    },
    stopLoadingGeojson: (state) => {
      state.isLoadingGeojson = false;
    },
    clearGeojson: (state) => {
      state.geojson = {};
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
        state.isLoadingGeojson = false;
      })
      .addCase(fetchGeojsonById.rejected, (state) => {
        state.isLoadingGeojson = false;
      })
      .addCase(searchGeojson.pending, (state) => {
        state.isLoadingItems = true;
      })
      .addCase(searchGeojson.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoadingItems = false;
      })
      .addCase(searchGeojson.rejected, (state) => {
        state.isLoadingItems = false;
      });
  }
});

export const { setUploadedGeoJSON, startLoadingGeojson, stopLoadingGeojson, clearGeojson } =
  geoJsonSlice.actions;
export default geoJsonSlice.reducer;
