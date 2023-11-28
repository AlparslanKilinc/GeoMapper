import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import GeoJsonMap from './Map/GeoJsonMap';
import MapTitleEditor from './MapGraphicsEditor/AnnotateMenu/MapTitleEditor';
import UndoRedoButtonGroup from './MapGraphicsEditor/UndoRedoButtonGroup';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

export default function MapBox({ handleOpenExportDialog }) {
  const { geojson, isLoadingGeojson } = useSelector((state) => state.geojson);

  const buttonStyle = {
    minWidth: 0,
    padding: 0,
    height: '3.5em',
    width: '3.5em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage:
      'linear-gradient(135deg, rgba(224, 234, 252, 0.3) 25%, transparent 25%, transparent 50%, rgba(224, 234, 252, 0.3) 50%, rgba(224, 234, 252, 0.3) 75%, transparent 75%, transparent 100%)',
    backgroundSize: '14px 14px',
    border: 'none',
    boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundImage:
        'linear-gradient(135deg, rgba(207, 222, 243, 0.3) 25%, transparent 25%, transparent 50%, rgba(207, 222, 243, 0.3) 50%, rgba(207, 222, 243, 0.3) 75%, transparent 75%, transparent 100%)',
      backgroundSize: '14px 14px',
      border: 'none',
      boxShadow: '1px 1px 6px rgba(0, 0, 0, 0.2)'
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
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
              <Button variant="outlined" aria-label="save" sx={buttonStyle}>
                <SaveOutlinedIcon />
              </Button>

              <Button variant="outlined" aria-label="publish" sx={buttonStyle}>
                <PublishOutlinedIcon />
              </Button>

              <Button
                variant="outlined"
                aria-label="publish"
                onClick={handleOpenExportDialog}
                sx={buttonStyle}
              >
                <SaveAltIcon />
              </Button>
            </Box>
          </Box>

          {geojson && (
            <>
              <UndoRedoButtonGroup />
              <div id="mapContainer" style={{ height: '100%', width: '100%', display: 'flex' }}>
                <GeoJsonMap styled={true} />
              </div>
            </>
          )}
        </div>
      )}
    </Box>
  );
}
