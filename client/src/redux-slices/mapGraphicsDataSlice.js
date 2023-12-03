import { createSlice } from '@reduxjs/toolkit';
import * as turf from '@turf/turf';

const initialState = {
  mapId: null, // Assuming you will be using ObjectId to link it
  points: [],
  regions: [],
  columnTypes: {},
  addedColumns: [],
  nameByProperty: 'name',
  latByProperty: 'lat',
  lonByProperty: 'lon',
  colorByProperty: '',
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
  selectedPointKey: -1,
  valuePerDot: 1,
  dotDensityByProperty: ['male', 'female'],
  maxSymbolSize: 100,
  minSymbolSize: 1
};

const isPointInPolygon = (point, geojson) => {
  const turfPoint = turf.point([point.lon, point.lat]);
  let isInside = false;
  if (geojson && geojson.geoJSON && geojson.geoJSON.features) {
    geojson.geoJSON.features.forEach((feature) => {
      if (turf.booleanPointInPolygon(turfPoint, feature)) {
        isInside = true;
      }
    });
  }

  return isInside;
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
    setColumnType: (state, action) => {
      const { columnName, columnType } = action.payload;
      state.columnTypes[columnName] = columnType;
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
      // Update propertyNames and pointProperties
      state.propertyNames = state.propertyNames.map((propertyName) =>
        propertyName === oldName ? newName : propertyName
      );
      state.pointProperties = state.pointProperties.map((property) =>
        property === oldName ? newName : property
      );

      if (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') {
        Object.keys(state.points).forEach((pointKey) => {
          if (state.points[pointKey][oldName] !== undefined) {
            state.points[pointKey][newName] = state.points[pointKey][oldName];
            delete state.points[pointKey][oldName];
          }
        });
      } else {
        state.regions.forEach((region) => {
          if (region[oldName] !== undefined) {
            region[newName] = region[oldName];
            delete region[oldName];
          }
        });
      }
    },
    validateColumnData: (state, action) => {
      const { columnName, columnType, mapGraphicsType } = action.payload;
      let entities;
      if (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') {
        entities = state.points;
      } else {
        entities = state.regions;
      }
      let isValid = true;
      if (columnType === 'number') {
        Object.values(entities).forEach((entity) => {
          if (
            entity[columnName] !== '' &&
            entity[columnName] !== undefined &&
            (isNaN(Number(entity[columnName])) || !isFinite(entity[columnName]))
          ) {
            isValid = false;
          }
        });
      } else if (columnType === 'text') {
        Object.values(entities).forEach((entity) => {
          if (
            entity[columnName] !== '' &&
            entity[columnName] !== undefined &&
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
      const { rowIndex, columnName, value, mapGraphicsType, geoJSON } = action.payload;
      console.log(rowIndex, columnName, value, mapGraphicsType, geoJSON);
      const columnType = state.columnTypes[columnName];
      const cellKey = `${rowIndex}-${columnName}`;
      let isValid = true;
      // General Error Checking
      if (columnType === 'number') {
        isValid = value === '' || (!isNaN(Number(value)) && isFinite(value));
      } else if (columnType === 'text') {
        isValid = value === '' || typeof value === 'string';
      }
      if (isValid) {
        delete state.cellValidationErrors[cellKey];
      } else {
        state.cellValidationErrors[cellKey] =
          columnType === 'number' ? 'Number Required' : 'Text Required';
      }
      /// Point Error Checking
      if (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') {
        /// Lat or Lon is being changed validate that it is within region
        if (
          state.points[rowIndex][state.latByProperty] === value ||
          state.points[rowIndex][state.lonByProperty] === value
        ) {
          // When Field is clear , clear error Message
          if (
            state.points[rowIndex][state.latByProperty] === '' &&
            state.points[rowIndex][state.lonByProperty] === ''
          ) {
            delete state.cellValidationErrors[`${rowIndex}-${state.lonByProperty}`];
            delete state.cellValidationErrors[`${rowIndex}-${state.latByProperty}`];
            return;
          }
          // Make Sure Both Lat and Lon are defined and Numbers
          if (
            state.points[rowIndex][state.latByProperty] === undefined ||
            state.points[rowIndex][state.lonByProperty] === undefined ||
            isNaN(Number(state.points[rowIndex][state.latByProperty])) ||
            isNaN(Number(state.points[rowIndex][state.lonByProperty]))
          ) {
            return;
          }
          const point = {
            lon: state.points[rowIndex][state.lonByProperty],
            lat: state.points[rowIndex][state.latByProperty]
          };
          if (!isPointInPolygon(point, geoJSON)) {
            console.log('Point is not within region');

            state.cellValidationErrors[`${rowIndex}-${state.lonByProperty}`] =
              'Point is not within region';
            state.cellValidationErrors[`${rowIndex}-${state.latByProperty}`] =
              'Point is not within region';
          } else {
            delete state.cellValidationErrors[`${rowIndex}-${state.lonByProperty}`];
            delete state.cellValidationErrors[`${rowIndex}-${state.latByProperty}`];
          }
        }
      }
    },
    addCellValidationErrors: (state, action) => {
      const { rowIndex, columnName, error } = action.payload;
      const cellKey = `${rowIndex}-${columnName}`;
      state.cellValidationErrors[cellKey] = error;
    },
    changeXByProperty: (state, action) => {
      let { property, propertyBy } = action.payload;
      state[property] = propertyBy;
      if (
        property === 'sizeByProperty' ||
        property === 'lonByProperty' ||
        property === 'latByProperty' ||
        property === 'heightByProperty' ||
        property === 'opacityByProperty'
      ) {
        state.columnTypes[propertyBy] = 'number';
      }
    },
    changeNameByProperty: (state, action) => {
      state.nameByProperty = action.payload;
    },
    changeLatByProperty: (state, action) => {
      state.latByProperty = action.payload;
    },
    changeLonByProperty: (state, action) => {
      state.lonByProperty = action.payload;
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
    setSelectedRegionIdx: (state, action) => {
      state.selectedRegionIdx = action.payload;
    },
    addLocationData: (state, action) => {
      const { name, lat, lon } = action.payload;
      state.points.push({ name, lat, lon, color: '', size: 0, height: 0, opacity: 0.4 });
    },
    addPoint: (state, action) => {
      const { name, color, lat, lon, size, opacity } = action.payload;
      state.points.push({ name, color, lat, lon, size, opacity });
    },
    removePoint: (state, action) => {
      const index = action.payload.rowIndex;
      if (index >= 0 && index < state.points.length) {
        state.points = [...state.points.slice(0, index), ...state.points.slice(index + 1)];
        state.selectedPointKey = -1;
      }
    },
    setRegionProperty: (state, action) => {
      const { propertyName, value, id } = action.payload;
      let idx = state.selectedRegionIdx;
      if (id !== undefined) idx = id;
      const region = state.regions[idx];
      region[propertyName] = value;
    },
    setPointProperty: (state, action) => {
      const { propertyName, value, pointIdx } = action.payload;
      if (state.points[pointIdx]) {
        state.points[pointIdx][propertyName] = value;
      }
    },
    setChoroplethData: (state, action) => {
      const { propertyNames, regions, columnTypes } = action.payload;
      state.propertyNames = propertyNames;
      state.regions = regions;
      state.columnTypes = columnTypes;
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
    setPointProperties: (state, action) => {
      state.pointProperties = action.payload;
    },
    toggleAddSymbolMode: (state) => {
      state.addSymbolMode = !state.addSymbolMode;
    },
    setSelectedPointKey: (state, action) => {
      state.selectedPointKey = action.payload;
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
            if (state.colorByProperty === null) {
              // We will let them make a map with out assigning any color and let them do it in the map
              break;
            } else if (state.columnValidationErrors[state.colorByProperty]) {
              message = `⚠️ Error in '${state.colorByProperty}' column:`;
              hasErrors = true;
            } else if (
              state.columnTypes[state.colorByProperty] !== 'text' &&
              state.columnTypes[state.colorByProperty] !== undefined
            ) {
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
            if (state.colorByProperty === null) {
              // We will let them make a map with out assigning any color and let them do it in the map
              break;
            } else if (state.columnValidationErrors[state.colorByProperty]) {
              message = `⚠️ Error in '${state.colorByProperty}' column:`;
              hasErrors = true;
            } else if (
              state.columnTypes[state.colorByProperty] !== 'number' &&
              state.columnTypes[state.colorByProperty] !== undefined
            ) {
              message = 'X Color By property must be of number type for a Heat Map.';
              hasErrors = true;
              break;
            }
          }
          break;
        case 'Symbol Map':
        case 'Spike Map':
          state.points.forEach((point, index) => {
            const latErrorKey = `${index}-${state.latByProperty}`;
            const lonErrorKey = `${index}-${state.lonByProperty}`;
            // Required Field Error
            if (!point[state.latByProperty] && !point[state.latByProperty]) {
              message = '⚠️ Required Latitude and Longitude fields are empty.';
              hasErrors = true;
              return;
            }
            // Error in Cell
            if (
              state.cellValidationErrors[latErrorKey] ||
              state.cellValidationErrors[lonErrorKey]
            ) {
              message = `⚠️ Error in latitude or longitude at row ${index}: ${
                state.cellValidationErrors[latErrorKey] || state.cellValidationErrors[lonErrorKey]
              }`;
              hasErrors = true;
              return;
            }
            // Error in Column
            if (
              state.columnValidationErrors[state.latByProperty] ||
              state.columnValidationErrors[state.lonByProperty]
            ) {
              message = 'X Latitude and Longitude must be of number type.';
              hasErrors = true;
              return;
            }
            if (
              mapGraphicsType === 'Symbol Map' &&
              state.columnValidationErrors[state.sizeByProperty]
            ) {
              message = 'X Size must be of number type for a Symbol Map.';
              hasErrors = true;
              return;
            } else if (
              mapGraphicsType === 'Spike Map' &&
              state.columnValidationErrors[state.heightByProperty]
            ) {
              message = 'X Height must be of number type for a Spike Map.';
              hasErrors = true;
              return;
            }
          });
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

    disableLabels: (state, action) => {
      state.isLabelVisible = false;
    },
    setMaxSymbolSize: (state, action) => {
      state.maxSymbolSize = action.payload;
    },
    setMinSymbolSize: (state, action) => {
      state.minSymbolSize = action.payload;
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
  setPointProperties,
  removePoint,
  addCellValidationErrors,
  addLocationData,
  dotDensityByProperty,
  disableLabels,
  setMaxSymbolSize,
  setMinSymbolSize
} = mapGraphicsDataSlice.actions;
export default mapGraphicsDataSlice.reducer;
