import * as React from 'react';
import { Drawer, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import GeoJsonMap from '../GeoJsonMap/';
import TabMenu from './TabMenu';
import StylesMenu from './StylesMenus';
import AnnotateContent from './AnnotateContent';
import RegionEditing from './RegionEditing';
import MapTitleEditor from './MapTitleEditor';
import UndoRedoButtonGroup from './UndoRedoButtonGroup';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import IconButton from '@mui/material/IconButton';
import { setSelectedRegionIdx } from '../../../redux-slices/mapGraphicsDataSlice';
import { setSelectedFeature } from '../../../redux-slices/mapStylesSlice';

const drawerWidth = 240;
const stylesToolboxConfig = [
  { label: 'Styles', content: <StylesMenu /> },
  { label: 'Annotate', content: <AnnotateContent /> }
];

const dataEditingToolboxConfig = [
  { label: 'Region', content: <RegionEditing /> },
  { label: 'Tabular', content: 'Tabular' }
];

export default function PermanentDrawerLeft() {
  const dispatch = useDispatch();
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const { colorByProperty, regions } = useSelector((state) => state.mapGraphics);
  const { colors, selectedFeature } = useSelector((state) => state.mapStyles);
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
  const { geojson, isLoadingGeojson } = useSelector((state) => state.geojson);
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
        <TabMenu tabsConfig={stylesToolboxConfig} />
      </Drawer>
      <UndoRedoButtonGroup />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          display: 'flex',
          flexDirection: 'column'
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
      </Box>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
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
        <TabMenu tabsConfig={dataEditingToolboxConfig} />
      </Drawer>
    </Box>
  );
}
