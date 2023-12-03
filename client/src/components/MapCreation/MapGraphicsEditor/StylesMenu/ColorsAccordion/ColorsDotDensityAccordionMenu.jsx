import React from 'react';
import { Slider, TextField, Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import SubMenuTitle from '../../SubMenuTitle';
import { MuiColorInput } from 'mui-color-input';
import { useSelector, useDispatch } from 'react-redux';
import { changeXByProperty } from '../../../../../redux-slices/mapGraphicsDataSlice';
import { setFixedOpacity, setValuePerDot } from '../../../../../redux-slices/mapGraphicsDataSlice';
import ColorSelector from './ColorSelector';
import { changeColorByName } from '../../../../../redux-slices/mapStylesSlice';
export default function ColorsDotDensityAccordionMenu() {
  const dispatch = useDispatch();
  const fixedOpacity = useSelector((state) => state.mapGraphics.fixedOpacity);
  const fixedColor = useSelector((state) => state.mapGraphics.fixedColor);
  const valuePerDot = useSelector((state) => state.mapGraphics.valuePerDot);
  const dotDensityByProperty = useSelector((state) => state.mapGraphics.dotDensityByProperty);
  const colors = useSelector((state) => state.mapStyles.colors);
  const propertyNames = useSelector((state) => state.mapGraphics.propertyNames);
  const columnTypes = useSelector((state) => state.mapGraphics.columnTypes);

  // filter numerical properties from the propertyNames
  const dotDensityByPropertyOptions = propertyNames.filter((property) => {
    return columnTypes[property] === 'number';
  });

  const handleFixedColorChange = (color) => {
    dispatch(changeXByProperty({ property: 'fixedColor', propertyBy: color }));
  };

  const handleChangeValuePerDot = (event) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      dispatch(setValuePerDot(newValue));
    }
  };

  const handleChangeOpacity = (event, newValue) => {
    dispatch(setFixedOpacity(newValue));
  };

  const handleColorChangeText = (name) => {
    return (color) => {
      dispatch(changeColorByName({ name, color }));
    };
  };

  let colorSelectors = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%' }}
    >
      <SubMenuTitle title="select color" />
      <MuiColorInput
        format="hex"
        value={fixedColor}
        onChange={handleFixedColorChange}
        style={{ width: '100%' }}
      />
    </Box>
  );

  if (dotDensityByProperty) {
    colorSelectors = (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <SubMenuTitle title="select color" />

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
        sx={{ gap: 2 }}
      >
        <SubMenuTitle title="color by property" />
        <Autocomplete
          multiple
          id="tags-standard"
          options={dotDensityByPropertyOptions}
          value={dotDensityByProperty}
          onChange={(event, newValue) => {
            dispatch(changeXByProperty({ property: 'dotDensityByProperty', propertyBy: newValue }));
          }}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder="dot density" />
          )}
        />
      </Box>
      {dotDensityByProperty && colorSelectors}

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <SubMenuTitle title="opacity" />
        <Slider value={fixedOpacity} onChange={handleChangeOpacity} />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <SubMenuTitle title="dot value" />
        <TextField type="number" value={valuePerDot} onChange={handleChangeValuePerDot} fullWidth />
      </Box>
    </Box>
  );
}
