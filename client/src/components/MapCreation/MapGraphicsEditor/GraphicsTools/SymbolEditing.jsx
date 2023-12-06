import React from 'react';
import { Box, Typography, Divider, TextField, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { setPointProperty } from '../../../../redux-slices/mapGraphicsDataSlice';
import DebouncedTextField from '../../../DebouncedElement/DebouncedTextField';

export default function SymbolEditing() {
  const dispatch = useDispatch();
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const nameByProperty = useSelector((state) => state.mapGraphics.nameByProperty);
  const colorByProperty = useSelector((state) => state.mapGraphics.colorByProperty);
  const points = useSelector((state) => state.mapGraphics.points);
  const selectedPointKey = useSelector((state) => state.mapGraphics.selectedPointKey);
  const columnTypes = useSelector((state) => state.mapGraphics.columnTypes);

  let sizeByProperty;
  if (mapGraphicsType === 'Spike Map') {
    sizeByProperty = useSelector((state) => state.mapGraphics.heightByProperty);
  } else {
    sizeByProperty = useSelector((state) => state.mapGraphics.sizeByProperty);
  }

  const [prop, setProp] = React.useState(sizeByProperty);

  const extractSymbolPropertyNames = () => {
    return points.length > 0 ? Object.keys(points[0]) : [];
  };
  let propertyNames = extractSymbolPropertyNames();

  const extractPointPropUniqueValues = () => {
    let uniqueValues = new Set();
    points.forEach((point) => {
      uniqueValues.add(point[colorByProperty]);
    });
    return [...uniqueValues];
  };
  let selectedPropUniqueValues = extractPointPropUniqueValues();

  let pointDetails = {};
  let name = 'New York';
  let type = columnTypes[prop] || 'text';
  if (selectedPointKey > -1) {
    pointDetails = points[selectedPointKey];
    name = pointDetails[nameByProperty];
    // lets check the type of the property and render the appropriate input
  }
  const handlePropValueChange = (value) => {
    // convert event.target.value to
    if (type === 'number') {
      value = Number(value);
    }
    dispatch(
      setPointProperty({
        propertyName: prop,
        value,
        pointIdx: selectedPointKey
      })
    );
  };

  const handlePropValueChangeText = (event, value) => {
    dispatch(setPointProperty({ propertyName: prop, value: value, pointIdx: selectedPointKey }));
  };

  const handleColorByPropertyChange = (event, newValue) => {
    setProp(newValue);
  };

  let key = prop + '#' + selectedPointKey;

  let inputField = (
    <DebouncedTextField
      type={type}
      value={pointDetails[prop]}
      onChange={handlePropValueChange}
      fullWidth
      key={key}
    />
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
        disabled
        sx={{ width: '100%' }}
        renderInput={(params) => (
          <TextField label="Search..." variant="outlined" {...params} fullWidth />
        )}
      />
      {selectedPointKey > -1 ? (
        symbolPropertyEditor
      ) : (
        <Typography variant="subtitle2">Click on a symbol to edit</Typography>
      )}
    </Box>
  );
}
