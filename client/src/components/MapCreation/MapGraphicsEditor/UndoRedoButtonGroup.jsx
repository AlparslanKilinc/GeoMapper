import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Box from '@mui/material/Box';

function UndoRedoButtonGroup() {
  // Add your button handlers here
  const handleUndo = () => {
    /* Undo logic */
  };
  const handleRedo = () => {
    /* Redo logic */
  };
  const handleExport = () => {
    /* Export logic */
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
      >
        <Button onClick={handleUndo} className = "undo-redo-buttons">
          <UndoIcon />
        </Button>
        <Button onClick={handleRedo} className = "undo-redo-buttons">
          <RedoIcon />
        </Button>
        <Button onClick={handleExport} className = "undo-redo-buttons">
          <SaveAltIcon />
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default UndoRedoButtonGroup;
