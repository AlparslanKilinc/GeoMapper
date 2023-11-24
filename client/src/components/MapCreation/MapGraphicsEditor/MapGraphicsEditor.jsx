import * as React from 'react';
import { Drawer, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import GeoJsonMap from '../GeoJsonMap/';
import TabMenu from './TabMenu';
import StylesMenuSelector from './StylesMenuSelector';
import AnnotateContent from './AnnotateContent';
import RegionEditing from './RegionEditing';
import TabularSelector from './TabularSelector';
import MapTitleEditor from './MapTitleEditor';
import UndoRedoButtonGroup from './UndoRedoButtonGroup';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';

const drawerWidth = 240;
const stylesToolboxConfig = [
  { label: 'Styles', content: <StylesMenuSelector/> },
  { label: 'Annotate', content: <AnnotateContent /> }
];

const dataEditingToolboxConfig = [
  { label: 'Region', content: <RegionEditing /> },
  { label: 'Tabular', content: <TabularSelector /> }
];

function MapBox({ theme }) {
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
      <UndoRedoButtonGroup theme = {theme} />

      {isLoadingGeojson ? (
        <CircularProgress />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <MapTitleEditor theme = {theme}/>
            {/* make the buttons a square */}

            <Box display="flex" gap={2} sx={{ marginLeft: 'auto' }}>
              <Button variant="outlined" aria-label="save" sx={{ height: '50px', width: '50px' }}>
                <SaveOutlinedIcon sx={{ color: theme.palette.iconColor }}/>
              </Button>

              <Button
                variant="outlined"
                aria-label="publish"
                sx={{ height: '50px', width: '50px' }}
              >
                <PublishOutlinedIcon sx={{ color: theme.palette.iconColor }}/>
              </Button>
            </Box>
          </Box>

          {geojson && <GeoJsonMap geoJsonData={geojson.geoJSON} styled={true} />}
        </div>
      )}
    </Box>
  );
}

export default function PermanentDrawerLeft({theme}) {
    console.log(theme)
  const [isTabularOpened, setIsTabularOpened] = React.useState(false);
  const handleTabularOpen = (newState) => {
    setIsTabularOpened(newState);
  };

  return (
    <Box className = "map-graphics-editor" sx={{ display: 'flex', height: '100%', width: '100%' }}>

      <Drawer className = "left-drawer"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'relative',
              bgcolor: theme.palette.background.default,

          },
          height: '100%'
        }}
        variant="permanent"
        anchor="left"
      >
        <TabMenu tabsConfig={stylesToolboxConfig} handleTabularOpen={handleTabularOpen} theme = {theme}/>
      </Drawer>

      {!isTabularOpened && (<MapBox theme={theme} />)}

      <Drawer
        sx={{
          // TODO: Fix the layout, now it's just using a hacky way
          maxWidth: "80vw",
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            maxWidth: "80vw",
            boxSizing: 'border-box',
            position: 'relative',
            // remove the top borders
            borderTop: 'none',
              bgcolor: theme.palette.background.default,
          },
          height: '100%'
        }}
        variant="permanent"
        anchor="right"
      >
        <TabMenu  tabsConfig={dataEditingToolboxConfig}  handleTabularOpen={handleTabularOpen} theme={theme}/>
      </Drawer>
    </Box>
  );
}
