import React, { useEffect } from 'react';
import '../../../styles/mapDataEditingPage.css';
import { Divider, Box, Typography } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useSelector } from 'react-redux';
import PropertySelector from './PropertySelector';

export default function DataEditorRightPane() {
  const { nameByProperty, colorByProperty, validationMessage } = useSelector(
    (state) => state.mapGraphics
  );

  let name = {
    propertyName: 'name',
    value: nameByProperty
  };

  let color = {
    propertyName: 'color',
    value: colorByProperty
  };

  let properties = [name, color];

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
              : validationMessage.startsWith('\u26A0')
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
