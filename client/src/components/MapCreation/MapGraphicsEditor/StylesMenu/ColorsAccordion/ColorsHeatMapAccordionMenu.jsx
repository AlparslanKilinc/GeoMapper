import React from 'react';
import { Autocomplete, Divider, Typography, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { changeColorByProperty } from '../../../../../redux-slices/mapGraphicsDataSlice';
import { setOpacity, changeColorType } from '../../../../../redux-slices/mapStylesSlice';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ColorPalette from './ColorPalette';
import ColorSteps from './ColorSteps';
import SubMenuTitle from '../../SubMenuTitle';
import DebouncedSlider from '../../../../DebouncedElement/DebouncedSlider';
import { addActionToPast } from '../../../../../redux-slices/undoRedoSlice';

export default function ColorsHeatMapAccordionMenu() {
  const dispatch = useDispatch();
  const colorByProperty = useSelector(state => state.mapGraphics.colorByProperty);
  const propertyNames = useSelector(state => state.mapGraphics.propertyNames)
  const opacity = useSelector((state) => state.mapStyles.opacity);
  const heatmapColorType = useSelector((state) => state.mapStyles.heatmapColorType);
  const columnTypes = useSelector(state => state.mapGraphics.columnTypes);
  const columnValidationErrors = useSelector((state) => state.mapGraphics.columnValidationErrors);

  let propertyNamesNumeric = propertyNames.filter((prop) => {
    return columnTypes[prop] === 'number' && !columnValidationErrors[prop];
  });

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

  // TODO: redo undo
  const handleColorTypeChange = (event) => {
    dispatch(changeColorType(event.target.value));
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
          options={propertyNamesNumeric}
          fullWidth
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </Box>

      <FormControl>
        <FormLabel id="step-continuous-switch" />
        <RadioGroup
          aria-labelledby="step-continuous-radio-buttons"
          name="step-continuous-radio-group"
          value={heatmapColorType}
          onChange={handleColorTypeChange}>
          <FormControlLabel value="continuous" control={<Radio />} label="continuous" />
          <FormControlLabel value="steps" control={<Radio />} label="steps" />
        </RadioGroup>
      </FormControl>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
        {heatmapColorType === 'continuous' ? <ColorPalette /> : <ColorSteps />}
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <SubMenuTitle title="opacity" />
        <DebouncedSlider min={0} max={1} step={0.01} value={opacity} onChange={handleChangeOpacity} />
      </Box>
    </Box>
  );
}
