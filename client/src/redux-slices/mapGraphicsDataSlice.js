import { createSlice } from '@reduxjs/toolkit';

// '36.7783#-119.4179': { lat: 36.7783, lon: -119.4179, size: 21, color: 'Jordan', opacity: 0.1 },
// '31.9686#-99.9018': { lat: 31.9686, lon: -99.9018, size: 20, color: 'Kobe', opacity: 0.2 },
// '27.9944#-81.7603': { lat: 27.9944, lon: -81.7603, size: 15, color: 'LeBron', opacity: 0.6 },
// '40.7128#-74.006': { lat: 40.7128, lon: -74.006, size: 30, color: 'Kobe', opacity: 0.5 },
// '40.6331#-89.3985': { lat: 40.6331, lon: -89.3985, size: 19, color: 'Kobe', opacity: 0.6 },
// '41.2033#-77.1945': { lat: 41.2033, lon: -77.1945, size: 47, color: 'Kobe', opacity: 0.3 },
// '40.4173#-82.9071': { lat: 40.4173, lon: -82.9071, size: 50, color: 'LeBron', opacity: 0.9 },
// '32.1656#-82.9001': { lat: 32.1656, lon: -82.9001, size: 26, color: 'Kobe', opacity: 0.1 },
// '35.7596#-79.0193': { lat: 35.7596, lon: -79.0193, size: 25, color: 'Jordan', opacity: 0.1 },
// '44.3148#-85.6024': { lat: 44.3148, lon: -85.6024, size: 12, color: 'Kobe', opacity: 0.4 }

const initialState = {
  mapId: null, // Assuming you will be using ObjectId to link it
  points: [],
  regions: [],
  columnTypes: {},
  addedColumns: [],
  nameByProperty: 'name',
  LatByProperty: 'lat',
  LonByProperty: 'lon',
  colorByProperty: 'color',
  sizeByProperty: 'size',
  heightByProperty: 'height',
  fixedSymbolSize: 10,
  fixedOpacity: 0.5,
  opacityByProperty: '',
  fixedColor: '#800080',
  labelByProperty: '',
  isLabelVisible: false,
  propertyNames: [],
  pointProperties: [],
  selectedRegionIdx: -1,
  columnValidationErrors: {},
  cellValidationErrors: {},
  randomColumnCounter: 0,
  validationMessage:
    '⚠️You can set number or text columns using the menu in the column header. A red cell indicates missing data or a problem that needs to be fixed.',
  addSymbolMode: false,
  selectedPointKey: null,
  valuePerDot: 1,
  dotDensityByProperty: ['male', 'female']
};

