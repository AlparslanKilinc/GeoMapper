import React, { useEffect } from 'react';
import { Drawer, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import GeoJsonMap from './Map/GeoJsonMap';
import TabMenu from './MapGraphicsEditor/TabMenu';
import DataEditorTable from './MapDataEditing/DataEditorTable';
import StylesMenu from './MapGraphicsEditor/StylesMenu/StylesMenus';
import AnnotateContent from './MapGraphicsEditor/AnnotateMenu/AnnotateContent';
import RegionEditing from './MapGraphicsEditor/GraphicsTools/RegionEditing';
import MapTitleEditor from './MapGraphicsEditor/AnnotateMenu/MapTitleEditor';
import UndoRedoButtonGroup from './MapGraphicsEditor/UndoRedoButtonGroup';
import ExportDialog from './MapGraphicsEditor/ExportDialog';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {
  setColors,
  setSelectedPropUniqueValues,
  setContinousColorScale
} from '../../redux-slices/mapStylesSlice';
import * as d3 from 'd3';
import { setPropertyNames } from '../../redux-slices/mapGraphicsDataSlice';
import MapBox from './MapBox';

const drawerWidth = 240;
const stylesToolboxConfig = [
  { label: 'Styles', content: <StylesMenu /> },
  { label: 'Annotate', content: <AnnotateContent /> }
];

const dataEditingToolboxConfig = [
  { label: 'Region', content: <RegionEditing /> },
  { label: 'Tabular', content: <DataEditorTable /> }
];

export default function MapGraphicsEditor() {
  const dispatch = useDispatch();
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const [isTabularOpened, setIsTabularOpened] = React.useState(false);
  const [exportDialogOpen, setExportDialogOpen] = React.useState(false);
  const colorByProperty = useSelector((state) => state.mapGraphics.colorByProperty);
  const regions = useSelector((state) => state.mapGraphics.regions);
  const points = useSelector((state) => state.mapGraphics.points);
  const colors = useSelector((state) => state.mapStyles.colors);
  const colorPalette = useSelector((state) => state.mapStyles.colorPalette);
  const colorPaletteIdx = useSelector((state) => state.mapStyles.colorPaletteIdx);
  const labelByProperty = useSelector((state) => state.mapGraphics.labelByProperty);
  const isLabelVisible = useSelector((state) => state.mapGraphics.isLabelVisible);
  // const sizeByProperty = useSelector((state) => state.mapGraphics.sizeByProperty);
  // const fixedSymbolSize = useSelector((state) => state.mapStyles.fixedSymbolSize);
  // const fixedColor = useSelector((state) => state.mapGraphics.fixedColor);

  let propList = regions;

  if (mapGraphicsType === 'Symbol Map') {
    propList = Object.values(points);
  }

  //  lets extract unique values from the property associated with the colorByProperty
  const extractUniqueColorValues = (propListObj, colorByProperty) => {
    const uniqueValues = new Set();
    propListObj.forEach((propObj) => {
      uniqueValues.add(propObj[colorByProperty]);
    });
    return uniqueValues;
  };
  const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

  const initColorsCategorical = () => {
    const uniqueValues = extractUniqueColorValues(propList, colorByProperty);
    const c = Array.from(uniqueValues).map((name) => {
      let color = generateRandomColor();
      let colorObj = colors.find((color) => color.name === name);
      if (colorObj) color = colorObj.color;
      return { name, color: color };
    });

    dispatch(setColors(c));
    dispatch(setSelectedPropUniqueValues(Array.from(uniqueValues)));
  };

  const initColorsNumerical = () => {
    const data = propList.map((propObj) => propObj[colorByProperty]);
    const minData = d3.min(data);
    const maxData = d3.max(data);

    // Create a continuous color scale
    const colorScale = d3
      .scaleLinear()
      .domain([minData, maxData])
      .range(colorPalette[colorPaletteIdx]); // You can choose any two colors

    // Normalize and map data to color
    const c = data.map((d) => colorScale(d));
    dispatch(setContinousColorScale(c));
  };

  const initColors = () => {
    //check if the property associated with the colorByProperty is numeric or not

    if (mapGraphicsType === 'Choropleth Map' || mapGraphicsType === 'Symbol Map') {
      const isNumeric = !isNaN(propList[0][colorByProperty]);
      console.log('isNumeric', isNumeric);
      if (isNumeric) initColorsNumerical();
      else initColorsCategorical();
    }
  };

  const initPropertyNames = () => {
    const propertyNames = Object.keys(propList[0]);
    dispatch(setPropertyNames(propertyNames));
  };

  useEffect(() => {
    initColors();
    initPropertyNames();
  }, [colorByProperty]);

  const handleTabularOpen = (newState) => {
    setIsTabularOpened(newState);
  };

  const handleOpenExportDialog = () => {
    setExportDialogOpen(true);
  };

  const handleCloseExportDialog = () => {
    setExportDialogOpen(false);
  };

  // TODO: Move the MapBox out as a separate component, now the switch of the dialog will trigger the re-rendering of the MapBox.

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'relative'
          },
          height: '100%'
        }}
        variant="permanent"
        anchor="left"
      >
        <TabMenu tabsConfig={stylesToolboxConfig} handleTabularOpen={handleTabularOpen} />
      </Drawer>

      {!isTabularOpened && <MapBox handleOpenExportDialog={handleOpenExportDialog} />}
      <ExportDialog open={exportDialogOpen} onClose={handleCloseExportDialog} />

      <Drawer
        sx={{
          width: isTabularOpened ? null : drawerWidth,
          maxWidth: '80vw',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isTabularOpened ? null : drawerWidth,
            maxWidth: '80vw',
            boxSizing: 'border-box',
            position: 'relative',
            // remove the top borders
            borderTop: 'none'
          },
          height: '100%'
        }}
        variant="permanent"
        anchor="right"
      >
        <TabMenu tabsConfig={dataEditingToolboxConfig} handleTabularOpen={handleTabularOpen} />
      </Drawer>
    </Box>
  );
}
