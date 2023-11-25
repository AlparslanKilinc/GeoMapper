import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../styles/mapCreationWrapper.css';
import { styled } from '@mui/material/styles';
import TempleSelection from './MapCreation/TemplateSelection';
import MapDataEditorSelector from './MapDataEditing/MapDataEditorSelector';
import OutlineSelectionPage from './MapCreation/OutlineSelectionPage';
import MapGraphicsEditing from './MapCreation/MapGraphicsEditing';
import { useSelector, useDispatch } from 'react-redux';
import { clearGeojson } from '../redux-slices/geoJSONSlice';

export default function MapCreationWrapper({theme}) {
  const dispatch = useDispatch();
  const [currentStage, setCurrentStage] = useState(0);
  const location = useLocation();
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const mapOutline = useSelector((state) => state.geojson.geojson);

  const NavigationButton = styled(Button)(({ theme }) => ({
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }));

  const isNextButtonDisabled = () => {
    if (currentStage === 1 && !mapOutline) return true;
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
    <OutlineSelectionPage theme = {theme} />,
    <MapDataEditorSelector />,
    <MapGraphicsEditing theme = {theme}/>
  ];

  return (
    <div className="mapCreationWrapper">
      <div className="wrapper-button-group">
        {currentStage !== 0 && (
          <NavigationButton
              variant="contained" startIcon={<ArrowBackIcon />} onClick={goBack}>
            Back
          </NavigationButton>
        )}

        {currentStage < stages.length - 1 && currentStage !== 0 && (
          <NavigationButton
            variant="contained"
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
