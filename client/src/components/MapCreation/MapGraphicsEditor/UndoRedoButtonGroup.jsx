import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Box from '@mui/material/Box';
import { undo, redo } from '../../../redux-slices/undoRedoSlice';

function UndoRedoButtonGroup() {
  const dispatch = useDispatch();
  const past = useSelector((state) => state.undoRedo.past);
  const future = useSelector((state) => state.undoRedo.future);

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleRedo = () => {
    dispatch(redo());
  };

  return (
    <Box sx={{
      position: 'absolute',
      top: '55%',
      transform: 'translateY(-50%)',
      zIndex: 1000,
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
        <Button
          onClick={handleUndo}
          sx={{
            borderTopRightRadius: '50%',
            width: '3em',
            height: '3em',
            color: past.length > 0 ? 'primary' : 'grey',
            backgroundColor: past.length > 0 ? 'primary' : 'grey.300',
            '&:hover': {
              backgroundColor: past.length > 0 ? 'primary.dark' : 'grey.300',
            }
          }}>
          <UndoIcon />
        </Button>
        <Button
          onClick={handleRedo}
          sx={{
            borderBottomRightRadius: '50%',
            width: '3em',
            height: '3em',
            color: future.length > 0 ? 'primary' : 'grey',
            backgroundColor: future.length > 0 ? 'primary' : 'grey.300',
            '&:hover': {
              backgroundColor: future.length > 0 ? 'primary.dark' : 'grey.300',
            }
          }}>
          <RedoIcon />
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default UndoRedoButtonGroup;