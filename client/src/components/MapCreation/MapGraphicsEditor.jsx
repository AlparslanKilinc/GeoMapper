import React, { useEffect, useRef } from 'react';
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
import Legend from './Legend'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {
  setColors,
  setSelectedPropUniqueValues,
  setContinousColorScale
} from '../../redux-slices/mapStylesSlice';
import * as d3 from 'd3';

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
  const colorByProperty = useSelector((state) => state.mapGraphics.colorByProperty);
  const regions = useSelector((state) => state.mapGraphics.regions);
  const { colors, colorPalette, colorPaletteIdx } = useSelector((state) => state.mapStyles);
  const labelByProperty = useSelector((state) => state.mapGraphics.labelByProperty);
  const isLabelVisible = useSelector((state) => state.mapGraphics.isLabelVisible);
  const exportDialogRef = useRef();
  const openExportDialog = () => {
    exportDialogRef.current.handleOpenExportDialog();
  };
  //  lets extract unique values from the property associated with the colorByProperty
  const extractUniqueColorValues = (regions, colorByProperty) => {
    const uniqueValues = new Set();
    regions.forEach((region) => {
      uniqueValues.add(region[colorByProperty]);
    });
    return uniqueValues;
  };
  const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

  const initColorsCategorical = () => {
    const uniqueValues = extractUniqueColorValues(regions, colorByProperty);
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
    const data = regions.map((region) => region[colorByProperty]);
    const minData = d3.min(data);
    const maxData = d3.max(data);

    // Create a continuous color scale
    const colorScale = d3.scaleLinear().domain([minData, maxData]).range(colorPalette[colorPaletteIdx]); // You can choose any two colors

    // Normalize and map data to color
    const c = data.map((d) => colorScale(d));
    dispatch(setContinousColorScale(c));
  };

  const initColors = () => {
    //check if the property associated with the colorByProperty is numeric or not

    if (mapGraphicsType === 'Choropleth Map') {
      const isNumeric = !isNaN(regions[0][colorByProperty]);
      console.log('isNumeric', isNumeric);
      if (isNumeric) initColorsNumerical();
      else initColorsCategorical();
    }
  };

  useEffect(() => {
    initColors();
  }, [colorByProperty, regions]);

  const handleTabularOpen = (newState) => {
    setIsTabularOpened(newState);
  };

  // TODO: Move the MapBox out as a separate component, now the switch of the dialog will trigger the re-rendering of the MapBox.
  function MapBox() {
    const { geojson, isLoadingGeojson } = useSelector((state) => state.geojson);
    const buttonStyle = {
      minWidth: 0,
      padding: 0,
      height: '3.5em',
      width: '3.5em',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'linear-gradient(135deg, rgba(224, 234, 252, 0.3) 25%, transparent 25%, transparent 50%, rgba(224, 234, 252, 0.3) 50%, rgba(224, 234, 252, 0.3) 75%, transparent 75%, transparent 100%)',
      backgroundSize: '14px 14px',
      border: 'none',
      boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        backgroundImage: 'linear-gradient(135deg, rgba(207, 222, 243, 0.3) 25%, transparent 25%, transparent 50%, rgba(207, 222, 243, 0.3) 50%, rgba(207, 222, 243, 0.3) 75%, transparent 75%, transparent 100%)',
        backgroundSize: '14px 14px',
        border: 'none',
        boxShadow: '1px 1px 6px rgba(0, 0, 0, 0.2)',
      }
    };

    return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {isLoadingGeojson ? (
          <CircularProgress />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '100%'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <MapTitleEditor />
              <Box display="flex" gap={2} sx={{ marginLeft: 'auto', pr: 2 }}>
                <Button
                  variant="outlined"
                  aria-label="save"
                  sx={buttonStyle}>
                  <SaveOutlinedIcon />
                </Button>

                <Button
                  variant="outlined"
                  aria-label="publish"
                  sx={buttonStyle}>
                  <PublishOutlinedIcon />
                </Button>

                <Button
                  variant="outlined"
                  aria-label="publish"
                  onClick={openExportDialog}
                  sx={buttonStyle}>
                  <SaveAltIcon />
                </Button>
              </Box>
            </Box>

            {geojson && (
              <>
                <UndoRedoButtonGroup />
                <div id="mapContainer" style={{ position: 'relative', height: '100%', width: '100%', display: 'flex' }}>
                  <Legend properties={colors} mapType={mapGraphicsType} />
                  <GeoJsonMap styled={true} />
                </div>
              </>
            )}
          </div>
        )}
      </Box>
    );
  }

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
      {!isTabularOpened && <MapBox />}
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
