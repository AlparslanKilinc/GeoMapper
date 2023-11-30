import React from 'react';
import { Autocomplete, Divider, Typography, TextField, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {changeXByProperty,  setPreviousProperty} from '../../../redux-slices/mapGraphicsDataSlice';

export default function xPropertySelector({ value, propertyName, isLabel }) {
  let propertyNames = useSelector((state) => state.mapGraphics.propertyNames);
  let isLabelVisible = useSelector((state) => state.mapGraphics.isLabelVisible)
  let propLabel = useSelector((state) => state.mapGraphics.labelByProperty)
  let previousProp = useSelector((state) => state.mapGraphics.previousProperty);

  const dispatch = useDispatch();
  const onChange = (event, newValue) => {
    if(isLabel){
      dispatch(setPreviousProperty(propLabel))
    }
    const payload = {
      property: propertyName + 'ByProperty',
      propertyBy: newValue,

    };
    dispatch(changeXByProperty(payload));
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%' }}
    >
      <Typography variant="subtitle2">{propertyName} by property</Typography>
      <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
      <Autocomplete
        fullWidth
        value={value}
        onChange={onChange}
        options={propertyNames}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
      />
    </Box>
  );
}
