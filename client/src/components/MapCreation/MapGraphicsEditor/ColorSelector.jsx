import React from 'react';
import Box from '@mui/material/Box';
import { MuiColorInput } from 'mui-color-input';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeColorByName } from '../../../redux-slices/mapStylesSlice';

const ColorSelector = ({
  lower,
  upper,
  disableUpper,
  disableLower,
  intialColor,
  title,
  handleColorChangeCustom
}) => {
  const [color, setColor] = React.useState(intialColor);

  let handleChange = (color) => {
    setColor(color);
    if (handleColorChangeCustom) {
      handleColorChangeCustom(color);
    }
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

  if (title) {
    colorBy = (
      <Typography sx={{ minWidth: '5ch' }} variant="subtitle2">
        {title}
      </Typography>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      sx={{ gap: 2 }}
    >
      <MuiColorInput
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
