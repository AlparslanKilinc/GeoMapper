import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapId: null, // Assuming you will be using ObjectId to link it
  points: [],
  regions: [],
  colorByProperty: 'GOAT',
  sizeByProperty: '',
  nameByProperty: 'NAME',
  propertyNames: [],
  selectedRegionIdx: -1
};

const mapGraphicsDataSlice = createSlice({
  name: 'mapGraphics',
  initialState,
  reducers: {
    changeSizeByProperty: (state, action) => {
      state.sizeByProperty = action.payload;
    },

    changeColorByProperty: (state, action) => {
      state.colorByProperty = action.payload;
    },
    setChoroplethData: (state, action) => {
      const { propertyNames, regions } = action.payload;
      state.propertyNames = propertyNames;
      state.regions = regions;
    },
    setNameByProperty: (state, action) => {
      state.nameByProperty = action.payload;
    },
    setRegionProperty: (state, action) => {
      const { propertyName, value, id } = action.payload;
      let idx = id || state.selectedRegionIdx;
      const region = state.regions[idx];
      region[propertyName] = value;
    },
    setSelectedRegionIdx: (state, action) => {
      state.selectedRegionIdx = action.payload;
    },
    changeNameByProperty: (state, action) => {
      state.nameByProperty = action.payload;
    },
    changeXByProperty: (state, action) => {
      let { property, propertyBy } = action.payload;
      state[property] = propertyBy;
    }
  }
});

export const {
  changeSizeByProperty,
  changeColorByProperty,
  setChoroplethData,
  setNameByProperty,
  setRegionProperty,
  setSelectedRegionIdx,
  changeNameByProperty,
  changeXByProperty
} = mapGraphicsDataSlice.actions;
export default mapGraphicsDataSlice.reducer;
