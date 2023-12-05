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
import { changeXByProperty } from '../../../../../redux-slices/mapGraphicsDataSlice';
import DebouncedSlider from '../../../../DebouncedElement/DebouncedSlider';

export default function ColorsSymbolAccordionMenu() {
  const dispatch = useDispatch();
  const colorByProperty = useSelector((state) => state.mapGraphics.colorByProperty);
  const points = useSelector((state) => state.mapGraphics.points);
  const colors = useSelector((state) => state.mapStyles.colors);
  const fixedOpacity = useSelector((state) => state.mapGraphics.fixedOpacity);
  const opacityByProperty = useSelector((state) => state.mapGraphics.opacityByProperty);
  const fixedColor = useSelector((state) => state.mapGraphics.fixedColor);

  let propertyNames = [];
  if (points.length > 0) {
    propertyNames = Object.keys(points[0]);
  }

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

  const handleChangeOpacity = (newValue) => {
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
      <DebouncedSlider min={0} max={1} step={0.01} value={fixedOpacity} onChange={handleChangeOpacity} />
    </Box>
  );

  // if the colorByProperty is continous, then we need to show the color range

  // if (points.length > 0) {
  // this should be refactored to check from columnTypes

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
        console.log('name', name, ':', color);
        return (
          <ColorSelector
            title={name}
            color={color}
            disableLower
            disableUpper
            handleColorChangeCustom={handleColorChangeText(name)}
            key={index + 'colorSelector'}
            name={name}
          />
        );
      })}
    </Box>
  );
  // }

  const colorControl = colorByProperty ? colorSelectors : fixedColorSelector;
  const noPointsMessage = <Typography variant="subtitle2">Add symbols to begin editing</Typography>;

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

      {points.length > 0 ? colorControl : noPointsMessage}

      <PropertySelector
        property={opacityByProperty}
        propertyName="opacity"
        label="opacity by property"
      />

      {!opacityByProperty && colorSlider}
    </Box>
  );
}
