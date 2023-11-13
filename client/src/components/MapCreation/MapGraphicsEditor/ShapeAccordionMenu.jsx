import React, { useEffect } from 'react';
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
import { Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { changeSizeByProperty } from '../../../redux-slices/mapGraphicsDataSlice';
import Slider from '@mui/material/Slider';

export default function ShapeAccordionMenu() {
  const dispatch = useDispatch();
  const { mapGraphicsType } = useSelector((state) => state.mapMetadata);
  const { propertyNames, sizeByProperty } = useSelector((state) => state.mapGraphics);

  const handleSizeByPropertyChange = (event, newValue) => {
    dispatch(changeSizeByProperty(newValue));
  };
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />} // Black expand icon
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
            <CategoryOutlinedIcon sx={{ mr: 0.5 }} /> shape
          </Box>
        </Typography>
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
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography variant="subtitle2">select shape</Typography>
            <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
            <ShapeButtonGroup />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%', display: mapGraphicsType === 'Dot Density Map' ? 'none' : 'flex' }}
          >
            <Typography variant="subtitle2">size by property</Typography>
            <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
            <Autocomplete
              value={sizeByProperty}
              onChange={handleSizeByPropertyChange}
              options={propertyNames}
              fullWidth
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            <Typography variant="subtitle2">fixed size</Typography>
            <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
            <Slider />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}