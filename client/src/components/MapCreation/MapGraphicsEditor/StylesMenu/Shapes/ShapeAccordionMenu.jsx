import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import ShapeButtonGroup from './ShapeButtonGroup';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Divider, Switch } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeSizeByProperty,
  changeHeightByProperty
} from '../../../../../redux-slices/mapGraphicsDataSlice';
import Slider from '@mui/material/Slider';
import { setFixedSymbolSize } from '../../../../../redux-slices/mapGraphicsDataSlice';
import { toggleAddSymbolMode } from '../../../../../redux-slices/mapGraphicsDataSlice';
import { FormControlLabel } from '@mui/material';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import GrainIcon from '@mui/icons-material/Grain';
import {
  setMaxSymbolSize,
  setMinSymbolSize
} from '../../../../../redux-slices/mapGraphicsDataSlice';
import SubMenuTitle from '../../SubMenuTitle';
import DebouncedSlider from '../../../../DebouncedElement/DebouncedSlider';

const SliderTextField = ({ value, onChange }) => {
  // Handling change from Slider
  const handleSliderChange = (newValue) => {
    onChange(newValue);
  };

  // Handling change from TextField
  const handleTextFieldChange = (event) => {
    // Convert string value to number and use null as the event
    const newValue = Number(event.target.value);
    onChange(null, newValue);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%', gap: 2 }}
    >
      <DebouncedSlider
        value={typeof value === 'number' ? value : 0}
        onChange={handleSliderChange}
        max={600}
      />
      <TextField
        value={value}
        onChange={handleTextFieldChange}
        type="number"
        // size="small"
        variant="outlined"
      // sx={{ width: 60, mr: 1 }}
      />
    </Box>
  );
};

export default function ShapeAccordionMenu() {
  const dispatch = useDispatch();
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const fixedSymbolSize = useSelector((state) => state.mapStyles.fixedSymbolSize);
  const pointProperties = useSelector((state) => state.mapGraphics.pointProperties);
  const addSymbolMode = useSelector((state) => state.mapGraphics.addSymbolMode);
  const maxSymbolSize = useSelector((state) => state.mapGraphics.maxSymbolSize);
  const minSymbolSize = useSelector((state) => state.mapGraphics.minSymbolSize);

  let sizeByProperty;
  if (mapGraphicsType === 'Spike Map') {
    sizeByProperty = useSelector((state) => state.mapGraphics.heightByProperty);
  } else {
    sizeByProperty = useSelector((state) => state.mapGraphics.sizeByProperty);
  }

  const getMapTypeTitle = (mapGraphicsType) => {
    switch (mapGraphicsType) {
      case 'Symbol Map':
        return (
          <Typography>
            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
              <CategoryOutlinedIcon sx={{ mr: 0.5 }} /> shape
            </Box>
          </Typography>
        );
      case 'Spike Map':
        return (
          <Typography>
            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
              <LandscapeOutlinedIcon sx={{ mr: 0.5 }} /> spike
            </Box>
          </Typography>
        );
      case 'Dot Density Map':
        return (
          <Typography>
            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
              <GrainIcon sx={{ mr: 0.5 }} /> dots
            </Box>
          </Typography>
        );
      default:
        return null;
    }
  };

  const handleMaxSymbolSizeChange = (newValue) => {
    dispatch(setMaxSymbolSize(Number(newValue)));
  };

  const handleSizeByPropertyChange = (event, newValue) => {
    if (mapGraphicsType === 'Spike Map') {
      dispatch(changeHeightByProperty(newValue));
    } else {
      dispatch(changeSizeByProperty(newValue));
    }
  };

  const handleSymbolSizeChange = (newValue) => {
    dispatch(setFixedSymbolSize(newValue));
  };

  const fixedSymbolSizeSlider = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%' }}
    >
      <SubMenuTitle title={mapGraphicsType === 'Spike Map' ? 'fixed height' : 'fixed size'} />
      <DebouncedSlider value={fixedSymbolSize} onChange={handleSymbolSizeChange} />
    </Box>
  );

  const maxSymbolSizeSlider = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%' }}
    >
      <Typography variant="subtitle2">
        {mapGraphicsType === 'Spike Map' ? 'max height' : 'max size'}
      </Typography>
      <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
      <SliderTextField value={maxSymbolSize} onChange={handleMaxSymbolSizeChange} />
    </Box>
  );

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />} // Black expand icon
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {getMapTypeTitle(mapGraphicsType)}
        {/* Emoji included */}
      </AccordionSummary>
      <AccordionDetails>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ gap: 2 }}
        >
          {mapGraphicsType !== 'Spike Map' && (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Typography variant="subtitle2">select shape</Typography>
              <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
              <ShapeButtonGroup />
            </Box>
          )}

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%', display: mapGraphicsType === 'Dot Density Map' ? 'none' : 'flex' }}
          >
            <Typography variant="subtitle2">
              {mapGraphicsType === 'Spike Map' ? 'height by property' : 'size by property'}
            </Typography>
            <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
            <Autocomplete
              value={sizeByProperty}
              onChange={handleSizeByPropertyChange}
              options={pointProperties}
              fullWidth
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>

          {sizeByProperty ? maxSymbolSizeSlider : fixedSymbolSizeSlider}

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ gap: 2 }}
          >
            <SubMenuTitle
              title={mapGraphicsType === 'Spike Map' ? 'add spike mode' : 'add symbol mode'}
            />
            <FormControlLabel
              key={String(addSymbolMode)}
              control={
                <Switch checked={addSymbolMode} onChange={(e) => dispatch(toggleAddSymbolMode())} />
              }
              label={mapGraphicsType === 'Spike Map' ? 'add spike mode' : 'add symbol mode'}
            />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
