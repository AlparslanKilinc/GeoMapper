import React, { useEffect, useState } from 'react';
import '../../../styles/mapDataEditingPage.css';
import { Divider, Box, Typography } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useSelector } from 'react-redux';
import PropertySelector from './PropertySelector';

export default function DataEditorRightPane() {
  const {
    nameByProperty,
    densityByProperty,
    colorByProperty,
    sizeByProperty,
    heightByProperty,
    LatByProperty,
    LonByProperty,
    validationMessage
  } = useSelector((state) => state.mapGraphics);
  const { mapGraphicsType } = useSelector((state) => state.mapMetadata);
  const [properties, setProperties] = useState([]);
  let name = { propertyName: 'name', value: nameByProperty };
  let color = { propertyName: 'color', value: colorByProperty };
  let longitude = { propertyName: 'lon', value: LonByProperty };
  let latitude = { propertyName: 'lat', value: LatByProperty };
  let size = { propertyName: 'size', value: sizeByProperty };
  let height = { propertyName: 'height', value: heightByProperty };
  let density = { propertyName: 'density', value: densityByProperty };

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
    LatByProperty,
    LonByProperty,
    sizeByProperty,
    heightByProperty
  ]);

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
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
        {propertySelectors}
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
