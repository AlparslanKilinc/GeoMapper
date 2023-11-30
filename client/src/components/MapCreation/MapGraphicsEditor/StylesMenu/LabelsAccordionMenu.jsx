import React, {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TitleIcon from '@mui/icons-material/Title';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { changeBorderColor, changeBorderWidth } from '../../../../redux-slices/mapStylesSlice';
import SubMenuTitle from '../SubMenuTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {
  toggleLabelVisibility,
  setLabelByProperty,
    clearLabels
} from '../../../../redux-slices/mapGraphicsDataSlice';
import PropertySelector from '../../MapDataEditing/PropertySelector';

export default function LabelsAccordionMenu() {
  const dispatch = useDispatch();
  const labelByProperty = useSelector((state) => state.mapGraphics.labelByProperty);
  const isLabelVisible = useSelector((state) => state.mapGraphics.isLabelVisible);
  const[labelsFlag, setLabelsFlag] = useState(true)


  const handleLabelSwitchChange = () => {
    dispatch(toggleLabelVisibility());
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
          <PropertySelector propertyName="label" value={labelByProperty} isLabel = {labelsFlag}/>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            <SubMenuTitle title="label visibility" />
            <FormControlLabel
              control={<Switch value={isLabelVisible} onChange={handleLabelSwitchChange}/>}
              label="Labels"
            />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
