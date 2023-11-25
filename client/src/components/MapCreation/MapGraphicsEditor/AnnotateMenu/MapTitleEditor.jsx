import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { changeMapTitle } from '../../../../redux-slices/mapMetadataSlice';

const MapTitleEditor = () => {
  const dispatch = useDispatch();
  const { title } = useSelector((state) => state.mapMetadata);
  const handleTitleChange = (event) => {
    dispatch(changeMapTitle(event.target.value));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={2}>
      <TextField
        value={title}
        onChange={handleTitleChange}
        variant="outlined"
        placeholder="Enter document title"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent' // Hide border by default
            },
            '&:hover fieldset': {
              borderColor: 'grey' // Show border on hover
            }
          }
        }}
      />
    </Box>
  );
};

export default MapTitleEditor;
