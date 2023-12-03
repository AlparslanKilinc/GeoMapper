import React from 'react';
import { Autocomplete, Divider, Typography, TextField, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { changeXByProperty, TableValidation } from '../../../redux-slices/mapGraphicsDataSlice';

export default function PropertySelector({ value, propertyName }) {
  let propertyNames = useSelector((state) => state.mapGraphics.propertyNames);
  let mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

  const dispatch = useDispatch();
  const onChange = (event, newValue) => {
    const payload = {
      property: propertyName + 'ByProperty',
      propertyBy: newValue
    };
    dispatch(changeXByProperty(payload));
    dispatch(TableValidation(mapGraphicsType));
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