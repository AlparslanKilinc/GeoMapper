import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { MuiColorInput } from 'mui-color-input';
import { setColorSteps } from '../../../../../redux-slices/mapStylesSlice';

const ColorStep = ({ rangeIdx, from, to, disableUpper, disableLower, initialColor }) => {
  const [color, setColor] = useState(initialColor);
  const [fromValue, setFromValue] = useState(from);
  const [toValue, setToValue] = useState(to);
  const colorSteps = useSelector((state) => state.mapStyles.colorSteps);
  const dispatch = useDispatch();

  useEffect(() => {
    setFromValue(colorSteps[rangeIdx].range.from);
    setToValue(colorSteps[rangeIdx].range.to);
  }, [colorSteps]);

  function rgbToHex(rgb) {
    const rgbArray = rgb.match(/\d+/g);

    const hex = rgbArray
      .map((val) => {
        const hexVal = parseInt(val).toString(16);
        return hexVal.length === 1 ? `0${hexVal}` : hexVal;
      })
      .join('');

    return `#${hex}`;
  }
  // TODO: Robust
  const handleColorChange = (newColor) => {
    setColor(rgbToHex(newColor));
  };

  const handleFromChange = (event) => {
    setFromValue(event.target.value);
  };

  const handleToChange = (event) => {
    setToValue(event.target.value);
  };

  const handleColorBlur = (event) => {
    const updatedColorRanges = colorSteps.map((range, idx) =>
      idx === rangeIdx ? { ...range, color: color } : range
    );

    dispatch(setColorSteps(updatedColorRanges));
  };

  const handleFromBlur = () => {
    const updatedColorRanges = colorSteps.map((range, idx) => {
      if (idx === rangeIdx) {
        return {
          ...range,
          range: {
            ...range.range,
            from: parseInt(fromValue, 10)
          }
        };
      } else if (idx === rangeIdx - 1) {
        return {
          ...range,
          range: {
            ...range.range,
            to: parseInt(fromValue, 10) - 1
          }
        };
      }
      return range;
    });

    dispatch(setColorSteps(updatedColorRanges));
  };

  const handleToBlur = () => {
    const updatedColorRanges = colorSteps.map((range, idx) => {
      if (idx === rangeIdx) {
        return {
          ...range,
          range: {
            ...range.range,
            to: parseInt(toValue, 10)
          }
        };
      } else if (idx === rangeIdx + 1) {
        return {
          ...range,
          range: {
            ...range.range,
            from: parseInt(toValue, 10) + 1
          }
        };
      }
      return range;
    });

    dispatch(setColorSteps(updatedColorRanges));
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      format="hex"
      sx={{ gap: 2 }}
    >
      <MuiColorInput
        value={color}
        onChange={handleColorChange}
        inputProps={{ style: { width: '0', border: 'none' } }}
        onBlur={handleColorBlur}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white'
            },
            '&:hover fieldset': {
              borderColor: 'white'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white'
            }
          }
        }}
      />
      <input
        type="text"
        disabled={disableLower}
        value={fromValue}
        onChange={handleFromChange}
        onBlur={handleFromBlur}
        style={{
          width: '30px',
          height: '30px',
          padding: '2',
          borderRadius: '0'
        }}
      />
      -
      <input
        type="text"
        disabled={disableUpper}
        value={toValue}
        onChange={handleToChange}
        onBlur={handleToBlur}
        style={{
          width: '30px', // Set the width
          height: '30px',
          padding: '2',
          borderRadius: '0'
        }}
      />
    </Box>
  );
};

export default ColorStep;
