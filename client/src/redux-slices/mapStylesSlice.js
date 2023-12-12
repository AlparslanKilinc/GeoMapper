import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import apis from '../store-request-api/mapRequestApi';

export const saveMapStylesData = createAsyncThunk(
  'mapStyles/saveMapStylesData',
  async (_, thunkApi) => {
    try {
      const { legend, mapStyles } = thunkApi.getState();
      const response = await apis.saveMapStylesData({ ...mapStyles, legend });
      return response.data._id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const updateMapStylesDataById = createAsyncThunk(
  'mapStyles/updateMapStylesDataById',
  async (_, thunkApi) => {
    try {
      const { legend, mapStyles } = thunkApi.getState();
      const mapStyleId = mapStyles.mapStyleId;
      const response = await apis.updateMapStylesDataById(mapStyleId, { ...mapStyles, legend });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getMapStylesDataById = createAsyncThunk(
  'mapStyles/getMapStylesDataById',
  async (mapStylesId, thunkApi) => {
    try {
      const response = await apis.getMapStylesDataById(mapStylesId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const hexColorPalette = {
  lightRed: '#ff6666',
  darkRed: '#8b0000',
  lightGreen: '#90ee90',
  darkGreen: '#006400',
  lightBlue: '#add8e6',
  darkBlue: '#00008b',
  lightYellow: '#ffffe0',
  darkYellow: '#ffd700',
  lightOrange: '#ffd580',
  darkOrange: '#ff8c00',
  lightPurple: '#e6e6fa',
  darkPurple: '#800080',
  lightPink: '#ffb6c1',
  darkPink: '#ff1493'
};

const initialState = {
  mapStylesId: null,
  isSaving: false,
  colors: [], // Colors configurations for the symbols
  colorPalette: [
    [hexColorPalette.lightBlue, hexColorPalette.darkBlue],
    [hexColorPalette.lightGreen, hexColorPalette.darkGreen],
    [hexColorPalette.lightPurple, hexColorPalette.darkPurple],
    [hexColorPalette.lightPink, hexColorPalette.darkPink],
    [hexColorPalette.lightRed, hexColorPalette.darkRed],
    [hexColorPalette.lightYellow, hexColorPalette.darkYellow],
    [hexColorPalette.lightOrange, hexColorPalette.darkOrange]
  ],
  colorPaletteIdx: 0,
  shape: 'circle', // Shape type for the map symbols
  size: 0, // Size of the map symbols
  height: 0, // Height for 3D elements
  borderColor: '#808080', // black hex code
  borderWidth: 2, // Width of borders of map elements
  fillColor: '#EDEDED',
  mapBackgroundColor: 'white',
  isTilelayerVisible: false,
  selectedPropUniqueValues: [], // Unique values for the selected property,
  selectedFeature: null,
  continousColorScale: [],
  opacity: 1,
  labels: [],
  defaultLabelColor: 'white' ,
  defaultLabelSize: 12,
  defaultLabelFont: 'Outfit',
};

const mapStylesDataSlice = createSlice({
  name: 'mapStyles',
  initialState,
  reducers: {
    resetMapStylesData: () => initialState,
    changeSelectedShape: (state, action) => {
      state.shape = action.payload;
    },
    changeBorderColor: (state, action) => {
      state.borderColor = action.payload;
    },
    changeBorderWidth: (state, action) => {
      state.borderWidth = action.payload;
    },
    changeBackgroundColor: (state, action) => {
      state.mapBackgroundColor = action.payload;
    },
    toggleTilelayerVisibility: (state, action) => {
      state.isTilelayerVisible = !state.isTilelayerVisible;
    },
    setColors: (state, action) => {
      // create a deep copy of colors array
      // sort array by name property
      let deepCopy = JSON.parse(JSON.stringify(action.payload));

      // Sort the deep copy by the 'name' property
      deepCopy.sort((a, b) => a.name.localeCompare(b.name));
      state.colors = deepCopy;
    },
    setColorPaletteIdx: (state, action) => {
      state.colorPaletteIdx = action.payload;
    },
    changeColorByName: (state, action) => {
      const { name, color } = action.payload;

      // Find the index of the color configuration to update
      const index = state.colors.findIndex((c) => c.name === name);

      // If found, directly update the color configuration
      if (index !== -1) {
        state.colors[index].color = color;
      }
    },
    changeName: (state, action) => {
      const { oldName, newName } = action.payload;
      console.log(oldName, newName);
      const idx = state.colors.findIndex((clrObj) => clrObj.name === oldName);
      state.colors[idx].name = newName;
    },
    setSelectedPropUniqueValues: (state, action) => {
      state.selectedPropUniqueValues = action.payload;
    },
    setContinousColorScale: (state, action) => {
      state.continousColorScale = action.payload;
    },
    setOpacity: (state, action) => {
      state.opacity = action.payload;
    },
    setLabelPositions: (state, action) => {
      state.labelPositions = action.payload;
    },
    setLabelPositionByIdx: (state, action) => {
      const { idx, position } = action.payload;
      state.labels[idx][position] = position;
    },
    addLabelPosition: (state, action) => {
      // modify this to be add label
      // new structure for labelPositions = [{position:[],color:string,}]
      state.labels.push({
        position: action.payload
      });
    },
    setLabelColor: (state, action) => {
      const { idx, color } = action.payload;
      state.labels[idx].color = color;
    },
    setLabelSize: (state, action) => {
      const { idx, size } = action.payload;
      state.labels[idx].size = size;
    },
    setLabelFont: (state, action) => {
      const { idx, font } = action.payload;
      state.labels[idx].font = font;
    },
    setDefaultLabelColor: (state, action) => {
      state.defaultLabelColor = action.payload;
    },
    setDefaultLabelSize: (state, action) => {
      state.defaultLabelSize = action.payload;
    },
    setDefaultLabelFont: (state, action) => {
      state.defaultLabelFont = action.payload;
    },
    setFillColor: (state, action) => {
      state.fillColor = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload;
    },
    setAlertSeverity: (state, action) => {
      state.alertSeverity = action.payload;
    },
    resetLabels: (state) => {
      state.labels = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveMapStylesData.pending, (state) => {
        // Handle pending state...
        state.isSaving = true;
      })
      .addCase(saveMapStylesData.fulfilled, (state, action) => {
        // Handle success...
        state.mapStylesId = action.payload;
        state.isSaving = true;
      })
      .addCase(saveMapStylesData.rejected, (state) => {
        // Handle failure...
        state.isSaving = false;
      })
      .addCase(updateMapStylesDataById.pending, (state) => {
        // Handle pending state...
        state.isSaving = true;
      })
      .addCase(updateMapStylesDataById.fulfilled, (state, action) => {
        // Handle success...
        state.isSaving = false;
      })
      .addCase(updateMapStylesDataById.rejected, (state) => {
        // Handle failure...
        state.isSaving = false;
      })
      .addCase(getMapStylesDataById.pending, (state) => {
        // Handle pending state...
        state.isLoading = true;
      })
      .addCase(getMapStylesDataById.fulfilled, (state, action) => {
        // Handle success...
        const { legend, ...mapStyles } = action.payload;
        return {
          ...mapStyles,
          isLoading: false
        };
      })
      .addCase(getMapStylesDataById.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const {
  changeSelectedShape,
  changeBorderColor,
  changeBorderWidth,
  changeBackgroundColor,
  toggleTilelayerVisibility,
  setColors,
  setColorPaletteIdx,
  changeColorByName,
  setSelectedPropUniqueValues,
  setContinousColorScale,
  setOpacity,
  setLabelPositions,
  setLabelPositionByIdx,
  addLabelPosition,
  setLabelColor,
  setLabelSize,
  setLabelFont,
  setDefaultLabelColor,
  setDefaultLabelSize,
  setDefaultLabelFont,
  setFillColor,
  resetMapStylesData,
  resetLabels,
  changeName,
    setAlert,
  setAlertMessage, setAlertSeverity
} = mapStylesDataSlice.actions;

export default mapStylesDataSlice.reducer;
