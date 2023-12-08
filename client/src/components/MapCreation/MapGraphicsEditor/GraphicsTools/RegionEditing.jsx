import React from 'react';
import { Box, Typography, Divider, TextField, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  setRegionProperty,
  setSelectedRegionIdx
} from '../../../../redux-slices/mapGraphicsDataSlice';
import DebouncedTextField from '../../../DebouncedElement/DebouncedTextField';
import LabelStylesEditor from '../StylesMenu/LabelStylesEditor';
import SubMenuTitle from '../SubMenuTitle';

export default function RegionEditing() {
  const dispatch = useDispatch();

  const propertyNames = useSelector((state) => state.mapGraphics.propertyNames);
  const selectedRegionIdx = useSelector((state) => state.mapGraphics.selectedRegionIdx);
  const regions = useSelector((state) => state.mapGraphics.regions);
  const nameByProperty = useSelector((state) => state.mapGraphics.nameByProperty);
  const colorByProperty = useSelector((state) => state.mapGraphics.colorByProperty);
  const dotDensityByProperty = useSelector((state) => state.mapGraphics.dotDensityByProperty);
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const columnTypes = useSelector((state) => state.mapGraphics.columnTypes);
  const labelByProperty = useSelector((state) => state.mapGraphics.labelByProperty);

  // This will break if dotDesnityByProperty is empty

  const defaultDotDensityProperty = dotDensityByProperty[0] || nameByProperty;
  const defaultProperty =
    mapGraphicsType === 'Choropleth Map' || mapGraphicsType === 'Heat Map'
      ? colorByProperty
      : defaultDotDensityProperty;

  const [prop, setProp] = React.useState(defaultProperty);

  const { selectedPropUniqueValues } = useSelector((state) => state.mapStyles);

  const extractRegionNames = () => {
    let names = [];
    regions.forEach((region, index) => {
      names.push({ label: region[nameByProperty], id: index });
    });

    return names;
  };

  const regionNames = extractRegionNames();

  let regionDetails = {};
  let name = 'New York';
  let type = columnTypes[prop] || 'text';
  let isRegionSelected = selectedRegionIdx > -1;
  if (isRegionSelected) {
    regionDetails = regions[selectedRegionIdx];
    name = regionDetails[nameByProperty];
  }
  const handlePropValueChange = (value) => {
    // convert event.target.value to
    if (type === 'number') {
      value = Number(value);
    }
    dispatch(setRegionProperty({ propertyName: prop, value }));
  };

  const handlePropValueChangeText = (event, value) => {
    dispatch(setRegionProperty({ propertyName: prop, value: value }));
  };

  const handleOptionSelect = (event, newValue) => {
    dispatch(setSelectedRegionIdx(newValue.id));
  };

  const handleColorByPropertyChange = (event, newValue) => {
    setProp(newValue);
  };

  let key = prop + '#' + selectedRegionIdx;

  let inputField = (
    <DebouncedTextField
      type={type}
      value={regionDetails[prop]}
      onChange={handlePropValueChange}
      fullWidth
      key={key}
    />
  );

  if (prop === colorByProperty && isNaN(regionDetails[prop])) {
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
      <Box sx={{ marginTop: 2 }}>
        {labelByProperty && <LabelStylesEditor idx={selectedRegionIdx} />}
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
        options={regionNames}
        onChange={handleOptionSelect}
        renderInput={(params) => (
          <TextField label="Search..." variant="outlined" {...params} fullWidth />
        )}
      />
      {isRegionSelected ? (
        regionPropertyEditor
      ) : (
        <Typography variant="subtitle2">Click on a region to edit</Typography>
      )}
    </Box>
  );
}
