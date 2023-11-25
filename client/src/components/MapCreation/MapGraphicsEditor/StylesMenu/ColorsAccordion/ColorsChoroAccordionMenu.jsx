import React from 'react';
import { Autocomplete, Divider, Typography, TextField, Slider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { changeColorByProperty } from '../../../../../redux-slices/mapGraphicsDataSlice';
import { changeColorByName, setOpacity } from '../../../../../redux-slices/mapStylesSlice';
import Box from '@mui/material/Box';
import ColorSelector from './ColorSelector';
import SubMenuTitle from '../../SubMenuTitle';

export default function ColorsChoroAccordionMenu() {
  const dispatch = useDispatch();
  const { propertyNames, colorByProperty, regions } = useSelector((state) => state.mapGraphics);
  const { colors, opacity } = useSelector((state) => state.mapStyles);

  const handleColorChangeText = (name) => {
    return (color) => {
      dispatch(changeColorByName({ name, color }));
    };
  };

  const handleColorByPropertyChange = (event, newValue) => {
    dispatch(changeColorByProperty(newValue));
  };

  const handleChangeOpacity = (event, newValue) => {
    dispatch(setOpacity(newValue));
  };

  let colorSelectors = (
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
  );

  // if the colorByProperty is continous, then we need to show the color range
  if (!isNaN(regions[0][colorByProperty]))
    colorSelectors = <Typography>Range color selector under construction</Typography>;

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

      {colorSelectors}

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <SubMenuTitle title="opacity" />
        <Slider min={0} max={1} step={0.01} value={opacity} onChange={handleChangeOpacity} />
      </Box>
    </Box>
  );
}
