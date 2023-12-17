import React, { useState, useEffect } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import ColorStep from './ColorStep';
import { setColorSteps, setContinousColorScale } from '../../../../../redux-slices/mapStylesSlice';
import * as d3 from 'd3';
import { addActionToPast } from '../../../../../redux-slices/undoRedoSlice';

export default function ColorSteps() {
  const dispatch = useDispatch();
  const colorSteps = useSelector((state) => state.mapStyles.colorSteps);
  const MIN = 3;
  const MAX = 7;
  const regions = useSelector((state) => state.mapGraphics.regions);
  const colorByProperty = useSelector((state) => state.mapGraphics.colorByProperty);
  const data = regions.map((region) => region[colorByProperty]);
  useEffect(() => {
    const minData = Math.round(d3.min(data));
    const maxData = Math.round(d3.max(data));
    const range = maxData - minData;

    if (colorSteps.length === 0) {
      const step = Math.round(range / 3);
      dispatch(setColorSteps([
        {
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
        }
      ]));
    } else {
      const totalSteps = colorSteps.length;
      const newColorSteps = colorSteps.map((step, index) => {
        const from = Math.round(minData + (range / totalSteps) * index);
        const to = index === totalSteps - 1 ? maxData : Math.round(minData + (range / totalSteps) * (index + 1) - 1);

        return {
          ...step,
          range: { from, to }
        };
      });
      dispatch(setColorSteps(newColorSteps));
    }
  }, []);


  function mapColorStepsToData() {
    function getColorFromValue(value) {
      const colorStep = colorSteps.find(rangeItem =>
        value >= rangeItem.range.from && value <= rangeItem.range.to
      );

      return colorStep ? colorStep.color : '#FFFFFF';
    }

    const mappedColors = data.map(getColorFromValue);
    dispatch(setContinousColorScale(mappedColors));
  }

  useEffect(() => {
    mapColorStepsToData();
  }, [colorSteps]);

  useEffect(() => {
    if (colorSteps.length === 0) return;

    const newColorSteps = [...colorSteps];
    const lastStepIndex = newColorSteps.length - 1;
    newColorSteps[lastStepIndex] = {
      ...newColorSteps[lastStepIndex],
      range: {
        ...newColorSteps[lastStepIndex].range,
        to: d3.max(data)
      }
    };

    dispatch(setColorSteps(newColorSteps));
  }, [d3.max(data)]);

  useEffect(() => {
    if (colorSteps.length === 0) return;

    const newColorSteps = [...colorSteps];
    newColorSteps[0] = {
      ...newColorSteps[0],
      range: {
        ...newColorSteps[0].range,
        from: d3.min(data)
      }
    };

    dispatch(setColorSteps(newColorSteps));
  }, [d3.min(data)]);

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
    const minData = parseInt(d3.min(data));
    const maxData = parseInt(d3.max(data));
    const maxRangeValue = maxData - minData;

    if (action === 'add') {
      if (colorSteps.length >= MAX) {
        return;
      }
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
      if (colorSteps.length <= MIN) {
        return;
      }

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

    dispatch(addActionToPast({
      undoActions: [{ actionCreator: setColorSteps, args: [colorSteps] }],
      redoActions: [{ actionCreator: setColorSteps, args: [newColorRanges] }]
    }));
    dispatch(setColorSteps(newColorRanges));
  }

  function handleRemoveBtnOnclick() {
    adjustColorRanges(colorSteps, "remove");
  }

  function handleAddBtnOnclick() {
    adjustColorRanges(colorSteps, "add");
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ gap: 2 }}
      key={JSON.stringify({ colorSteps })}
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
          value={colorSteps.length}
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                size="small"
                onClick={handleRemoveBtnOnclick}
                edge="start"
                disabled={colorSteps.length === MIN}
              >
                <RemoveIcon />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleAddBtnOnclick}
                edge="end"
                disabled={colorSteps.length === MAX}
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
            from={rangeItem.range.from ? rangeItem.range.from.toString() : '0'}
            to={rangeItem.range.to ? rangeItem.range.to.toString() : '0'}
            disableUpper={index === colorSteps.length - 1}
            disableLower={index === 0}
          />
        ))}
      </Box>
    </Box>
  );
}
