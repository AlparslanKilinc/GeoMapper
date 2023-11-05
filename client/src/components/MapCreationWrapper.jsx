import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../styles/mapCreationWrapper.css';
import { styled } from '@mui/material/styles';
import TempleSelection from './MapCreation/TemplateSelection';
import MapDataEditing from './MapCreation/MapDataEditing';
import MapUpload from './MapCreation/MapUpload';
import MapGraphicsEditing from './MapCreation/MapGraphicsEditing';

export default function MapCreationWrapper() {
  const stages = [<TempleSelection />, <MapUpload />, <MapDataEditing />, <MapGraphicsEditing />];
  const [currentStage, setCurrentStage] = useState(0);

  const NavigationButton = styled(Button)(({ theme }) => ({
    borderColor: '#40e0d0',
    color: '#40e0d0',
    '&:hover': {
      borderColor: '#40e0d0',
      backgroundColor: 'transparent'
    }
  }));

  const goBack = () => {
    setCurrentStage(currentStage - 1);
  };

  const goForward = () => {
    setCurrentStage(currentStage + 1);
  };

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
      <div>{stages[currentStage]}</div>
    </div>
  );
}
