import * as React from 'react';
import { Drawer, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import GeoJsonMap from '../GeoJsonMap/';
import TabMenu from './TabMenu';
import StylesMenu from './StylesMenus';
import AnnotateContent from './AnnotateContent';
import RegionEditing from './RegionEditing';
import TabularSelector from './TabularSelector';
import MapTitleEditor from './MapTitleEditor';
import UndoRedoButtonGroup from './UndoRedoButtonGroup';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import { useDispatch } from 'react-redux';
import { toggleTabular } from '../../../redux-slices/mapGraphicsDataSlice';
import IconButton from '@mui/material/IconButton';

const drawerWidth = 240;
const stylesToolboxConfig = [
  { label: 'Styles', content: <StylesMenu /> },
  { label: 'Annotate', content: <AnnotateContent /> }
];

const dataEditingToolboxConfig = [
  { label: 'Region', content: <RegionEditing /> },
  { label: 'Tabular', content: <TabularSelector /> }
];

function MapBox(props) {
  const { geojson, isLoadingGeojson } = useSelector((state) => state.geojson);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        p: 3,
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

          {geojson && <GeoJsonMap geoJsonData={geojson.geoJSON} styled={true} />}
        </div>
      )}
    </Box>
  );
}

export default function PermanentDrawerLeft() {
  let isTabularOpened = useSelector(state => state.mapGraphics.isTabularOpened);

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

      {!isTabularOpened && (<MapBox />)}

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
