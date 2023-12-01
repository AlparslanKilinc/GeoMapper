import React from 'react';
import { Box, Typography, Divider, TextField, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { setPointProperty } from '../../../../redux-slices/mapGraphicsDataSlice';

export default function SymbolEditing() {
  const dispatch = useDispatch();

  const { nameByProperty, colorByProperty, points, selectedPointKey } = useSelector(
    (state) => state.mapGraphics
  );
  const [prop, setProp] = React.useState(nameByProperty);

  console.log('selectedPointKey', selectedPointKey);

  const extractSymbolPropertyNames = () => {
    return Object.keys(Object.values(points)[0]);
  };
  let propertyNames = extractSymbolPropertyNames();

  const extractPointPropUniqueValues = () => {
    let uniqueValues = new Set();
    Object.values(points).forEach((point) => {
      uniqueValues.add(point[colorByProperty]);
    });
    return [...uniqueValues];
  };
  let selectedPropUniqueValues = extractPointPropUniqueValues();

  //   const { selectedPropUniqueValues } = useSelector((state) => state.mapStyles);

  //   const extractRegionNames = () => {
  //     let names = [];
  //     regions.forEach((region, index) => {
  //       names.push({ label: region[nameByProperty], id: index });
  //     });

  //     return names;
  //   };

  //   const regionNames = extractRegionNames();

  let pointDetails = {};
  let name = 'New York';
  let type = 'text';
  if (selectedPointKey) {
    pointDetails = points[selectedPointKey];
    name = pointDetails[nameByProperty];
    // lets check the type of the property and render the appropriate input
    if (typeof pointDetails[prop] === 'number') {
      type = 'number';
    }
  }
  const handlePropValueChange = (event) => {
    // convert event.target.value to
    dispatch(setPointProperty({ propertyName: prop, value: Number(event.target.value) }));
  };

  const handlePropValueChangeText = (event, value) => {
    dispatch(setPointProperty({ propertyName: prop, value: value }));
  };

  //   const handleOptionSelect = (event, newValue) => {
  //     dispatch(setSelectedRegionIdx(newValue.id));
  //   };

  const handleColorByPropertyChange = (event, newValue) => {
    setProp(newValue);
  };

  let inputField = (
    <TextField type={type} value={pointDetails[prop]} onChange={handlePropValueChange} fullWidth />
  );

  if (prop === colorByProperty && isNaN(pointDetails[prop])) {
    inputField = (
      <Autocomplete
        value={pointDetails[prop]}
        onChange={handlePropValueChangeText}
        options={selectedPropUniqueValues}
        fullWidth
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    );
  }

  const symbolPropertyEditor = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%' }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <Typography variant="subtitle2">{name}</Typography>
        <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <Autocomplete
          value={prop}
          onChange={handleColorByPropertyChange}
          options={propertyNames}
          fullWidth
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
        <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
        {/* depending on the type of selected property */}
        {inputField}
      </Box>
    </Box>
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ gap: 2 }}
    >
      <Autocomplete
        sx={{ width: '100%' }}
        renderInput={(params) => (
          <TextField label="Search..." variant="outlined" {...params} fullWidth />
        )}
      />
      {selectedPointKey ? (
        symbolPropertyEditor
      ) : (
        <Typography variant="subtitle2">Click on a symbol to edit</Typography>
      )}
    </Box>
  );
}
