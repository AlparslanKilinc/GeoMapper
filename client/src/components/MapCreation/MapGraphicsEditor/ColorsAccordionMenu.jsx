import React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import {
  Autocomplete,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Slider
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { changeColorByProperty } from '../../../redux-slices/mapGraphicsDataSlice';
import { MuiColorInput } from 'mui-color-input';
import Box from '@mui/material/Box';
import ColorRange from './ColorRange';

export default function ColorsAccordionMenu() {
  const dispatch = useDispatch();

  const { propertyNames, colorByProperty } = useSelector((state) => state.mapGraphics);
  const handleColorByPropertyChange = (event, newValue) => {
    dispatch(changeColorByProperty(newValue));
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
            <PaletteOutlinedIcon sx={{ mr: 0.5 }} /> colors
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
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            <Typography variant="subtitle2">color by property</Typography>
            <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
            <Autocomplete
              value={colorByProperty}
              onChange={handleColorByPropertyChange}
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
            <Typography variant="subtitle2">steps</Typography>
            <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
            <TextField type="number" defaultValue={3} fullWidth />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            <Typography variant="subtitle2">range</Typography>
            <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
            <ColorRange
              lower="min"
              upper={100}
              disableUpper={false}
              disableLower={true}
              intialColor="#ADD8E6"
            />

            <ColorRange
              lower={101}
              upper={200}
              disableUpper={false}
              disableLower={false}
              intialColor="#0000CD"
            />

            <ColorRange
              lower={201}
              upper={'max'}
              disableUpper={true}
              disableLower={false}
              intialColor="#00008B"
            />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
