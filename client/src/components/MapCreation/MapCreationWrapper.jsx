import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../../styles/mapCreationWrapper.css';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { deleteGeojsonById } from '../../redux-slices/geoJSONSlice';
import { resetMapGraphicsData } from '../../redux-slices/mapGraphicsDataSlice';
import { resetMapStylesData } from '../../redux-slices/mapStylesSlice.js';
import { resetMapMetaDataFromDraft } from '../../redux-slices/mapMetadataSlice.js';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function MapCreationWrapper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const mapOutline = useSelector((state) => state.geojson.geojson.geoJSON);
  const validationMessage = useSelector((state) => state.mapGraphics.validationMessage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stages = ['/', 'OutlineSelection', 'DataEditor', 'GraphicsEditor'];

  const openConfirmationModal = () => {
    setIsModalOpen(true);
  };
  const closeConfirmationModal = () => {
    setIsModalOpen(false);
  };

  const NavigationButton = styled(Button)(({ theme }) => ({
    borderColor: '#40e0d0',
    color: '#40e0d0',
    '&:hover': {
      borderColor: '#40e0d0',
      backgroundColor: 'transparent'
    }
  }));

  const currentStageIndex = () => {
    const currentPath = location.pathname.split('/').pop();
    return stages.indexOf(currentPath);
  };

  const goBack = () => {
    const prevStageIndex = currentStageIndex() - 1;
    if (prevStageIndex >= 0) {
      if (prevStageIndex === 1) { // Specific check for DataEditor stage
        openConfirmationModal();
      } else {
        const route = prevStageIndex === 0 ? '/mapCreation' : `/mapCreation/${stages[prevStageIndex]}`;
        navigate(route);
      }
    }
  };

  const goForward = () => {
    const nextStageIndex = currentStageIndex() + 1;
    if (nextStageIndex < stages.length) {
      const route = nextStageIndex === 0 ? '/mapCreation' : `/mapCreation/${stages[nextStageIndex]}`;
      navigate(route);
    }
  };

  const handleNavigationToOutlineSelection = () => {
    closeConfirmationModal();
    dispatch(deleteGeojsonById());
    dispatch(resetMapGraphicsData());
    dispatch(resetMapStylesData());
    dispatch(resetMapMetaDataFromDraft());

    // Navigate to the OutlineSelection stage
    navigate('/mapCreation/OutlineSelection');
  };

  const isNextButtonDisabled = () => {
    const stageIndex = currentStageIndex();
    switch (stageIndex) {
      case 0: // TemplateSelection
        return false;
      case 1: // OutlineSelection
        return !mapOutline; // Disabled if mapOutline is not set
      case 2: // DataEditor
        return !validationMessage.startsWith('✓'); // Disabled if validation message doesn't start with a tick
      case 3: // GraphicsEditor
        return false;
      default:
        return true; // Default case, should not happen
    }
  };

  return (
    <div className="mapCreationWrapper">
      <div className="wrapper-button-group">
        {currentStageIndex() > 0 && (
          <NavigationButton variant="outlined" startIcon={<ArrowBackIcon />} onClick={goBack}>
            Back
          </NavigationButton>
        )}
        {currentStageIndex() >= 0 && currentStageIndex() < stages.length - 1 && (
          <NavigationButton
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            onClick={goForward}
            disabled={isNextButtonDisabled()}
          >
            Next
          </NavigationButton>
        )}
      </div>
      <Outlet />
      <Modal open={isModalOpen} onClose={closeConfirmationModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            height: 120,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography
            variant="h6"
            component="div"
            style={{ marginBottom: '15px', marginTop: '10px' }}
          >
            Are you sure you want to go back? Your progress wont be saved.
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={closeConfirmationModal}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <Button
            variant="contained"
            onClick={handleNavigationToOutlineSelection}
            style={{ marginRight: '10px' }}
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={closeConfirmationModal}>
            No
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
