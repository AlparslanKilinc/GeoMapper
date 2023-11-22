import React from 'react';
import { Drawer, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import GeoJsonMap from '../GeoJsonMap/';
import TabMenu from './TabMenu';
import TabularSelector from './TabularSelector';
import StylesMenu from './StylesMenus';
import AnnotateContent from './AnnotateContent';
import RegionEditing from './RegionEditing';
import MapTitleEditor from './MapTitleEditor';
import UndoRedoButtonGroup from './UndoRedoButtonGroup';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import {
  setColors,
  setSelectedPropUniqueValues,
  setContinousColorScale
} from '../../../redux-slices/mapStylesSlice';
import { useEffect } from 'react';
import * as d3 from 'd3';

const drawerWidth = 240;
const stylesToolboxConfig = [
  { label: 'Styles', content: <StylesMenu /> },
  { label: 'Annotate', content: <AnnotateContent /> }
];

const dataEditingToolboxConfig = [
  { label: 'Region', content: <RegionEditing /> },
  { label: 'Tabular', content: <TabularSelector /> }
];

export default function MapGraphicsEditor() {
  const dispatch = useDispatch();
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const [isTabularOpened, setIsTabularOpened] = React.useState(false);
  const { colorByProperty, regions, nameByProperty } = useSelector((state) => state.mapGraphics);
  const { colors } = useSelector((state) => state.mapStyles);

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
    const colorScale = d3.scaleLinear().domain([minData, maxData]).range(['lightblue', 'darkblue']); // You can choose any two colors

    // Normalize and map data to color
    const c = data.map((d) => colorScale(d));
    console.log(c);
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

  function MapBox() {
    const { geojson, isLoadingGeojson } = useSelector((state) => state.geojson);
    return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          pr: 4,
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <UndoRedoButtonGroup />

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
              {/* make the buttons a square */}

              <Box display="flex" gap={2} sx={{ marginLeft: 'auto' }}>
                <Button variant="outlined" aria-label="save" sx={{ height: '50px', width: '50px' }}>
                  <SaveOutlinedIcon />
                </Button>

                <Button
                  variant="outlined"
                  aria-label="publish"
                  sx={{ height: '50px', width: '50px' }}
                >
                  <PublishOutlinedIcon />
                </Button>
              </Box>
            </Box>

            {geojson && <GeoJsonMap styled={true} key={JSON.stringify(colors)} />}
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

      <Drawer
        sx={{
          // TODO: Trying to find a better solution to the tabular width issue
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
