import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import GeoJsonMap from './Map/GeoJsonMap';
import MapTitleEditor from './MapGraphicsEditor/AnnotateMenu/MapTitleEditor';
import UndoRedoButtonGroup from './MapGraphicsEditor/UndoRedoButtonGroup';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Typography from '@mui/material/Typography';
import LegendWrapper from './MapGraphicsEditor/Legend/LegendWrapper';
import CircularProgress from '@mui/material/CircularProgress';
import SaveButton from './SaveButton';
import PublishButton from './PublishButton';
import Tooltip from '@mui/material/Tooltip';
import AlertComponent from '../AlertComponent.jsx';

export default function MapBox({ openExportDialog }) {
  const { geojson, isLoadingGeojson } = useSelector((state) => state.geojson);
  const mapId = useSelector((state) => state.mapMetadata.mapId);
  const colors = useSelector((state) => state.mapStyles.colors);
  const title = useSelector((state) => state.mapMetadata.title);
  const [isSaved, setIsSaved] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  }, [open]);

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
      {isSaved && open &&(
        <AlertComponent
          handleCloseAlert={handleClose}
          autoHideDuration={2000}
          alertSeverity="success"
          alertMessage="Map Saved!"
        />
      )}

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
              <SaveButton buttonStyle={buttonStyle} setIsSaved = {setIsSaved} setOpen = {setOpen}/>
              {mapId && <PublishButton buttonStyle={buttonStyle}/>}
              <Tooltip title="Export">
                <Button
                  variant="outlined"
                  aria-label="publish"
                  onClick={openExportDialog}
                  sx={buttonStyle}>
                  <SaveAltIcon/>
                </Button>
              </Tooltip>
            </Box>
          </Box>

          {geojson && (
            <>
              <UndoRedoButtonGroup />
              <div
                id="mapContainer"
                style={{ position: 'relative', height: '100%', width: '100%', display: 'flex' }}
              >
                <Typography
                  className="include-from-capture"
                  visibility="hidden"
                  sx={{
                    position: 'absolute',
                    top: '2%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    whiteSpace: 'nowrap',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    zIndex: 999
                  }}
                >
                  {title}
                </Typography>
                <GeoJsonMap styled={true} />
                <LegendWrapper properties={colors}></LegendWrapper>
              </div>
            </>
          )}
        </div>
      )}

    </Box>
  );
}
