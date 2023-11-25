import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Box from '@mui/material/Box';

function UndoRedoButtonGroup() {
  // Add your button handlers here
  const handleUndo = () => {
    /* Undo logic */
  };
  const handleRedo = () => {
    /* Redo logic */
  };

  return (
    <Box sx={{
      position: 'absolute',
      top: '55%',
      transform: 'translateY(-50%)',
      zIndex: 1,
    }}>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          '& .MuiButton-root': {
            borderColor: 'transparent',
            '&:not(:last-of-type)': {
              borderBottom: 'none',
            },
          },
        }}
      >
        <Button onClick={handleUndo} sx={{
          borderTopRightRadius: '50%',
          width: '3em',
          height: '3em'
        }}>
          <UndoIcon />
        </Button>
        <Button onClick={handleRedo} sx={{
          borderBottomRightRadius: '50%',
          width: '3em',
          height: '3em'
        }}>
          <RedoIcon />
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default UndoRedoButtonGroup;
