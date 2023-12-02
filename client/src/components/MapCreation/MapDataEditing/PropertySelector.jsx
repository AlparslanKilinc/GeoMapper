import React, { useState, useEffect } from 'react';
import { Autocomplete, Divider, Typography, TextField, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { changeXByProperty, TableValidation } from '../../../redux-slices/mapGraphicsDataSlice';

export default function PropertySelector({ value, propertyName }) {
  let { propertyNames, pointProperties } = useSelector((state) => state.mapGraphics);
  let mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const defaultProperties = propertyName === 'label' ? propertyNames : [];
  const [properties, setProperties] = useState(defaultProperties);

  useEffect(() => {
    if (
      mapGraphicsType === 'Symbol Map' ||
      (mapGraphicsType === 'Spike Map' && propertyName !== 'label')
    ) {
      setProperties(pointProperties);
    } else {
      setProperties(propertyNames);
    }
  }, [mapGraphicsType, propertyNames, pointProperties]);

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
        options={properties}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
      />
    </Box>
  );
}
