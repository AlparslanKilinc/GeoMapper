import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapId: null, // Assuming you will be using ObjectId to link it
  points: Array(10).fill({}),
  regions: [],
  nameByProperty: 'Name',
  valueByProperty: 'Value',
  LatByProperty: 'Lat',
  LonByProperty: 'Lon',
  colorByProperty: 'Color',
  sizeByProperty: 'Size',
  propertyNames: [],
  selectedRegionIdx: -1
};

const mapGraphicsDataSlice = createSlice({
  name: 'mapGraphics',
  initialState,
  reducers: {
    addProperty: (state, action) => {
      const newProperty = action.payload;
      state.propertyNames.push(newProperty);
      state.regions.forEach((region) => {
        region[newProperty] = '';
      });
    },
    deleteProperty: (state, action) => {
      const propertyToDelete = action.payload;
      state.propertyNames = state.propertyNames.filter((p) => p !== propertyToDelete);
      state.regions.forEach((region) => {
        delete region[propertyToDelete];
      });
    },
    changeNameByProperty: (state, action) => {
      state.nameByProperty = action.payload;
    },
    changeValueByProperty: (state, action) => {
      state.valueByProperty = action.payload;
    },
    changeLatByProperty: (state, action) => {
      state.LatByProperty = action.payload;
    },
    changeLonByProperty: (state, action) => {
      state.LonByProperty = action.payload;
    },
    changeColorByProperty: (state, action) => {
      state.colorByProperty = action.payload;
    },
    changeSizeByProperty: (state, action) => {
      state.sizeByProperty = action.payload;
    },
    changeXByProperty: (state, action) => {
      let { property, propertyBy } = action.payload;
      state[property] = propertyBy;
    },
    setChoroplethData: (state, action) => {
      const { propertyNames, regions } = action.payload;
      state.propertyNames = propertyNames;
      state.regions = regions;
    },
    setRegionProperty: (state, action) => {
      const { propertyName, value, id } = action.payload;
      let idx = id || state.selectedRegionIdx;
      const region = state.regions[idx];
      region[propertyName] = value;
    },
    setSelectedRegionIdx: (state, action) => {
      state.selectedRegionIdx = action.payload;
    }
  }
});

export const {
  addProperty,
  deleteProperty,
  changeNameByProperty,
  changeValueByProperty,
  changeLatByProperty,
  changeLonByProperty,
  changeColorByProperty,
  changeSizeByProperty,
  changeXByProperty,
  setChoroplethData,
  setRegionProperty,
  setSelectedRegionIdx
} = mapGraphicsDataSlice.actions;
export default mapGraphicsDataSlice.reducer;
