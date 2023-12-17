import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { MuiColorInput } from 'mui-color-input';
import { setColorSteps } from '../../../../../redux-slices/mapStylesSlice';
import DebouncedColorInput from '../../../../DebouncedElement/DebouncedColorInput';

const ColorStep = ({ rangeIdx, from, to, disableUpper, disableLower }) => {
  const [fromValue, setFromValue] = useState(from);
  const [toValue, setToValue] = useState(to);
  const colorSteps = useSelector((state) => state.mapStyles.colorSteps);
  const dispatch = useDispatch();

  useEffect(() => {
    setFromValue(colorSteps[rangeIdx].range.from);
    setToValue(colorSteps[rangeIdx].range.to);
  }, [colorSteps]);

  const handleColorChange = (newColor) => {
    const updatedColorRanges = colorSteps.map((range, idx) =>
      idx === rangeIdx ? { ...range, color: newColor } : range
    );

    dispatch(setColorSteps(updatedColorRanges));
  };

  const handleFromChange = (event) => {
    setFromValue(event.target.value);
  };

  const handleToChange = (event) => {
    setToValue(event.target.value);
  };

  const handleFromBlur = () => {
    if (fromValue <= colorSteps[rangeIdx - 1].range.from + 1 || fromValue >= toValue) {
      setFromValue(colorSteps[rangeIdx].range.from);
      return;
    }

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
    if (toValue >= colorSteps[rangeIdx + 1].range.to - 1 || toValue <= fromValue) {
      setToValue(colorSteps[rangeIdx].range.to);
      return;
    }

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
      <DebouncedColorInput
        value={colorSteps[rangeIdx].color}
        onChange={handleColorChange}
        inputProps={{ style: { width: '0', border: 'none' } }}
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
          width: '30px',
          height: '30px',
          padding: '2',
          borderRadius: '0'
        }}
      />
    </Box>
  );
};

export default ColorStep;
