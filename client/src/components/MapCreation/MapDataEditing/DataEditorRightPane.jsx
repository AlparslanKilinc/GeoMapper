import React, { useEffect, useState } from 'react';
import '../../../styles/mapDataEditingPage.css';
import { Divider, Box, Typography } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { TextField, Autocomplete } from '@mui/material';
import { changeXByProperty } from '../../../redux-slices/mapGraphicsDataSlice';
import { useSelector, useDispatch } from 'react-redux';
import PropertySelector from './PropertySelector';
import DotDensityPropertySelector from '../MapGraphicsEditor/StylesMenu/ColorsAccordion/DotDensityPropertySelector';

export default function DataEditorRightPane() {
  const {
    nameByProperty,
    dotDensityByProperty,
    colorByProperty,
    sizeByProperty,
    heightByProperty,
    latByProperty,
    lonByProperty,
    validationMessage,
    propertyNames,
    columnTypes
  } = useSelector((state) => state.mapGraphics);
  const dispatch = useDispatch();
  const { mapGraphicsType } = useSelector((state) => state.mapMetadata);
  const [properties, setProperties] = useState([]);
  const [dotDensityByPropertyOptions, setDotDensityByPropertyOptions] = useState([]);

  let name = { propertyName: 'name', value: nameByProperty };
  let color = { propertyName: 'color', value: colorByProperty };
  let longitude = { propertyName: 'lon', value: lonByProperty };
  let latitude = { propertyName: 'lat', value: latByProperty };
  let size = { propertyName: 'size', value: sizeByProperty };
  let height = { propertyName: 'height', value: heightByProperty };

  useEffect(() => {
    switch (mapGraphicsType) {
      case 'Choropleth Map':
      case 'Heat Map':
        setProperties([name, color]);
        break;
      case 'Symbol Map':
        setProperties([name, color, longitude, latitude, size]);
        break;
      case 'Spike Map':
        setProperties([name, color, longitude, latitude, height]);
        break;
      case 'Dot Density Map':
        setProperties([name]);
        break;
    }
  }, [
    mapGraphicsType,
    nameByProperty,
    colorByProperty,
    latByProperty,
    lonByProperty,
    sizeByProperty,
    heightByProperty
  ]);

  useEffect(() => {
    setDotDensityByPropertyOptions(
      propertyNames.filter((property) => {
        return columnTypes[property] === 'number';
      })
    );
  }, [columnTypes, nameByProperty, dispatch, propertyNames]);

  let propertySelectors = properties.map((selectorConfig) => {
    return (
      <PropertySelector
        key={selectorConfig.propertyName}
        propertyName={selectorConfig.propertyName}
        value={selectorConfig.value}
      />
    );
  });

  return (
    <div id="data-editing-page-right">
      <div className="header-primary">
        <h2>match</h2>
        <Divider style={{ width: '50%' }} />
      </div>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '0.5em'
        }}
      >
        {propertySelectors}
        {mapGraphicsType === 'Dot Density Map' && (
          <>
            <DotDensityPropertySelector />
          </>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0.5em',
          fontSize: '0.8em'
        }}
      >
        <ReportProblemIcon color="action" />
        <Typography
          variant="outlined"
          style={{ color: 'black', borderColor: 'black', fontWeight: 'bold' }}
        >
          Data Check
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '0.5em', fontSize: '0.8em' }}>
        <Typography
          variant="body2"
          className="normalText"
          color={
            validationMessage.startsWith('X')
              ? 'red'
              : validationMessage.startsWith('⚠️')
              ? '#DAA520'
              : '#40e0d0'
          }
        >
          {validationMessage}
        </Typography>
      </Box>
    </div>
  );
}
