import React, { useState, useEffect } from 'react';
import { Autocomplete, Divider, Typography, TextField, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeXByProperty,
  TableValidation,
  validateColumnData
} from '../../../redux-slices/mapGraphicsDataSlice';

export default function PropertySelector({ value, propertyName }) {
  let { propertyNames, pointProperties, columnTypes } = useSelector((state) => state.mapGraphics);
  let mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const defaultProperties = propertyName === 'label' ? propertyNames : [];
  const [properties, setProperties] = useState(defaultProperties);
  const [colName, setColName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // Filtering Selections depending on propertyName for each type of map
    if (propertyName === 'label') {
      setProperties(propertyNames);
      return;
    }
    let selections = [];
    if (
      (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') &&
      propertyName !== 'label'
    ) {
      // Point Properties Filtering
      if (propertyName === 'name') {
        selections = pointProperties;
      }
      if (propertyName === 'color') {
        selections = pointProperties.filter((property) => columnTypes[property] === 'text');
      }
      if (
        propertyName === 'size' ||
        propertyName === 'height' ||
        propertyName === 'lat' ||
        propertyName === 'lon'
      ) {
        selections = pointProperties.filter((property) => columnTypes[property] === 'number');
      }
      if (selections.length === 0) {
        selections = pointProperties;
      }
      setProperties(selections);
    } else {
      /// Region Data Selection Filtering
      if (mapGraphicsType === 'Choropleth Map') {
        if (propertyName === 'name') {
          selections = propertyNames;
        }
        if (propertyName === 'color') {
          selections = propertyNames.filter((property) => columnTypes[property] === 'text');
        }
      }
      if (mapGraphicsType === 'Heat Map') {
        if (propertyName === 'name') {
          selections = propertyNames;
        }
        if (propertyName === 'color') {
          selections = propertyNames.filter((property) => columnTypes[property] === 'number');
        }
      }
      setProperties(selections);
    }
  }, [mapGraphicsType, propertyNames, pointProperties, columnTypes]);

  useEffect(() => {
    if (columnTypes[colName]) {
      dispatch(
        validateColumnData({
          columnName: colName,
          columnType: columnTypes[colName],
          mapGraphicsType
        })
      );
      dispatch(TableValidation(mapGraphicsType));
    }
  }, [columnTypes, colName, mapGraphicsType, dispatch]);

  const onChange = (event, newValue) => {
    const payload = {
      property: propertyName + 'ByProperty',
      propertyBy: newValue
    };
    setColName(newValue);
    dispatch(changeXByProperty(payload));
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%' }}
    >
      <Typography variant="subtitle2">{propertyName} by property</Typography>
      <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
      <Autocomplete
        fullWidth
        value={value}
        onChange={onChange}
        options={properties}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
      />
    </Box>
  );
}
