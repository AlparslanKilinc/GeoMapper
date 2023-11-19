import React, { useEffect } from 'react';
import { Autocomplete, Divider, Typography, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { changeColorByProperty } from '../../../redux-slices/mapGraphicsDataSlice';
import {
  setColors,
  changeColorByName,
  setSelectedPropUniqueValues
} from '../../../redux-slices/mapStylesSlice';
import Box from '@mui/material/Box';
import ColorSelector from './ColorSelector';

export default function ColorsChoroAccordionMenu() {
  const dispatch = useDispatch();
  const { propertyNames, colorByProperty, regions } = useSelector((state) => state.mapGraphics);
  const { colors } = useSelector((state) => state.mapStyles);

  const handleColorChangeText = (name) => {
    return (color) => {
      dispatch(changeColorByName({ name, color }));
    };
  };

  const handleColorByPropertyChange = (event, newValue) => {
    dispatch(changeColorByProperty(newValue));
  };
  // lets extract unique values from the property associated with the colorByProperty
  const extractUniqueColorValues = (regions, colorByProperty) => {
    const uniqueValues = new Set();
    regions.forEach((region) => {
      uniqueValues.add(region[colorByProperty]);
    });
    return uniqueValues;
  };
  const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

  const initColors = () => {
    const uniqueValues = extractUniqueColorValues(regions, colorByProperty);
    const c = Array.from(uniqueValues).map((name) => {
      return { name, color: generateRandomColor() };
    });

    dispatch(setColors(c));
    dispatch(setSelectedPropUniqueValues(Array.from(uniqueValues)));
  };

  useEffect(() => {
    initColors();
  }, []);

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
        <Typography variant="subtitle2">select color</Typography>
        <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />

        {colors.map(({ name, color }, index) => {
          return (
            <ColorSelector
              title={name}
              intialColor={color}
              disableLower
              disableUpper
              handleColorChangeCustom={handleColorChangeText(name)}
              key={index + 'colorSelector'}
            />
          );
        })}
      </Box>
    </Box>
  );
}
