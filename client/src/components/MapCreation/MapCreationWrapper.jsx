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
import { useSelector } from 'react-redux';

export default function MapCreationWrapper() {
  const [currentStage, setCurrentStage] = useState(0);
  const location = useLocation();
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

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
    <MapDataEditor />,
    <MapGraphicsEditor />
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
          disabled={!mapGraphicsType || currentStage === stages.length - 1}
        >
          Next
        </NavigationButton>
      </div>
      {stages[currentStage]}
    </div>
  );
}
