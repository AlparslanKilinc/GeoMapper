import React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ColorsSymbolAccordionMenu from './ColorsSymbolAccordionMenu';
import ColorsDotDensityAccordionMenu from './ColorsDotDensityAccordionMenu';
import { useSelector } from 'react-redux';

export default function ColorsAccordionMenu() {
  const { mapGraphicsType } = useSelector((state) => state.mapMetadata);
  let accordionDetails = <ColorsSymbolAccordionMenu />;

  if (mapGraphicsType === 'Dot Density Map') {
    accordionDetails = <ColorsDotDensityAccordionMenu />;
  }

  return (
    <Accordion>
      <AccordionSummary className = "styles-buttons"
        expandIcon={<ExpandMoreIcon />} // Black expand icon
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          <Box className = "dark-mode-labels" component="span" sx={{ display: 'flex', alignItems: 'center' }}>
            <PaletteOutlinedIcon sx={{ mr: 0.5 }}/> colors
          </Box>
        </Typography>
        {/* Emoji included */}
      </AccordionSummary>
      <AccordionDetails className = "color-symbol-accordian-menu">{accordionDetails}</AccordionDetails>
    </Accordion>
  );
}
