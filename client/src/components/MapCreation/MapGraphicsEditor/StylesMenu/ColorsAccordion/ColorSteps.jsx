import React, { useState, useEffect } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import ColorStep from './ColorStep';
import { setColorSteps } from '../../../../../redux-slices/mapStylesSlice';
import * as d3 from 'd3';

export default function ColorSteps() {
  const dispatch = useDispatch();
  const colorSteps = useSelector((state) => state.mapStyles.colorSteps);
  const MIN = 3;
  const MAX = 7;
  const [count, setCount] = useState(MIN);
  const regions = useSelector((state) => state.mapGraphics.regions);
  const colorByProperty = useSelector((state) => state.mapGraphics.colorByProperty);
  const data = regions.map((region) => region[colorByProperty]);

  useEffect(() => {
    if (colorSteps.length === 0) {
      const minData = d3.min(data);
      const maxData = d3.max(data);
      const range = maxData - minData;
      const step = range / 3;
      dispatch(setColorSteps(
        [{
          range: { from: minData, to: minData + step },
          color: '#ADD8E6'
        },
        {
          range: { from: minData + step + 1, to: minData + 2 * step },
          color: '#0000FF'
        },
        {
          range: { from: minData + 2 * step + 1, to: maxData },
          color: '#00008B'
        }]
      ));
    }
  }, []);

  function deepenColor(hexColor) {
    let color = parseInt(hexColor.slice(1), 16);

    let red = Math.floor(((color >> 16) & 0xFF) * 0.8);

    let green = Math.floor(((color >> 8) & 0xFF) * 0.8);
    let blue = Math.floor((color & 0xFF) * 0.8);

    color = (red << 16) + (green << 8) + blue;

    return `#${color.toString(16).padStart(6, '0')}`;
  }

  function adjustColorRanges(colorSteps, action) {
    let newColorRanges = [...colorSteps];
    const minData = d3.min(data);
    const maxData = d3.max(data);
    const maxRangeValue = maxData - minData;

    if (action === 'add') {
      if (count >= MAX) {
        return;
      }
      setCount(prevCount => Math.min(MAX, prevCount + 1));
      const newColor = newColorRanges.length > 0
        ? deepenColor(newColorRanges[newColorRanges.length - 1].color)
        : '#000000';

      const totalRanges = newColorRanges.length + 1;
      const rangeSize = Math.floor(maxRangeValue / totalRanges);

      newColorRanges = newColorRanges.map((range, index) => ({
        ...range,
        range: {
          from: minData + index * rangeSize,
          to: minData + (index + 1) * rangeSize - 1
        }
      }));

      newColorRanges.push({
        range: { from: minData + (totalRanges - 1) * rangeSize, to: minData + maxRangeValue },
        color: newColor
      });
    } else if (action === 'remove' && newColorRanges.length > 0) {
      if (count <= MIN) {
        return;
      }
      setCount(prevCount => Math.max(MIN, prevCount - 1));

      newColorRanges.pop();

      const totalRanges = newColorRanges.length;
      const rangeSize = totalRanges > 0 ? Math.floor(maxRangeValue / totalRanges) : 0;

      newColorRanges = newColorRanges.map((range, index) => ({
        ...range,
        range: {
          from: minData + index * rangeSize,
          to: minData + (index === totalRanges - 1 ? maxRangeValue : (index + 1) * rangeSize - 1)
        }
      }));
    }

    dispatch(setColorSteps(newColorRanges));
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
        sx={{ width: '100%' }}
      >
        <OutlinedInput
          sx={{
            '& input': {
              padding: '0.3em 0.5em',
            },
          }}
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                size="small"
                onClick={() => adjustColorRanges(colorSteps, "remove")}
                edge="start"
                disabled={count === MIN}
              >
                <RemoveIcon />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => adjustColorRanges(colorSteps, "add")}
                edge="end"
                disabled={count === MAX}
              >
                <AddIcon />
              </IconButton>
            </InputAdornment>
          }
          inputProps={{
            readOnly: true,
          }}
          fullWidth
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        {colorSteps.map((rangeItem, index) => (
          <ColorStep
            key={index}
            rangeIdx={index}
            from={rangeItem.range.from.toString()}
            to={rangeItem.range.to.toString()}
            disableUpper={index === colorSteps.length - 1}
            disableLower={index === 0}
            initialColor={rangeItem.color}
          />
        ))}
      </Box>
    </Box>
  );
}
