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
  previousProperty: '',
  isLabelVisible: false,
  propertyNames: [],
  selectedRegionIdx: -1,
  columnValidationErrors: {},
  cellValidationErrors: {},
  randomColumnCounter: 0,
  validationMessage:
    '⚠️You can set number or text columns using the menu in the column header. A red cell indicates missing data or a problem that needs to be fixed.'
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
      delete state.columnValidationErrors[columnToRemove];
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
          if (entity[columnName] !== '' && (isNaN(Number(entity[columnName])) || !isFinite(entity[columnName]))) {
            isValid = false;
          }
        });
      } else if (columnType === 'text') {
        Object.values(entities).forEach((entity) => {
          if (entity[columnName] !== '' && typeof entity[columnName] !== 'string'  && typeof entity[columnName] !== 'number') {
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
    setPreviousProperty: (state, action) => {
      state.previousProperty = action.payload;
    },
    clearLabels: (state, action) => {
      state.labelByProperty = '';
    },
    setFixedSymbolSize: (state, action) => {
      state.fixedSymbolSize = action.payload;
    },
    setFixedOpacity: (state, action) => {
      state.fixedOpacity = action.payload;
    },
    setPropertyNames: (state, action) => {
      state.propertyNames = action.payload;
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
  setPreviousProperty,
  clearLabels,
  setFixedSymbolSize,
  setFixedOpacity,
  setPropertyNames,
  generateRandomColumn,
  resetMapGraphicsData,
  validateCell,
  TableValidation
} = mapGraphicsDataSlice.actions;
export default mapGraphicsDataSlice.reducer;
