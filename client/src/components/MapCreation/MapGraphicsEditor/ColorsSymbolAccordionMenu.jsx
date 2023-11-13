import React from 'react';
import { Autocomplete, Divider, Typography, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { changeColorByProperty } from '../../../redux-slices/mapGraphicsDataSlice';
import Box from '@mui/material/Box';
import ColorRange from './ColorRange';

export default function ColorsSymbolAccordionMenu() {
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <Typography variant="subtitle2">color by property</Typography>
        <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
        <Autocomplete
          value={colorByProperty}
          onChange={handleColorByPropertyChange}
          options={propertyNames}
          fullWidth
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <Typography variant="subtitle2">steps</Typography>
        <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
        <TextField type="number" defaultValue={3} fullWidth />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <Typography variant="subtitle2">range</Typography>
        <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
        <ColorRange
          lower="min"
          upper={100}
          disableUpper={false}
          disableLower={true}
          intialColor="#ADD8E6"
        />

        <ColorRange
          lower={101}
          upper={200}
          disableUpper={false}
          disableLower={false}
          intialColor="#0000CD"
        />

        <ColorRange
          lower={201}
          upper={'max'}
          disableUpper={true}
          disableLower={false}
          intialColor="#00008B"
        />
      </Box>
    </Box>
  );
}
