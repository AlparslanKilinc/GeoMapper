import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../../styles/mapCreationWrapper.css';
import { styled } from '@mui/material/styles';
import TempleSelection from './TemplateSelection';
import MapDataEditor from './MapDataEditing/MapDataEditor';
import OutlineSelectionPage from './OutlineSelectionPage';
import MapGraphicsEditor from './MapGraphicsEditor';
import { useSelector, useDispatch } from 'react-redux';
import { clearGeojson } from '../../redux-slices/geoJSONSlice';

export default function MapCreationWrapper() {
  const dispatch = useDispatch();
  const [currentStage, setCurrentStage] = useState(0);
  const location = useLocation();
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const mapOutline = useSelector((state) => state.geojson.geojson.geoJSON);
  const {validationMessage}  = useSelector((state) => state.mapGraphics);

  const NavigationButton = styled(Button)(({ theme }) => ({
    borderColor: '#40e0d0',
    color: '#40e0d0',
    '&:hover': {
      borderColor: '#40e0d0',
      backgroundColor: 'transparent'
    }
  }));

  const isNextButtonDisabled = () => {
    if (currentStage === 1 && !mapOutline || 
      currentStage === 2 && !validationMessage.startsWith('✓')) return true;
    return !mapGraphicsType;
  };

  useEffect(() => {
    if (location.state && location.state.stage) {
      setCurrentStage(location.state.stage);
    }
  }, [location]);

  const goBack = () => {
    if (currentStage === 1) {
      dispatch(clearGeojson());
    }
    setCurrentStage(currentStage - 1);
  };

  const goForward = () => {
    setCurrentStage(currentStage + 1);
  };

  const stages = [
    <TempleSelection onSelectionComplete={goForward} />,
    <OutlineSelectionPage />,
    <MapDataEditor />,
    <MapGraphicsEditor />
  ];

  return (
    <div className="mapCreationWrapper">
      <div className="wrapper-button-group">
        {currentStage !== 0 && (
          <NavigationButton variant="outlined" startIcon={<ArrowBackIcon />} onClick={goBack}>
            Back
          </NavigationButton>
        )}

        {currentStage < stages.length - 1 && currentStage !== 0 && (
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
      {stages[currentStage]}
    </div>
  );
}
