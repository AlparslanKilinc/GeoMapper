import * as React from 'react';
import { Typography, TextField } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { changeMapDescription, changeMapTitle } from '../../../redux-slices/mapMetadataSlice';

const AnnotateContent = () => {
  const { description, title } = useSelector((state) => state.mapMetadata);
  const dispatch = useDispatch();

  const handleChangeDescription = (event) => {
    dispatch(changeMapDescription(event.target.value));
  };
  const handleChangeTitle = (event) => {
    dispatch(changeMapTitle(event.target.value));
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ gap: 2 }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Typography variant="subtitle2">title</Typography>
        <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
        <TextField onChange={handleChangeTitle} value={title} type="text" fullWidth />
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Typography variant="subtitle2">description</Typography>
        <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
        <BaseTextareaAutosize
          value={description}
          onChange={handleChangeDescription}
          minRows={6}
          style={{ width: '200px !important', fontFamily: 'Outfit', fontSize: '15px'


        }}
        />
      </Box>
    </Box>
  );
};

export default AnnotateContent;
