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

export default function MapCreationWrapper() {
  const [currentStage, setCurrentStage] = useState(0);
  const location = useLocation();
  const NavigationButton = styled(Button)(({ theme }) => ({
    borderColor: '#40e0d0',
    color: '#40e0d0',
    '&:hover': {
      borderColor: '#40e0d0',
      backgroundColor: 'transparent'
    }
  }));

  useEffect(() => {
    if (location.state && location.state.stage) {
      setCurrentStage(location.state.stage);
    }
  }, [location]);

  const goBack = () => {
    setCurrentStage(currentStage - 1);
  };

  const goForward = () => {
    setCurrentStage(currentStage + 1);
  };

  const stages = [
    <TempleSelection onSelectionComplete={goForward} />,
    <OutlineSelectionPage />,
    <MapDataEditorSelector />,
    <MapGraphicsEditing />
  ];

  return (
    <div className="mapCreationWrapper">
      <div className="wrapper-button-group">
        <NavigationButton
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={goBack}
          disabled={currentStage === 0}
        >
          Back
        </NavigationButton>

        <NavigationButton
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={goForward}
          disabled={currentStage === stages.length - 1}
        >
          Next
        </NavigationButton>
      </div>
      {stages[currentStage]}
    </div>
  );
}
