import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apis from '../store-request-api/geojsonRequestApi';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import { setChoroplethData } from './mapGraphicsDataSlice';

const getRandomNbaPlayer = () => {
  const teams = ['Lebron', 'Kobe', 'Jordan'];
  return teams[parseInt(Math.random() * teams.length)];
};

// const processGeojson = (geojson) => {
//   // remove all properties from features
//   let regions = [];
//   geojson.features.forEach((feature, index) => {
//     //from feature.properties only take the first 5 properties

//     regions.push({ ...feature.properties, TEAM: getRandomNbaPlayer() });
//     feature.properties = { regionIdx: index };
//   });
//   let propertyNames = Object.keys(regions[0]);
//   return { regions, propertyNames };
// };

const processGeojson = (geojson) => {
  let regions = [];
  geojson.features.forEach((feature, index) => {
    // Extract only the first 5 properties
    let firstFiveProperties = Object.fromEntries(Object.entries(feature.properties).slice(0, 5));

    regions.push({ ...firstFiveProperties, TEAM: getRandomNbaPlayer() });
    feature.properties = { regionIdx: index };
  });

  // Assuming that all features have the same properties,
  // this will get the property names from the first region
  let propertyNames = regions.length > 0 ? Object.keys(regions[0]) : [];
  return { regions, propertyNames };
};

export const fetchGeojsonById = createAsyncThunk(
  'geojson/fetchGeojsonById',
  async (id, thunkApi) => {
    try {
      const response = await apis.getGeojsonById(id);
      const geojson = geobuf.decode(new Pbf(response.data));
      console.log(geojson);
      const { regions, propertyNames } = processGeojson(geojson);
      thunkApi.dispatch(setChoroplethData({ regions, propertyNames }));
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

const geoJsonSlice = createSlice({
  name: 'geojson',
  initialState: {
    items: [],
    geojson: null,
    isLoadingItems: true,
    isLoadingGeojson: false
  },
  reducers: {},
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
      });
  }
});

export default geoJsonSlice.reducer;
