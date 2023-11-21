import React from 'react';
import { Box, Typography, Divider, TextField, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeColorByProperty,
  setRegionProperty
} from '../../../redux-slices/mapGraphicsDataSlice';
import { setSelectedPropUniqueValues } from '../../../redux-slices/mapStylesSlice';
export default function RegionEditing() {
  const dispatch = useDispatch();

  const { propertyNames, selectedRegionIdx, regions, nameByProperty, colorByProperty } =
    useSelector((state) => state.mapGraphics);
  const [prop, setProp] = React.useState(nameByProperty);

  const { selectedPropUniqueValues, selectedFeature, colors } = useSelector(
    (state) => state.mapStyles
  );

  let regionDetails = {};
  let name = 'New York';
  let type = 'text';
  let isRegionSelected = selectedRegionIdx > -1;
  if (isRegionSelected) {
    regionDetails = regions[selectedRegionIdx];
    name = regionDetails[nameByProperty];
    // lets check the type of the property and render the appropriate input
    if (typeof regionDetails[prop] === 'number') {
      type = 'number';
    }
  }
  const handlePropValueChange = (event) => {
    dispatch(setRegionProperty({ propertyName: prop, value: event.target.value }));
  };

  const handlePropValueChangeText = (event, value) => {
    dispatch(setRegionProperty({ propertyName: prop, value: value }));
    // find the color for the region by the colorByProperty inside colors array
    let color = colors.find((color) => color.name === value);
    selectedFeature.setStyle({ fillColor: color.color });
  };

  const handleColorByPropertyChange = (event, newValue) => {
    setProp(newValue);
  };

  let inputField = (
    <TextField type={type} value={regionDetails[prop]} onChange={handlePropValueChange} fullWidth />
  );

  if (prop === colorByProperty) {
    inputField = (
      <Autocomplete
        value={regionDetails[prop]}
        onChange={handlePropValueChangeText}
        options={selectedPropUniqueValues}
        fullWidth
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    );
  }

  const regionPropertyEditor = (
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
      <TextField variant="outlined" placeholder="Search..." sx={{ width: '100%' }} />
      {isRegionSelected ? (
        regionPropertyEditor
      ) : (
        <Typography variant="subtitle2">Click on a region to edit</Typography>
      )}
    </Box>
  );
}
