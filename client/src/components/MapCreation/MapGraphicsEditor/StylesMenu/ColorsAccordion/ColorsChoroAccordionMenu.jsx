import React from 'react';
import { Autocomplete, Divider, Typography, TextField, Slider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { changeColorByProperty } from '../../../../../redux-slices/mapGraphicsDataSlice';
import { changeColorByName, setOpacity } from '../../../../../redux-slices/mapStylesSlice';
import DebouncedSlider from '../../../../DebouncedElement/DebouncedSlider';
import { addActionToPast } from '../../../../../redux-slices/undoRedoSlice';
import Box from '@mui/material/Box';
import ColorSelector from './ColorSelector';
import SubMenuTitle from '../../SubMenuTitle';

export default function ColorsChoroAccordionMenu() {
  const dispatch = useDispatch();
  const propertyNames = useSelector((state) => state.mapGraphics.propertyNames);
  const colorByProperty = useSelector((state) => state.mapGraphics.colorByProperty);
  const columnTypes = useSelector((state) => state.mapGraphics.columnTypes);
  const columnValidationErrors = useSelector((state) => state.mapGraphics.columnValidationErrors);
  const { colors, opacity } = useSelector((state) => state.mapStyles);

  // filter propertyNames by columnTypes that are text and does not have columnValidationErrors
  const propertySelection = propertyNames.filter((name) => {
    return columnTypes[name] === 'text' && !columnValidationErrors[name];
  });

  const handleColorChangeText = (name) => {
    return (color) => {
      dispatch(changeColorByName({ name, color }));
    };
  };

  const handleColorByPropertyChange = (event, newValue) => {
    dispatch(addActionToPast({
      undoActions: [{ actionCreator: changeColorByProperty, args: [colorByProperty] }],
      redoActions: [{ actionCreator: changeColorByProperty, args: [newValue] }]
    }));
    dispatch(changeColorByProperty(newValue));
  };

  const handleChangeOpacity = (newValue) => {
    dispatch(addActionToPast({
      undoActions: [{ actionCreator: setOpacity, args: [opacity] }],
      redoActions: [{ actionCreator: setOpacity, args: [newValue] }]
    }));
    dispatch(setOpacity(newValue));
  };

  let colorSelectors;

  // if the colorByProperty is continous, then we need to show the color range
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
            name={name}
            color={color}
            disableLower
            disableUpper
            handleColorChangeCustom={handleColorChangeText(name)}
            key={index + 'colorSelector'}
          />
        );
      })}
    </Box>
  );

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
          options={propertySelection}
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
        <DebouncedSlider
          min={0}
          max={1}
          step={0.01}
          value={opacity}
          onChange={handleChangeOpacity}
        />
      </Box>
    </Box>
  );
}
