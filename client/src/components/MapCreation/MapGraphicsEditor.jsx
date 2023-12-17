import React, { useEffect, useRef } from 'react';
import { Drawer } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import TabMenu from './MapGraphicsEditor/TabMenu';
import DataEditorTable from './MapDataEditing/DataEditorTable';
import StylesMenu from './MapGraphicsEditor/StylesMenu/StylesMenus';
import AnnotateContent from './MapGraphicsEditor/AnnotateMenu/AnnotateContent';
import RegionEditing from './MapGraphicsEditor/GraphicsTools/RegionEditing';
import ExportDialog from './MapGraphicsEditor/ExportDialog';
import {
  setColors,
  setSelectedPropUniqueValues,
  setContinousColorScale
} from '../../redux-slices/mapStylesSlice';
import * as d3 from 'd3';
import { setPropertyNames } from '../../redux-slices/mapGraphicsDataSlice';
import MapBox from './MapBox';
import SymbolEditing from './MapGraphicsEditor/GraphicsTools/SymbolEditing';
import { setPointProperties } from '../../redux-slices/mapGraphicsDataSlice';
import { resetStackData } from '../../redux-slices/undoRedoSlice';

export default function MapGraphicsEditor() {
  const dispatch = useDispatch();
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const [isTabularOpened, setIsTabularOpened] = React.useState(false);
  const colorByProperty = useSelector((state) => state.mapGraphics.colorByProperty);
  const regions = useSelector((state) => state.mapGraphics.regions);
  const points = useSelector((state) => state.mapGraphics.points);
  const colors = useSelector((state) => state.mapStyles.colors);
  const colorPalette = useSelector((state) => state.mapStyles.colorPalette);
  const colorSteps = useSelector((state) => state.mapStyles.colorSteps);
  const colorPaletteIdx = useSelector((state) => state.mapStyles.colorPaletteIdx);
  const dotDensityByProperty = useSelector((state) => state.mapGraphics.dotDensityByProperty);
  const heatmapColorType = useSelector((state) => state.mapStyles.heatmapColorType);

  useEffect(() => {
    dispatch(resetStackData());
  }, [dispatch]);

  const drawerWidth = 240;
  const stylesToolboxConfig = [
    { label: 'Styles', content: <StylesMenu /> },
    { label: 'Annotate', content: <AnnotateContent /> }
  ];

  let editing = { label: 'Region', content: <RegionEditing /> };
  let propList = regions;

  if (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') {
    editing = { label: 'Symbol', content: <SymbolEditing /> };
    propList = points;
  }
  const dataEditingToolboxConfig = [editing];

  const exportDialogRef = useRef();
  const openExportDialog = () => {
    exportDialogRef.current.handleOpenExportDialog();
  };

  //  lets extract unique values from the property associated with the colorByProperty
  const extractUniqueColorValues = (propListObj, colorByProperty) => {
    const uniqueValues = new Set();
    propListObj.forEach((propObj) => {
      uniqueValues.add(propObj[colorByProperty]);
    });
    return uniqueValues;
  };
  const generateRandomColor = () => {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + color.padStart(6, '0');
  };

  const initColorsCategorical = () => {
    let uniqueValues = Array.from(extractUniqueColorValues(propList, colorByProperty));
    // get rid of undefined values
    uniqueValues = uniqueValues.filter((value) => value !== undefined);

    uniqueValues = uniqueValues.map((value) => String(value).trim());

    const c = uniqueValues.map((name) => {
      let color = generateRandomColor();
      let colorObj = colors.find((color) => color.name === name);
      if (colorObj) color = colorObj.color;
      return { name, color: color };
    });

    dispatch(setColors(c));
    dispatch(setSelectedPropUniqueValues(uniqueValues));
  };

  function mapColorStepsToData() {
    function getColorFromValue(value) {
      const colorStep = colorSteps.find(rangeItem =>
        value >= rangeItem.range.from && value <= rangeItem.range.to
      );

      return colorStep ? colorStep.color : '#FFFFFF';
    }

    const data = regions.map((region) => region[colorByProperty]);
    const mappedColors = data.map(getColorFromValue);

    dispatch(setContinousColorScale(mappedColors));
  }

  const initColorsNumerical = () => {
    if (heatmapColorType === "continuous") {
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
    } else if (heatmapColorType === "steps") {
      mapColorStepsToData();
    }
  };

  const initColorsDotDensity = () => {
    const colorsForDotDensity = dotDensityByProperty.map((name) => {
      let color = generateRandomColor();
      let colorObj = colors.find((color) => color.name === name);
      if (colorObj) color = colorObj.color;
      return { name, color: color };
    });
    dispatch(setColors(colorsForDotDensity));
  };

  const initColors = () => {
    //check if the property associated with the colorByProperty is numeric or not

    if (
      mapGraphicsType === 'Choropleth Map' ||
      mapGraphicsType === 'Symbol Map' ||
      mapGraphicsType === 'Spike Map'
    ) {
      if (propList.length === 0) return;
      initColorsCategorical();
    }

    if (mapGraphicsType === 'Dot Density Map') {
      initColorsDotDensity();
    }

    if (mapGraphicsType === 'Heat Map') {
      initColorsNumerical();
    }
  };

  const initPropertyNames = () => {
    if (propList.length === 0) return;
    const propertyNames = Object.keys(propList[0]);

    if (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') {
      dispatch(setPointProperties(propertyNames));
      dispatch(setPropertyNames(Object.keys(regions[0])));
    } else dispatch(setPropertyNames(propertyNames));
  };

  useEffect(() => {
    initColors();
    initPropertyNames();
  }, [colorByProperty, regions, dotDensityByProperty, points]);

  const handleTabularOpen = (newState) => {
    setIsTabularOpened(newState);
  };

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

      {!isTabularOpened && <MapBox openExportDialog={openExportDialog} />}
      <ExportDialog ref={exportDialogRef} />

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
