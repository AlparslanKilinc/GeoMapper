import React from 'react';
import Box from '@mui/material/Box';
import SubMenuTitle from '../../../MapCreation/MapGraphicsEditor/SubMenuTitle';
import { useSelector, useDispatch } from 'react-redux';
import {
  setDefaultLabelColor,
  setDefaultLabelFont,
  setDefaultLabelSize,
  setLabelColor,
  setLabelFont,
  setLabelSize
} from '../../../../redux-slices/mapStylesSlice';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MuiColorInput } from 'mui-color-input';
import DebouncedColorInput from '../../../DebouncedElement/DebouncedColorInput';

export default function LabelStylesEditor({ idx }) {
  const dispatch = useDispatch();
  const defaultLabelColor = useSelector((state) => state.mapStyles.defaultLabelColor);
  const defaultLabelFont = useSelector((state) => state.mapStyles.defaultLabelFont);
  const defaultLabelSize = useSelector((state) => state.mapStyles.defaultLabelSize);
  const labels = useSelector((state) => state.mapStyles.labels);

  let colorValue = defaultLabelColor;
  let fontValue = defaultLabelFont;
  let sizeValue = defaultLabelSize;

  let handleChangeLabelColor = (color) => {
    dispatch(setDefaultLabelColor(color));
  };
  let handleChangeLabelFont = (event, newValue) => {
    dispatch(setDefaultLabelFont(newValue));
  };
  let handleChangeLabelSize = (event) => {
    dispatch(setDefaultLabelSize(event.target.value));
  };

  idx = Number(idx);
  if (idx !== undefined && idx > -1) {
    let label = labels[idx];
    colorValue = label.color;
    fontValue = label.font;
    sizeValue = label.size;

    handleChangeLabelColor = (color) => {
      dispatch(setLabelColor({ color, idx }));
    };
    handleChangeLabelFont = (event, font) => {
      dispatch(setLabelFont({ font, idx }));
    };
    handleChangeLabelSize = (event) => {
      dispatch(setLabelSize({ size: event.target.value, idx }));
    };
  }

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
        value={colorValue}
        onChange={handleChangeLabelColor}
        label="Label Color"
        key={idx}
      />
      <TextField
        value={sizeValue}
        onChange={handleChangeLabelSize}
        label="Default Label Size"
        type="number"
      />
      <Autocomplete
        value={fontValue}
        onChange={handleChangeLabelFont}
        options={fontFamilies}
        fullWidth
        renderInput={(params) => <TextField {...params} label="Font-Family" />}
      />
    </Box>
  );
}
