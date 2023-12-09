import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../../styles/mapCreationWrapper.css';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { clearGeojson } from '../../redux-slices/geoJSONSlice';
import { resetMapGraphicsData } from '../../redux-slices/mapGraphicsDataSlice';

export default function MapCreationWrapper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const mapOutline = useSelector((state) => state.geojson.geojson.geoJSON);
  const validationMessage = useSelector((state) => state.mapGraphics.validationMessage);

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

  const goBack = () => {
    const stage = currentStage();
    if (stage === 1) {
      dispatch(clearGeojson());
    } else if (stage === 2) {
      dispatch(resetMapGraphicsData());
      dispatch(clearGeojson());
    }
    navigate(-1);
  };

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
    </div>
  );
}
