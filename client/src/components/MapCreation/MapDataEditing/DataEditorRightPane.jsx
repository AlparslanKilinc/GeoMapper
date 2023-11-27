import React from 'react';
import '../../../styles/mapDataEditingPage.css';
import { LoadingButton } from '@mui/lab';
import { Divider, Box, Typography } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useSelector } from 'react-redux';
import PropertySelector from './PropertySelector';

export default function DataEditorRightPane() {
  const { nameByProperty, colorByProperty } = useSelector((state) => state.mapGraphics);

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

  const handleCheck = () => {
    console.log('check');
  };

  return (
    <div id="data-editing-page-right">
      <div className="header-primary">
        <h2>match</h2>
        <Divider style={{ width: '50%' }} />
      </div>
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
        {propertySelectors}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '0.5em', fontSize: '0.8em' }}>
        <ReportProblemIcon color="action" />
        <Typography variant="body2" className="normalText">
          You can set number and text columns using the menu in the column header. A red cell
          indicates missing data or a problem that needs to be fixed.
        </Typography>
      </Box>
      <LoadingButton
        variant="outlined"
        style={{ color: 'black', borderColor: 'black' }}
        onClick={handleCheck}
      >
        check
      </LoadingButton>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '0.5em', fontSize: '0.8em' }}>
        <Typography variant="body2" className="normalText" color="#40e0d0">
          √ All map regions were matched!
        </Typography>
      </Box>
    </div>
  );
}
