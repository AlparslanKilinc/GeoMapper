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
import { setSelectedRegionIdx } from '../../../redux-slices/mapGraphicsDataSlice';
import {
  setSelectedFeature,
  setColors,
  setSelectedPropUniqueValues
} from '../../../redux-slices/mapStylesSlice';
import  Legend  from '../Legend.jsx'
import { useEffect } from 'react';
import CircularProgress from "@mui/material/CircularProgress";

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
  const { colorByProperty, regions } = useSelector((state) => state.mapGraphics);
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

  const initColors = () => {
    const uniqueValues = extractUniqueColorValues(regions, colorByProperty);
    const c = Array.from(uniqueValues).map((name) => {
      return { name, color: generateRandomColor() };
    });
    dispatch(setColors(c));
    dispatch(setSelectedPropUniqueValues(Array.from(uniqueValues)));
    console.log(colors)
  };

  useEffect(() => {
    initColors();
  }, []);

  const handleTabularOpen = (newState) => {
    setIsTabularOpened(newState);
  };

  const onEachFeature = (feature, layer) => {
    // check if map graphics type is choropleth
    if (mapGraphicsType === 'Choropleth Map') {
      let regionData = regions[feature.properties.regionIdx];

      // find the color for the region by the colorByProperty inside colors array
      let color = colors.find((color) => color.name === regionData[colorByProperty]);
      layer.setStyle({ fillColor: color.color });
    }
    const onClick = (e) => {
      dispatch(setSelectedRegionIdx(feature.properties.regionIdx));
      dispatch(setSelectedFeature(e.target));
      // change the color of the selected feature
    };
    layer.on({
      click: onClick
    });
  };

  function MapBox() {
    const { geojson, isLoadingGeojson } = useSelector((state) => state.geojson);
    return (<Box
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
              {/*<Legend properties = {colors} mapType = {mapGraphicsType}/>*/} 
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
          {geojson && (
            <GeoJsonMap
              geoJsonData={geojson.geoJSON}
              styled={true}
              onEachFeature={onEachFeature}
              key={JSON.stringify(colors)}
            />
          )}
        </div>
      )}
    </Box>);

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

      {!isTabularOpened && (<MapBox />)}

      <Drawer
        sx={{
          // TODO: Trying to find a better solution to the tabular width issue
          width: isTabularOpened ? null : drawerWidth,
          maxWidth: "80vw",
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isTabularOpened ? null : drawerWidth,
            maxWidth: "80vw",
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
