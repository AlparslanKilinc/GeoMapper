import React from 'react';
import Button from '@mui/material/Button';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../../styles/mapCreationWrapper.css';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useClearStates } from '../MapCreation/useClearStates';

export default function MapCreationWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const mapId = useSelector((state) => state.mapMetadata.mapId);
  const mapOutline = useSelector((state) => state.geojson.geojson.geoJSON);
  const validationMessage = useSelector((state) => state.mapGraphics.validationMessage);
  const { clearStatesComplete } = useClearStates();
  const stages = ['/', 'OutlineSelection', 'DataEditor', 'GraphicsEditor'];

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

  const shouldShowBackButton = () => {
    const currentStage = stages[currentStageIndex()];
    const isDataEditorStage = currentStage === 'DataEditor';
    const hasMapId = !!mapId; // Convert mapId to a boolean
    // Show back button if not in DataEditor stage or if in DataEditor stage but no mapId
    return currentStageIndex() > 0 && (!isDataEditorStage || (isDataEditorStage && !hasMapId));
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

  const goBack = () => {
    const prevStageIndex = currentStageIndex() - 1;
    if (prevStageIndex >= 0) {
      if (prevStageIndex == 0) {
        clearStatesComplete();
      }
      const route =
        prevStageIndex === 0 ? '/mapCreation' : `/mapCreation/${stages[prevStageIndex]}`;
      navigate(route);
    }
  };

  const goForward = () => {
    const nextStageIndex = currentStageIndex() + 1;
    if (nextStageIndex < stages.length) {
      const route =
        nextStageIndex === 0 ? '/mapCreation' : `/mapCreation/${stages[nextStageIndex]}`;
      navigate(route);
    }
  };

  return (
    <div className="mapCreationWrapper">
      <div className="wrapper-button-group">
        {shouldShowBackButton() ? (
          <NavigationButton variant="outlined" startIcon={<ArrowBackIcon />} onClick={goBack}>
            Back
          </NavigationButton>
        ) : (
          <div></div>
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
    </div>
  );
}
