import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../../styles/mapCreationWrapper.css';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { resetGeoJsonData, deleteGeojsonById } from '../../redux-slices/geoJSONSlice';
import { resetMapGraphicsData } from '../../redux-slices/mapGraphicsDataSlice';
import {resetMapStylesData} from "../../redux-slices/mapStylesSlice.js";
import {resetMapMetaDataFromDraft} from "../../redux-slices/mapMetadataSlice.js";
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function MapCreationWrapper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const mapOutline = useSelector((state) => state.geojson.geojson.geoJSON);
  const validationMessage = useSelector((state) => state.mapGraphics.validationMessage);
  const[isModalOpen, setIsModalOpen] = useState(false);

  const openConfirmationModal = () => {
    setIsModalOpen(true)
  }
  const closeConfirmationModal = () => {
    setIsModalOpen(false)
  };

  const NavigationButton = styled(Button)(({ theme }) => ({
    borderColor: '#40e0d0',
    color: '#40e0d0',
    '&:hover': {
      borderColor: '#40e0d0',
      backgroundColor: 'transparent'
    }
  }));

  const currentStage = () => {
    const path = location.pathname.split('/').pop();
    switch (path) {
      case 'OutlineSelection':
        return 1;
      case 'DataEditor':
        return 2;
      case 'GraphicsEditor':
        return 3;
      default:
        return 0; // Default to TemplateSelection
    }
  };

  const isNextButtonDisabled = () => {
    const stage = currentStage();
    return (stage === 1 && !mapOutline) || (stage === 2 && !validationMessage.startsWith('✓'));
  };

  const goBack = async () => {
    const stage = currentStage();
    if (stage === 2) {
      openConfirmationModal();
    }else{
      navigate(-1);
    }
  };

  const handleNavigationToOutlineSelection = async () => {
    closeConfirmationModal();
    dispatch(deleteGeojsonById());
    dispatch(resetMapGraphicsData());
    dispatch(resetMapStylesData());
    dispatch(resetMapMetaDataFromDraft());
    navigate(-1);
  }

  const goForward = () => {
    const stage = currentStage();
    switch (stage) {
      case 0:
        navigate('OutlineSelection');
        break;
      case 1:
        navigate('DataEditor');
        break;
      case 2:
        navigate('GraphicsEditor');
        break;
      default:
        break;
    }
  };

  return (
    <div className="mapCreationWrapper">
      <div className="wrapper-button-group">
        {currentStage() !== 0 && (
          <NavigationButton variant="outlined" startIcon={<ArrowBackIcon />} onClick={goBack}>
            Back
          </NavigationButton>
        )}
        {(currentStage() > 0  && currentStage() < 3) && (
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
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, height: 120, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="div" style = {{marginBottom: '15px', marginTop: '10px'}}>
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
          <Button variant="contained"
                  onClick={handleNavigationToOutlineSelection}
                  style = {{marginRight: '10px'}}>
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
