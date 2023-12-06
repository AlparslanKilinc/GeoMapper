import React from 'react';
import Box from '@mui/material/Box';
import SubMenuTitle from '../../../MapCreation/MapGraphicsEditor/SubMenuTitle';
import { useSelector, useDispatch } from 'react-redux';
import {
  setDefaultLabelColor,
  setDefaultLabelFont,
  setDefaultLabelSize
} from '../../../../redux-slices/mapStylesSlice';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MuiColorInput } from 'mui-color-input';
import DebouncedColorInput from '../../../DebouncedElement/DebouncedColorInput';

export default function LabelStylesEditor() {
  const dispatch = useDispatch();
  const defaultLabelColor = useSelector((state) => state.mapStyles.defaultLabelColor);
  const defaultLabelFont = useSelector((state) => state.mapStyles.defaultLabelFont);
  const defaultLabelSize = useSelector((state) => state.mapStyles.defaultLabelSize);
  const handleChangeDefaultLabelColor = (color) => {
    dispatch(setDefaultLabelColor(color));
  };
  const handleChangeDefaultLabelFont = (event, newValue) => {
    dispatch(setDefaultLabelFont(newValue));
  };
  const handleChangeDefaultLabelSize = (event) => {
    dispatch(setDefaultLabelSize(event.target.value));
  };

  const fontFamilies = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Verdana',
    'Trebuchet MS',
    'Lucida Sans Unicode'
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ gap: 2 }}
    >
      <SubMenuTitle title="label styles" />
      <DebouncedColorInput
        value={defaultLabelColor}
        onChange={handleChangeDefaultLabelColor}
        label="Label Color"
      />
      <TextField
        value={defaultLabelSize}
        onChange={handleChangeDefaultLabelSize}
        label="Default Label Size"
        type="number"
      />
      <Autocomplete
        value={defaultLabelFont}
        onChange={handleChangeDefaultLabelFont}
        options={fontFamilies}
        fullWidth
        renderInput={(params) => <TextField {...params} label="Font-Family" />}
      />
    </Box>
  );
}
