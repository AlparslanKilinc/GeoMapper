import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { changeMapTitle } from '../../../redux-slices/mapMetadataSlice';

const MapTitleEditor = () => {
  const dispatch = useDispatch();
  const { title } = useSelector((state) => state.mapMetadata);
  const [width, setWidth] = useState(0);
  const textWidthRef = useRef();

  const handleTitleChange = (event) => {
    dispatch(changeMapTitle(event.target.value));
  };

  useEffect(() => {
    setWidth(textWidthRef.current.scrollWidth);
  }, [title]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={1}>
      <div style={{ position: 'relative' }}>
        <span ref={textWidthRef} style={{
          position: 'absolute',
          visibility: 'hidden',
          height: 'auto',
          width: 'auto',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          padding: '0.7em 0.4em'
        }}>
          {title || 'Enter document title'}
        </span>
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
              },
              '& input': {
                fontSize: '1.25rem',
                fontWeight: 'bold',
                padding: '0.7em 0.4em'
              },
            },
            width: `${width}px`
          }}
        />
      </div>
    </Box>
  );
};

export default MapTitleEditor;
