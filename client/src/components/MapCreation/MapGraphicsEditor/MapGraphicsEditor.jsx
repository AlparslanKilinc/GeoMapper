import * as React from 'react';
import { Drawer, Typography, TextField } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import GeoJsonMap from '../GeoJsonMap/';
import TabMenu from './TabMenu';
import SimpleAccordion from './SimpleAccordion';
import AnnotateContent from './AnnotateContent';
import RegionEditing from './RegionEditing';
import MapTitleEditor from './MapTitleEditor';

const drawerWidth = 240;
const stylesToolboxConfig = [
  { label: 'Styles', content: <SimpleAccordion /> },
  { label: 'Annotate', content: <AnnotateContent /> }
];

const dataEditingToolboxConfig = [
  { label: 'Region', content: <RegionEditing /> },
  { label: 'Tabular', content: 'Tabular' }
];

export default function PermanentDrawerLeft() {
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          alignContent: 'flex-start',
          justifyContent: 'flex-start',
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
            <MapTitleEditor />
            {geojson && <GeoJsonMap geoJsonData={geojson.geoJSON} styled={true} />}
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
