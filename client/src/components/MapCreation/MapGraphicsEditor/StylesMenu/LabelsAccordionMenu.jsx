import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TitleIcon from '@mui/icons-material/Title';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import PropertySelector from '../../MapDataEditing/PropertySelector';

export default function LabelsAccordionMenu() {
  const labelByProperty = useSelector((state) => state.mapGraphics.labelByProperty);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />} // Black expand icon
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
            <TitleIcon sx={{ mr: 0.5 }} /> labels
          </Box>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ gap: 2 }}
        >
          <PropertySelector propertyName="label" value={labelByProperty} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
