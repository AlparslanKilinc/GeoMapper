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
        <Button onClick={handleUndo}>
          <UndoIcon />
        </Button>
        <Button onClick={handleRedo}>
          <RedoIcon />
        </Button>
        <Button onClick={handleExport}>
          <SaveAltIcon />
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default UndoRedoButtonGroup;
