import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ColorsSymbolAccordionMenu from './ColorsSymbolAccordionMenu';
import ColorsDotDensityAccordionMenu from './ColorsDotDensityAccordionMenu';
import ColorsChoroAccordionMenu from './ColorsChoroAccordionMenu';

import { useSelector } from 'react-redux';

export default function ColorsAccordionMenu() {
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const points = useSelector((state) => state.mapGraphics.points);

  const noPointsMessage = <Typography>Please add points to start editing</Typography>;

  let accordionDetails = points.length > 0 ? <ColorsSymbolAccordionMenu /> : noPointsMessage;

  if (mapGraphicsType === 'Dot Density Map') {
    accordionDetails = <ColorsDotDensityAccordionMenu />;
  }

  if (mapGraphicsType === 'Choropleth Map') {
    accordionDetails = <ColorsChoroAccordionMenu />;
  }

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
      <AccordionDetails>{accordionDetails}</AccordionDetails>
    </Accordion>
  );
}
