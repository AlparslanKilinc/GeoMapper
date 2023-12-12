import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { changeColorByName, changeName } from '../../../../../redux-slices/mapStylesSlice';
import DebouncedColorInput from '../../../../DebouncedElement/DebouncedColorInput';
import DebouncedTextField from '../../../../DebouncedElement/DebouncedTextField';
import { changeNameColor } from '../../../../../redux-slices/mapGraphicsDataSlice';
import { addActionToPast } from '../../../../../redux-slices/undoRedoSlice';

const ColorSelector = ({ lower, upper, disableUpper, disableLower, title, color, name }) => {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.mapStyles.colors);
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

  let handleChange = (newColor) => {
    dispatch(addActionToPast({
      undoActions: [{ actionCreator: changeColorByName, args: [{ color: color, name }] }],
      redoActions: [{ actionCreator: changeColorByName, args: [{ color: newColor, name }] }]
    }));
    dispatch(changeColorByName({ color: newColor, name }));
  };

  const colorByRange =
    (
      <input
        type="text"
        disabled={disableLower}
        value={lower}
        style={{
          width: '30px', // Set the width
          height: '30px', // Set the height to make it square
          padding: '2', // Remove padding to keep it small
          borderRadius: '0' // Make edges sharp/square
        }}
      />
    ) -
    (
      <input
        type="text"
        disabled={disableUpper}
        value={upper}
        style={{
          width: '30px', // Set the width
          height: '30px', // Set the height to make it square
          padding: '2', // Remove padding to keep it small
          borderRadius: '0' // Make edges sharp/square
        }}
      />
    );

  let colorBy = colorByRange;
  const handleNameChange = (newColorValue) => {
    dispatch(addActionToPast({
      undoActions: [
        { actionCreator: changeName, args: [{ oldName: newColorValue, newName: name }] },
        { actionCreator: changeNameColor, args: [{ oldColorValue: newColorValue, newColorValue: name, mapGraphicsType }] }
      ],
      redoActions: [
        { actionCreator: changeName, args: [{ oldName: name, newName: newColorValue }] },
        { actionCreator: changeNameColor, args: [{ oldColorValue: name, newColorValue: newColorValue, mapGraphicsType }] }
      ]
    }));
    dispatch(changeName({ oldName: name, newName: newColorValue }));
    dispatch(changeNameColor({ oldColorValue: name, newColorValue, mapGraphicsType }));
  };

  let key = JSON.stringify({ color, name });
  colorBy = (
    <DebouncedTextField
      value={name}
      onChange={handleNameChange}
      variant="outlined"
      key={key}
      size="small"
    />
  );

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      sx={{ gap: 2 }}
    >
      <DebouncedColorInput
        value={color}
        onChange={handleChange}
        inputProps={{ style: { width: '0', border: 'none' } }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white' // Change border color
            },
            '&:hover fieldset': {
              borderColor: 'white' // Change border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white' // Change border color when focused
            }
          }
        }}
      />

      {colorBy}
    </Box>
  );
};

export default ColorSelector;