const mapGraphicsDataSlice = createSlice({
  name: 'mapGraphics',
  initialState,
  reducers: {
    resetMapGraphicsData: () => initialState,
    addProperty: (state, action) => {
      const newProperty = action.payload.columnName;
      const mapGraphicsType = action.payload.mapGraphicsType;

      if (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') {
        state.pointProperties.push(newProperty);
        Object.keys(state.points).forEach((pointKey) => {
          state.points[pointKey][newProperty] = '';
        });
      } else {
        state.propertyNames.push(newProperty);
        state.regions.forEach((region) => {
          region[newProperty] = '';
        });
      }
    },
    deleteProperty: (state, action) => {
      const { propertyToDelete, mapGraphicsType } = action.payload;
      if (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') {
        state.pointProperties = state.pointProperties.filter((p) => p !== propertyToDelete);
        Object.keys(state.points).forEach((pointKey) => {
          delete state.points[pointKey][propertyToDelete];
        });
      } else {
        state.propertyNames = state.propertyNames.filter((p) => p !== propertyToDelete);
        state.regions.forEach((region) => {
          delete region[propertyToDelete];
        });
      }
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
      delete state.columnValidationErrors[columnToRemove];
    },
    updateColumnName: (state, action) => {
      const { oldName, newName, mapGraphicsType } = action.payload;
      const columnIndex = state.addedColumns.indexOf(oldName);
      if (columnIndex !== -1) {
        state.addedColumns[columnIndex] = newName;
      }
      // Update columnTypes
      if (state.columnTypes[oldName] !== undefined) {
        state.columnTypes[newName] = state.columnTypes[oldName];
        delete state.columnTypes[oldName];
      }
      if (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') {
        state.points;
      } else {
        state.regions.forEach((region) => {
          if (region[oldName] !== undefined) {
            region[newName] = region[oldName];
            delete region[oldName];
          }
        });
      }
    },
    setColumnType: (state, action) => {
      const { columnName, columnType } = action.payload;
      state.columnTypes[columnName] = columnType;
    },
    validateColumnData: (state, action) => {
      const { columnName, columnType } = action.payload;
      const entities = state.regions;
      let isValid = true;
      if (columnType === 'number') {
        Object.values(entities).forEach((entity) => {
          if (
            entity[columnName] !== '' &&
            (isNaN(Number(entity[columnName])) || !isFinite(entity[columnName]))
          ) {
            isValid = false;
          }
        });
      } else if (columnType === 'text') {
        Object.values(entities).forEach((entity) => {
          if (
            entity[columnName] !== '' &&
            typeof entity[columnName] !== 'string' &&
            typeof entity[columnName] !== 'number'
          ) {
            isValid = false;
          }
        });
      }
      if (isValid) {
        delete state.columnValidationErrors[columnName];
      } else {
        state.columnValidationErrors[columnName] = 'Invalid Data Type';
      }
    },

    validateCell: (state, action) => {
      const { rowIndex, columnName, value } = action.payload;
      const columnType = state.columnTypes[columnName];
      let isValid = true;

      if (columnType === 'number') {
        isValid = value === '' || (!isNaN(Number(value)) && isFinite(value));
      } else if (columnType === 'text') {
        isValid = value === '' || typeof value === 'string';
      }

      const cellKey = `${rowIndex}-${columnName}`;
      if (isValid) {
        delete state.cellValidationErrors[cellKey];
      } else {
        state.cellValidationErrors[cellKey] =
          columnType === 'number' ? 'Number Required' : 'Text Required';
      }
    },
    TableValidation: (state, action) => {
      const mapGraphicsType = action.payload;
      let message = '✓ No errors found.';
      let hasErrors = false;

      switch (mapGraphicsType) {
        case 'Choropleth Map':
          for (let region of state.regions) {
            if (!region[state.nameByProperty] || region[state.nameByProperty].trim() === '') {
              message = '⚠️ Required name field is empty.';
              hasErrors = true;
              break;
            }
            console.log(state.colorByProperty);
            if (state.colorByProperty === 'color' || state.colorByProperty === null) {
              // We will let them make a map with out assigning any color and let them do it in the map
              break;
            } else if (state.columnValidationErrors[state.colorByProperty]) {
              message = `⚠️ Error in '${state.colorByProperty}' column:`;
              hasErrors = true;
            } else if (state.columnTypes[state.colorByProperty] !== 'text') {
              message = 'X Color by property must be of text type for a Choropleth Map.';
              hasErrors = true;
              break;
            }
          }
          break;

        case 'Heat Map':
          for (let region of state.regions) {
            if (!region[state.nameByProperty] || region[state.nameByProperty].trim() === '') {
              message = '⚠️ Required name field is empty.';
              hasErrors = true;
              break;
            }
            if (state.colorByProperty === 'color' || state.colorByProperty === null) {
              // We will let them make a map with out assigning any color and let them do it in the map
              break;
            } else if (state.columnValidationErrors[state.colorByProperty]) {
              message = `⚠️ Error in '${state.colorByProperty}' column:`;
              hasErrors = true;
            } else if (state.columnTypes[state.colorByProperty] !== 'number') {
              message = 'X Color By property must be of number type for a Heat Map.';
              hasErrors = true;
              break;
            }
          }
          break;

        // cases for Symbol Map, Spike Map, and Dot Density Map
        case 'Symbol Map':
          break;
        case 'Spike Map':
          break;
        case 'Dot Density Map':
          break;

        default:
          message = '⚠️ Unrecognized map type.';
          hasErrors = true;
          break;
      }

      state.validationMessage = hasErrors ? message : '✓ No errors found.';
    },
    changeNameByProperty: (state, action) => {
      state.nameByProperty = action.payload;
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
    changeHeightByProperty: (state, action) => {
      state.heightByProperty = action.payload;
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
    setPointData: (state, action) => {
      const points = {};
      for (let i = 1; i <= 10; i++) {
        points[`point${i}`] = { lat: 0, lon: 0, size: 0, color: '', size: 0 };
      }
      state.points = points;
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
        entity[randomColumnName] = Math.floor(Math.random() * 100) + 1;
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
  changeLatByProperty,
  changeLonByProperty,
  changeColorByProperty,
  changeSizeByProperty,
  changeHeightByProperty,
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
  validateCell,
  TableValidation,
  addPoint,
  toggleAddSymbolMode,
  setSelectedPointKey,
  setPointProperty,
  setValuePerDot,
  addDotDesityByProperty,
  removeDotDensityProperty,
  updateColumnName,
  setPointData
} = mapGraphicsDataSlice.actions;
export default mapGraphicsDataSlice.reducer;
