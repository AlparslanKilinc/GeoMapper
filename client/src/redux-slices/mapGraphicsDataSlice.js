import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapId: null, // Assuming you will be using ObjectId to link it
  points: Array(10).fill({}),
  regions: [],
  columnTypes: {},
  addedColumns: [],
  nameByProperty: 'Name',
  valueByProperty: 'Value',
  LatByProperty: 'Lat',
  LonByProperty: 'Lon',
  colorByProperty: 'Color',
  sizeByProperty: 'Size',
  labelByProperty: '',
  isLabelVisible: false,
  propertyNames: [],
  selectedRegionIdx: -1,
  columnValidationErrors: {}
};

function isValidValueForType(value, type) {
  if (value === '' || value === null || value === undefined) {
    return true;
  }

  if (type === 'number') {
    const number = Number(value);
    const isValidNumber = !isNaN(number) && isFinite(number);
    return isValidNumber;
  } else if (type === 'text') {
    const isString = typeof value === 'string';
    return isString;
  }
  return false;
}

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
      delete state.columnTypes[propertyToDelete];
    },
    addColumn: (state, action) => {
      const newColumn = action.payload;
      state.addedColumns.push(newColumn);
      state.columnTypes[newColumn] = 'text';
    },
    removeColumn: (state, action) => {
      const columnToRemove = action.payload;
      state.addedColumns = state.addedColumns.filter((column) => column !== action.payload);
      delete state.columnTypes[columnToRemove];
    },
    setColumnType: (state, action) => {
      const { columnName, columnType } = action.payload;
      state.columnTypes[columnName] = columnType;
    },
    validateColumnData: (state, action) => {
      const columnName = action.payload.columnName;
      const columnType = state.columnTypes[columnName];
      let isColumnInvalid = false;

      state.regions.forEach((region) => {
        const value = region[columnName];
        if (!isValidValueForType(value, columnType)) {
          isColumnInvalid = true;
        }
      });

      if (isColumnInvalid) {
        state.columnValidationErrors[columnName] = 'Invalid Data Type';
      } else {
        delete state.columnValidationErrors[columnName];
      }
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
      const { propertyNames, regions, columnTypes } = action.payload;
      state.propertyNames = propertyNames;
      state.regions = regions;
      state.columnTypes = columnTypes;
    },
    setRegionProperty: (state, action) => {
      const { propertyName, value, id } = action.payload;
      let idx = state.selectedRegionIdx;
      if( id !== undefined) idx = id;
      const region = state.regions[idx];
      region[propertyName] = value;
    },
    setSelectedRegionIdx: (state, action) => {
      state.selectedRegionIdx = action.payload;
    },
    toggleLabelVisibility: (state, action) => {
      state.isLabelVisible = !state.isLabelVisible;
    },
    setLabelByProperty: (state, action) => {
      state.labelByProperty = action.payload;
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
  setSelectedRegionIdx,
  setColumnType,
  addColumn,
  removeColumn,
  validateColumnData,
  toggleLabelVisibility,
  setLabelByProperty
} = mapGraphicsDataSlice.actions;
export default mapGraphicsDataSlice.reducer;
