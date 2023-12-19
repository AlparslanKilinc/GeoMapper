import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as turf from '@turf/turf';
import apis from '../store-request-api/mapRequestApi';

export const saveMapGraphicsData = createAsyncThunk(
  'mapGraphics/saveMapGraphicsData',
  async (_, thunkApi) => {
    try {
      const response = await apis.saveMapGraphicsData(thunkApi.getState().mapGraphics);
      return response.data._id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const updateMapGraphicsDataById = createAsyncThunk(
  'mapGraphics/updateMapGraphicsDataById',
  async (mapGraphicsId, thunkApi) => {
    try {
      const mapGraphics = thunkApi.getState().mapGraphics;
      const response = await apis.updateMapGraphicsDataById(mapGraphicsId, mapGraphics);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getMapGraphicsDataById = createAsyncThunk(
  'mapGraphics/getMapGraphicsDataById',
  async (mapGraphicsId, thunkApi) => {
    try {
      const response = await apis.getMapGraphicsDataById(mapGraphicsId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const deleteGraphicsDataById = createAsyncThunk(
    'mapGraphics/deleteMapGraphics',
    async(mapGraphicsId, thunkApi) =>{
      try {
        const response = await apis.deleteGraphicsById(mapGraphicsId);
        return response.data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
      }
    }
)

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

const validateSingleCell = (state, rowIndex, columnName, value, mapGraphicsType, geoJSON) => {
  const columnType = state.columnTypes[columnName];
  const cellKey = `${rowIndex}-${columnName}`;
  let isValid = true;
  // Don't Validate if cell empty
  if (value === '' || value === undefined) {
    delete state.cellValidationErrors[cellKey];
    return;
  }
  // General Error Checking
  if (columnType === 'number') {
    isValid = !isNaN(Number(value)) && isFinite(value);
  } else if (columnType === 'text') {
    isValid = typeof value === 'string';
  }

  if (isValid) {
    delete state.cellValidationErrors[cellKey];
  } else {
    state.cellValidationErrors[cellKey] =
      columnType === 'number' ? 'Number Required' : 'Text Required';
  }

  /// Point Error Checking
  if (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') {
    const latProperty = state.latByProperty;
    const lonProperty = state.lonByProperty;
    if (!latProperty || !lonProperty) return;

    const currentLat = state.points[rowIndex][latProperty];
    const currentLon = state.points[rowIndex][lonProperty];

    if (currentLat === 0 && currentLon === 0) {
      delete state.cellValidationErrors[`${rowIndex}-${latProperty}`];
      delete state.cellValidationErrors[`${rowIndex}-${lonProperty}`];
      return;
    }

    // Check for unique lat-lon pair
    const isDuplicate = state.points.some((point, index) => {
      const existingLat = parseFloat(point[latProperty]);
      const existingLon = parseFloat(point[lonProperty]);
      const newLat = parseFloat(currentLat);
      const newLon = parseFloat(currentLon);

      const tolerance = 0.00001;
      return (
        index !== rowIndex &&
        Math.abs(existingLat - newLat) < tolerance &&
        Math.abs(existingLon - newLon) < tolerance
      );
    });

    if (isDuplicate) {
      state.cellValidationErrors[`${rowIndex}-${latProperty}`] = 'Duplicate lat-lon pair';
      state.cellValidationErrors[`${rowIndex}-${lonProperty}`] = 'Duplicate lat-lon pair';
      return;
    }
    // Validate if lat and lon are within the boundaries of geojson only if both are present
    if (currentLat && currentLon && !isNaN(Number(currentLat)) && !isNaN(Number(currentLon))) {
      const point = { lat: currentLat, lon: currentLon };
      if (!isPointInPolygon(point, geoJSON)) {
        state.cellValidationErrors[`${rowIndex}-${latProperty}`] = 'Point is not within region';
        state.cellValidationErrors[`${rowIndex}-${lonProperty}`] = 'Point is not within region';
      } else {
        delete state.cellValidationErrors[`${rowIndex}-${latProperty}`];
        delete state.cellValidationErrors[`${rowIndex}-${lonProperty}`];
      }
    }
  }
};

const initialState = {
  mapGraphicsId: null,
  points: [],
  regions: [],
  columnTypes: {},
  addedColumns: [],
  matchKey: '',
  nameByProperty: 'name',
  latByProperty: 'lat',
  lonByProperty: 'lon',
  colorByProperty: '',
  sizeByProperty: 'size',
  heightByProperty: 'height',
  fixedSymbolSize: 10,
  fixedOpacity: 1,
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
  valuePerDot: 7,
  dotDensityByProperty: [],
  maxSymbolSize: 100,
  minSymbolSize: 20,
  minProperty: 0,
  maxProperty: 0,
  isSaving: false
};

const mapGraphicsDataSlice = createSlice({
  name: 'mapGraphics',
  initialState,
  reducers: {
    resetMapGraphicsData: () => initialState,
    populateMapGraphics: (state, action) => {
      const mapGraphics = action.payload;

      Object.keys(mapGraphics).forEach((key) => {
        if (state.hasOwnProperty(key)) {
          state[key] = mapGraphics[key];
        }
      });
    },
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
    changeMatchKey: (state, action) => {
      state.matchKey = action.payload;
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
      state.dotDensityByProperty = state.dotDensityByProperty.filter(
        (column) => column !== columnToRemove
      );
      state.addedColumns = state.addedColumns.filter((column) => column !== action.payload);
      delete state.columnTypes[columnToRemove];
      delete state.columnValidationErrors[columnToRemove];
    },
    setColumnType: (state, action) => {
      const { columnName, columnType } = action.payload;
      state.columnTypes[columnName] = columnType;
    },
    addDataFromCSVorExcel: (state, action) => {
      const { data, mapGraphicsType } = action.payload;
      const expectedRegionLength = state.regions.length;

      const nameByProperty = state.nameByProperty;
      const matchKey = state.matchKey;

      data.forEach((row, rowIndex) => {
        // Check and add new properties/columns
        Object.keys(row).forEach((key) => {
          const isNumeric = !isNaN(row[key]);
          const columnType = isNumeric ? 'number' : 'text';

          if (!state.addedColumns.includes(key)) {
            // Add as a column and set its type
            state.addedColumns.push(key);
            state.columnTypes[key] = columnType;
          }

          // Add as a property
          if (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') {
            if (!state.pointProperties.includes(key)) {
              state.pointProperties.push(key);
            }
          } else {
            if (!state.propertyNames.includes(key)) {
              state.propertyNames.push(key);
            }
          }
        });

        // Add or merge the row data to points or regions
        if (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') {
          // For points, add new points directly
          state.points.push(row);
        } else {
          // For regions, merge data into existing rows as new columns
          // if (rowIndex < expectedRegionLength) {
          // match each row using the matchKey with nameByProperty

          let idx = rowIndex;

          if (matchKey !== '' && nameByProperty !== '') {
            idx = state.regions.findIndex((region) => region[nameByProperty] === row[matchKey]);
            if (row[matchKey] === 'United Kingdom') {
              console.log('idx', idx);
            }
          }

          const existingRegion = state.regions[idx];
          if (!existingRegion) {
            console.log(row);
            return;
          }
          for (const key in row) {
            existingRegion[key] = row[key];
          }
          // } else {
          //   // Handle case where the data row exceeds the existing region rows
          //   state.validationMessage = `Row ${
          //     rowIndex + 1
          //   } exceeds the existing region data length and was not added.`;
          // }
        }
      });
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
      console.log('validateColumnData');
      const { columnName, columnType, mapGraphicsType } = action.payload;
      let entities;
      if (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') {
        entities = state.points;
      } else {
        entities = state.regions;
      }
      let isValid = true;
      if (columnType === 'number') {
        Object.values(entities).forEach((entity, index) => {
          const cellKey = `${index}-${columnName}`;
          if (
            entity[columnName] !== '' &&
            entity[columnName] !== undefined &&
            (isNaN(Number(entity[columnName])) || !isFinite(Number(entity[columnName])))
          ) {
            isValid = false;
            state.cellValidationErrors[cellKey] = 'Number Required';
          } else if (state.cellValidationErrors[cellKey] === 'Text Required') {
            delete state.cellValidationErrors[cellKey];
          }
        });
      } else if (columnType === 'text') {
        Object.values(entities).forEach((entity, index) => {
          const cellKey = `${index}-${columnName}`;
          if (
            entity[columnName] !== '' &&
            entity[columnName] !== undefined &&
            typeof entity[columnName] !== 'string' &&
            typeof entity[columnName] !== 'number'
          ) {
            isValid = false;
            state.cellValidationErrors[cellKey] = 'Text Required';
          } else if (state.cellValidationErrors[cellKey] === 'Number Required') {
            delete state.cellValidationErrors[cellKey];
          }
        });
      }
      if (isValid) {
        delete state.columnValidationErrors[columnName];
      } else {
        state.columnValidationErrors[columnName] = 'Invalid Data Type In Column';
      }
    },
    validateCell: (state, action) => {
      console.log('validateCell');
      const { rowIndex, columnName, value, mapGraphicsType, geoJSON } = action.payload;
      validateSingleCell(state, rowIndex, columnName, value, mapGraphicsType, geoJSON);
    },
    validateAllCells: (state, action) => {
      console.log('validateAllCells');
      const { mapGraphicsType, geoJSON } = action.payload;
      if (mapGraphicsType === 'Spike Map' || mapGraphicsType === 'Symbol Map') {
        state.points.forEach((point, rowIndex) => {
          Object.keys(point).forEach((columnName) => {
            const value = point[columnName];
            validateSingleCell(state, rowIndex, columnName, value, mapGraphicsType, geoJSON);
          });
        });
      } else {
        state.regions.forEach((region, rowIndex) => {
          Object.keys(region).forEach((columnName) => {
            const value = region[columnName];
            validateSingleCell(state, rowIndex, columnName, value, mapGraphicsType, geoJSON);
          });
        });
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
    addPoint: (state, action) => {
      const newPoint = {
        ...action.payload,
        size: state.fixedSymbolSize,
        height: state.fixedSymbolSize,
        color: state.colorByProperty ? 'default' : action.payload.color
      };

      state.points.push(newPoint);
    },
    removePoint: (state, action) => {
      const index = action.payload.rowIndex;
      if (index >= 0 && index < state.points.length) {
        state.points = [...state.points.slice(0, index), ...state.points.slice(index + 1)];
        state.selectedPointKey = -1;
      }
    },
    popPoint: (state, action) => {
      state.points.pop();
    },
    validateRow: (state, action) => {
      const { rowIndex, geoJSON } = action.payload;
      const row = state.points[rowIndex];
      if (!row) {
        Object.keys(state.cellValidationErrors).forEach((key) => {
          if (key.startsWith(`${rowIndex}-`)) {
            console.log('deleting', key);
            delete state.cellValidationErrors[key];
          }
        });
        return;
      }
      const latProperty = state.latByProperty;
      const lonProperty = state.lonByProperty;

      // Validate each cell in the row
      Object.keys(row).forEach((columnName) => {
        const value = row[columnName];
        const columnType = state.columnTypes[columnName];
        const cellKey = `${rowIndex}-${columnName}`;
        let isValid = true;

        // Clear error if cell is empty
        console.log('value', value);
        if (value === '' || value === null || value === undefined) {
          delete state.cellValidationErrors[cellKey];
          return;
        }

        // General Error Checking
        if (columnType === 'number') {
          isValid = !isNaN(Number(value)) && isFinite(value);
        } else if (columnType === 'text') {
          isValid = typeof value === 'string';
        }

        if (isValid) {
          delete state.cellValidationErrors[cellKey];
        } else {
          state.cellValidationErrors[cellKey] =
            columnType === 'number' ? 'Number Required' : 'Text Required';
        }
      });

      // Check for unique lat-lon pair and geojson boundary
      const currentLat = row[latProperty];
      const currentLon = row[lonProperty];
      if (currentLat === undefined && currentLon === undefined) {
        delete state.cellValidationErrors[`${rowIndex}-${latProperty}`];
        delete state.cellValidationErrors[`${rowIndex}-${lonProperty}`];
        return;
      }
      const isDuplicate = state.points.some((point, index) => {
        return (
          index !== rowIndex &&
          point[latProperty] === currentLat &&
          point[lonProperty] === currentLon
        );
      });

      if (isDuplicate) {
        state.cellValidationErrors[`${rowIndex}-${latProperty}`] = 'Duplicate lat-lon pair';
        state.cellValidationErrors[`${rowIndex}-${lonProperty}`] = 'Duplicate lat-lon pair';
      } else if (
        currentLat &&
        currentLon &&
        !isNaN(Number(currentLat)) &&
        !isNaN(Number(currentLon))
      ) {
        const point = { lat: currentLat, lon: currentLon };
        if (!isPointInPolygon(point, geoJSON)) {
          state.cellValidationErrors[`${rowIndex}-${latProperty}`] = 'Point is not within region';
          state.cellValidationErrors[`${rowIndex}-${lonProperty}`] = 'Point is not within region';
        } else {
          delete state.cellValidationErrors[`${rowIndex}-${latProperty}`];
          delete state.cellValidationErrors[`${rowIndex}-${lonProperty}`];
        }
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
    setMinProperty: (state, action) => {
      state.minProperty = action.payload;
    },
    setMaxProperty: (state, action) => {
      state.maxProperty = action.payload;
    },
    TableValidation: (state, action) => {
      console.log('TableValidation');
      const mapGraphicsType = action.payload;
      let message = '✓ No errors found.';
      let hasErrors = false;

      switch (mapGraphicsType) {
        case 'Choropleth Map':
          for (let region of state.regions) {
            if (
              region[state.nameByProperty] === undefined ||
              region[state.nameByProperty] === null ||
              region[state.nameByProperty] === ''
            ) {
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
            if (
              region[state.nameByProperty] === undefined ||
              region[state.nameByProperty] === null ||
              region[state.nameByProperty] === ''
            ) {
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
            if (
              point[state.latByProperty] === undefined ||
              point[state.latByProperty] === null ||
              point[state.latByProperty] === '' ||
              point[state.lonByProperty] === undefined ||
              point[state.lonByProperty] === null ||
              point[state.lonByProperty] === ''
            ) {
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
            if (state.columnValidationErrors[state.colorByProperty]) {
              message = `⚠️ Error in '${state.colorByProperty}' column:`;
              hasErrors = true;
            }
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
          for (let region of state.regions) {
            if (
              region[state.nameByProperty] === undefined ||
              region[state.nameByProperty] === null ||
              region[state.nameByProperty] === ''
            ) {
              message = '⚠️ Required name field is empty.';
              hasErrors = true;
              break;
            }
          }
          if (state.dotDensityByProperty.length === 0) {
            message = '⚠️ At least one property must be selected.';
            hasErrors = true;
            break;
          }
          break;

        default:
          message = '⚠️ Unrecognized map type.';
          hasErrors = true;
          break;
      }
      state.validationMessage = hasErrors ? message : '✓ No errors found.';
    },
    setMaxSymbolSize: (state, action) => {
      state.maxSymbolSize = action.payload;
    },
    setMinSymbolSize: (state, action) => {
      state.minSymbolSize = action.payload;
    },
    changeNameColor: (state, action) => {
      const { oldColorValue, newColorValue, mapGraphicsType } = action.payload;
      let propList = state.regions;
      if (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') {
        propList = state.points;
      }

      if (mapGraphicsType === 'Dot Density Map') {
        let idx = state.dotDensityByProperty.indexOf(oldColorValue);
        if (idx > -1) state.dotDensityByProperty[idx] = newColorValue;

        propList.forEach((prop) => {
          prop[newColorValue] = prop[oldColorValue];
          delete prop[oldColorValue];
        });
        // remove from columnTypes
        state.columnTypes[newColorValue] = state.columnTypes[oldColorValue];
        delete state.columnTypes[oldColorValue];

        // delete from added columns
        state.addedColumns = state.addedColumns.filter((column) => column !== oldColorValue);
        state.addedColumns.push(newColorValue);

        // update propertyNames
        idx = state.propertyNames.indexOf(oldColorValue);
        if (idx > -1) state.propertyNames[idx] = newColorValue;
      } else {
        let colorByProperty = state.colorByProperty;

        propList.forEach((prop) => {
          if (prop[colorByProperty] === oldColorValue) {
            prop[colorByProperty] = newColorValue;
          }
        });
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveMapGraphicsData.pending, (state) => {
        // Handle pending state...
        state.isSaving = true;
      })
      .addCase(saveMapGraphicsData.fulfilled, (state, action) => {
        // Handle success...
        state.mapGraphicsId = action.payload;
        state.isSaving = true;
      })
      .addCase(saveMapGraphicsData.rejected, (state) => {
        // Handle failure...
        state.isSaving = false;
      })
      .addCase(updateMapGraphicsDataById.pending, (state) => {
        // Handle pending state...
        state.isSaving = true;
      })
      .addCase(updateMapGraphicsDataById.fulfilled, (state, action) => {
        const newData = action.payload;
        return {
          ...newData,
          mapGraphicsId: newData._id,
          isSaving: true
        };
      })
      .addCase(updateMapGraphicsDataById.rejected, (state) => {
        // Handle failure...
        state.isSaving = false;
      })
      .addCase(getMapGraphicsDataById.pending, (state) => {
        // Handle pending state...
        state.isSaving = true;
      })
      .addCase(getMapGraphicsDataById.fulfilled, (state, action) => {
        const newData = action.payload;
        return {
          ...newData,
          mapGraphicsId: newData._id,
          isSaving: true
        };
      })
      .addCase(getMapGraphicsDataById.rejected, (state) => {
        // Handle failure...
        state.isSaving = false;
      });
  }
});

export const {
  populateMapGraphics,
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
  popPoint,
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
  dotDensityByProperty,
  addDataFromCSVorExcel,
  setMaxSymbolSize,
  setMinSymbolSize,
  setMinProperty,
  setMaxProperty,
  validateRow,
  changeNameColor,
  validateAllCells,
  changeMatchKey
} = mapGraphicsDataSlice.actions;
export default mapGraphicsDataSlice.reducer;
