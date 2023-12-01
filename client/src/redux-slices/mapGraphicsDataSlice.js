import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapId: null, // Assuming you will be using ObjectId to link it
  points: {
    '36.7783#-119.4179': { lat: 36.7783, lon: -119.4179, size: 21, color: 'Jordan', opacity: 0.1 },
    '31.9686#-99.9018': { lat: 31.9686, lon: -99.9018, size: 20, color: 'Kobe', opacity: 0.2 },
    '27.9944#-81.7603': { lat: 27.9944, lon: -81.7603, size: 15, color: 'LeBron', opacity: 0.6 },
    '40.7128#-74.006': { lat: 40.7128, lon: -74.006, size: 30, color: 'Kobe', opacity: 0.5 },
    '40.6331#-89.3985': { lat: 40.6331, lon: -89.3985, size: 19, color: 'Kobe', opacity: 0.6 },
    '41.2033#-77.1945': { lat: 41.2033, lon: -77.1945, size: 47, color: 'Kobe', opacity: 0.3 },
    '40.4173#-82.9071': { lat: 40.4173, lon: -82.9071, size: 50, color: 'LeBron', opacity: 0.9 },
    '32.1656#-82.9001': { lat: 32.1656, lon: -82.9001, size: 26, color: 'Kobe', opacity: 0.1 },
    '35.7596#-79.0193': { lat: 35.7596, lon: -79.0193, size: 25, color: 'Jordan', opacity: 0.1 },
    '44.3148#-85.6024': { lat: 44.3148, lon: -85.6024, size: 12, color: 'Kobe', opacity: 0.4 }
  },
  regions: [],
  columnTypes: {},
  addedColumns: [],
  nameByProperty: 'Name',
  valueByProperty: 'Value',
  LatByProperty: 'lat',
  LonByProperty: 'lon',
  colorByProperty: 'color',
  sizeByProperty: 'size',
  fixedSymbolSize: 10,
  fixedOpacity: 0.5,
  opacityByProperty: '',
  fixedColor: '#800080',
  labelByProperty: '',
  isLabelVisible: false,
  propertyNames: [],
  selectedRegionIdx: -1,
  columnValidationErrors: {},
  randomColumnCounter: 0,
  validationMessage:
    '\u26A0 Looks like your dataset is empty. Please upload data or manually enter values for each region.',
  addSymbolMode: false,
  selectedPointKey: null,
  valuePerDot: 1,
  dotDensityByProperty: ['male', 'female']
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

const performValidation = (state) => {
  let isColumnInvalid = false;
  let message = '✓ No errors found.';

  Object.keys(state.columnTypes).forEach((columnName) => {
    const columnType = state.columnTypes[columnName];

    state.regions.forEach((region) => {
      const value = region[columnName];
      if (!isValidValueForType(value, columnType)) {
        isColumnInvalid = true;
        message = 'X Looks like there are some errors in your dataset.';
      }
    });
  });

  if (!isColumnInvalid) {
    for (let region of state.regions) {
      if (!region[state.nameByProperty] || !region[state.colorByProperty]) {
        message =
          '\u26A0 Looks like your dataset is empty. Please upload data or manually enter values for each region.';
        break;
      }
    }
  }

  state.validationMessage = message;
  return isColumnInvalid;
};

const mapGraphicsDataSlice = createSlice({
  name: 'mapGraphics',
  initialState,
  reducers: {
    resetMapGraphicsData: () => initialState,
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
      const isInvalid = performValidation(state);

      if (isInvalid) {
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
      performValidation(state);
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
      if (id !== undefined) idx = id;
      const region = state.regions[idx];
      region[propertyName] = value;
    },
    generateRandomColumn: (state) => {
      state.randomColumnCounter += 1;
      const randomColumnName = `RandomData_${state.randomColumnCounter}`;
      state.addedColumns.push(randomColumnName);
      state.propertyNames.push(randomColumnName);
      state.columnTypes[randomColumnName] = 'number';

      const entities = state.regions;
      Object.values(entities).forEach((entity) => {
        entity[randomColumnName] = Math.floor(Math.random() * 100);
      });
    },
    setSelectedRegionIdx: (state, action) => {
      state.selectedRegionIdx = action.payload;
    },
    toggleLabelVisibility: (state, action) => {
      state.isLabelVisible = !state.isLabelVisible;
    },
    setLabelByProperty: (state, action) => {
      state.labelByProperty = action.payload;
    },
    setFixedSymbolSize: (state, action) => {
      state.fixedSymbolSize = action.payload;
    },
    setFixedOpacity: (state, action) => {
      state.fixedOpacity = action.payload;
    },
    setPropertyNames: (state, action) => {
      state.propertyNames = action.payload;
    },
    addPoint: (state, action) => {
      const { lat, lon, properties } = action.payload;
      state.points[`${lat}#${lon}`] = { lat, lon, ...properties };
    },
    toggleAddSymbolMode: (state) => {
      state.addSymbolMode = !state.addSymbolMode;
    },
    setSelectedPointKey: (state, action) => {
      state.selectedPointKey = action.payload;
    },
    setPointProperty: (state, action) => {
      const { propertyName, value } = action.payload;
      const point = state.points[state.selectedPointKey];
      point[propertyName] = value;
    },

    setValuePerDot: (state, action) => {
      state.valuePerDot = action.payload;
    },

    addDotDesityByProperty: (state, action) => {
      state.dotDensityByProperty.push(action.payload);
    },
    removeDotDensityProperty: (state, action) => {
      state.dotDensityByProperty = state.dotDensityByProperty.filter(
        (property) => property !== action.payload
      );
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
  setLabelByProperty,
  setFixedSymbolSize,
  setFixedOpacity,
  setPropertyNames,
  generateRandomColumn,
  resetMapGraphicsData,
  addPoint,
  toggleAddSymbolMode,
  setSelectedPointKey,
  setPointProperty,
  setValuePerDot,
  addDotDesityByProperty,
  removeDotDensityProperty
} = mapGraphicsDataSlice.actions;
export default mapGraphicsDataSlice.reducer;