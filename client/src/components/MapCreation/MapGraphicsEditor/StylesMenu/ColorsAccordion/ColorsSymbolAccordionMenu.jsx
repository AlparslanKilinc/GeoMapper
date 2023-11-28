import React from 'react';
import { Autocomplete, Divider, Typography, TextField, Slider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { changeColorByProperty } from '../../../../../redux-slices/mapGraphicsDataSlice';
import { changeColorByName } from '../../../../../redux-slices/mapStylesSlice';
import Box from '@mui/material/Box';
import ColorSelector from './ColorSelector';
import ColorPalette from './ColorPalette';
import SubMenuTitle from '../../SubMenuTitle';
import { setFixedOpacity } from '../../../../../redux-slices/mapGraphicsDataSlice';
import PropertySelector from '../../../MapDataEditing/PropertySelector';
import { MuiColorInput } from 'mui-color-input';
import { color } from 'd3';
import { changeXByProperty } from '../../../../../redux-slices/mapGraphicsDataSlice';

export default function ColorsSymbolAccordionMenu() {
  const dispatch = useDispatch();
  const colorByProperty = useSelector((state) => state.mapGraphics.colorByProperty);
  const points = useSelector((state) => state.mapGraphics.points);
  const colors = useSelector((state) => state.mapStyles.colors);
  const fixedOpacity = useSelector((state) => state.mapGraphics.fixedOpacity);
  const opacityByProperty = useSelector((state) => state.mapGraphics.opacityByProperty);
  const fixedColor = useSelector((state) => state.mapGraphics.fixedColor);
  const pointData = Object.values(points);

  const propertyNames = Object.keys(pointData[0]);

  const handleColorChangeText = (name) => {
    return (color) => {
      dispatch(changeColorByName({ name, color }));
    };
  };

  const handleFixedColorChange = (color) => {
    dispatch(changeXByProperty({ property: 'fixedColor', propertyBy: color }));
  };

  const handleColorByPropertyChange = (event, newValue) => {
    dispatch(changeColorByProperty(newValue));
  };

  const handleChangeOpacity = (event, newValue) => {
    dispatch(setFixedOpacity(newValue));
  };

  let colorSelectors;

  const fixedColorSelector = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%' }}
    >
      <SubMenuTitle title="fixed color" />
      <MuiColorInput format="hex" value={fixedColor} onChange={handleFixedColorChange} />
    </Box>
  );

  let colorSlider = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%' }}
    >
      <SubMenuTitle title="opacity" />
      <Slider min={0} max={1} step={0.01} value={fixedOpacity} onChange={handleChangeOpacity} />
    </Box>
  );

  // if the colorByProperty is continous, then we need to show the color range
  if (!isNaN(pointData[0][colorByProperty])) {
    colorSelectors = <ColorPalette />;
  } else {
    colorSelectors = (
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
  }

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

      {colorByProperty ? colorSelectors : fixedColorSelector}

      <PropertySelector
        property={opacityByProperty}
        propertyName="opacity"
        label="opacity by property"
      />

      {!opacityByProperty && colorSlider}
    </Box>
  );
}
