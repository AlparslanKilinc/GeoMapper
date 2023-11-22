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
import { useSelector } from 'react-redux';

export default function MapCreationWrapper() {
  const [currentStage, setCurrentStage] = useState(0);
  const location = useLocation();
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

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
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={goBack}
          disabled={currentStage === 0}
        >
          Back
        </Button>

        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={goForward}
          disabled={!mapGraphicsType || currentStage === stages.length - 1}
        >
          Next
        </Button>
      </div>
      {stages[currentStage]}
    </div>
  );
}
