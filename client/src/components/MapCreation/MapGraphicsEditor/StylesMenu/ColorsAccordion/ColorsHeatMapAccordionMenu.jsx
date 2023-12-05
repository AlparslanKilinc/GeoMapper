import React from 'react';
import { Autocomplete, Divider, Typography, TextField, Slider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { changeColorByProperty } from '../../../../../redux-slices/mapGraphicsDataSlice';
import { changeColorByName, setOpacity } from '../../../../../redux-slices/mapStylesSlice';
import Box from '@mui/material/Box';
import ColorPalette from './ColorPalette';
import SubMenuTitle from '../../SubMenuTitle';
import DebouncedSlider from '../../../../DebouncedElement/DebouncedSlider';

export default function ColorsHeatMapAccordionMenu() {
  const dispatch = useDispatch();
  const colorByProperty = useSelector(state => state.mapGraphics.colorByProperty);
  const propertyNames = useSelector(state => state.mapGraphics.propertyNames)
  const opacity = useSelector((state) => state.mapStyles.opacity);
  const columnTypes = useSelector(state => state.mapGraphics.columnTypes)

  let propertyNamesNumeric = propertyNames.filter((prop) => {
    return columnTypes[prop] === 'number';
  });

  const handleColorByPropertyChange = (event, newValue) => {
    dispatch(changeColorByProperty(newValue));
  };

  const handleChangeOpacity = (newValue) => {
    dispatch(setOpacity(newValue));
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

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <Typography variant="subtitle2">select color</Typography>
        <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
        <ColorPalette />
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
