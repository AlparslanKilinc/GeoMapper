import React from 'react';
import { Box, Typography, Divider, TextField, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeColorByProperty } from '../../../redux-slices/mapGraphicsDataSlice';
export default function RegionEditing({theme}) {
  const dispatch = useDispatch();

  const { propertyNames, colorByProperty } = useSelector((state) => state.mapGraphics);
  const handleColorByPropertyChange = (event, newValue) => {
    dispatch(changeColorByProperty(newValue));
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ gap: 2 }}
    >
      <TextField variant="outlined" placeholder="Search..." sx={{ width: '100%' }}
                 InputProps={{
        style: {
          color: theme.typography.allVariants.color
        }}} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <Typography variant="subtitle2">New York</Typography>
        <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <Autocomplete
          value={colorByProperty}
          onChange={handleColorByPropertyChange}
          options={propertyNames}
          fullWidth
          renderInput={(params) => <TextField {...params} fullWidth
                                              sx={{
                                                '& .MuiOutlinedInput-root': {
                                                  color: theme.typography.allVariants.color
                                                },
                                              }}
          />}
          renderOption={(props, option) => (
              <li {...props} style={{ color: 'black' }}>
                {option}
              </li>
          )}

        />
        <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
        <TextField type="number" defaultValue={3} fullWidth   sx={{
          '& .MuiOutlinedInput-root': {
            color: theme.typography.allVariants.color
          },
        }}/>
      </Box>
    </Box>
  );
}
