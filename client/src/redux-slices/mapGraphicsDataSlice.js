import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapId: null, // Assuming you will be using ObjectId to link it
  points: [],
  regions: [],
  colorByProperty: 'TEAM',
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
      const { propertyName, value } = action.payload;
      const region = state.regions[state.selectedRegionIdx];
      region[propertyName] = value;
    },
    setSelectedRegionIdx: (state, action) => {
      state.selectedRegionIdx = action.payload;
    }
  }
});

export const {
  changeSizeByProperty,
  changeColorByProperty,
  setChoroplethData,
  setNameByProperty,
  setRegionProperty,
  setSelectedRegionIdx
} = mapGraphicsDataSlice.actions;
export default mapGraphicsDataSlice.reducer;
