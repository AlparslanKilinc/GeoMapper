import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BorderStyleOutlinedIcon from '@mui/icons-material/BorderStyleOutlined';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { MuiColorInput } from 'mui-color-input';
import { useSelector, useDispatch } from 'react-redux';
import { changeBorderColor, changeBorderWidth } from '../../../../redux-slices/mapStylesSlice';
import SubMenuTitle from '../SubMenuTitle';
import DebouncedSlider from '../../../DebouncedElement/DebouncedSlider';
import DebouncedColorInput from '../../../DebouncedElement/DebouncedColorInput';
import { addActionToPast } from '../../../../redux-slices/undoRedoSlice';
import { Slider } from '@mui/material';

export default function BorderAccordionMenu() {
  const dispatch = useDispatch();
  const { borderColor, borderWidth } = useSelector((state) => state.mapStyles);

  const handleBorderColorChange = (color) => {
    dispatch(addActionToPast({
      undoActions: [{ actionCreator: changeBorderColor, args: [borderColor] }],
      redoActions: [{ actionCreator: changeBorderColor, args: [color] }]
    }));
    dispatch(changeBorderColor(color));
  };

  const handleChangeBorderWidth = (newValue) => {
    dispatch(addActionToPast({
      undoActions: [{ actionCreator: changeBorderWidth, args: [borderWidth] }],
      redoActions: [{ actionCreator: changeBorderWidth, args: [newValue] }]
    }));
    dispatch(changeBorderWidth(newValue));
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
            <BorderStyleOutlinedIcon sx={{ mr: 0.5 }} /> borders
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
            <Typography variant="subtitle2">border color</Typography>
            <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
            <DebouncedColorInput
              format="hex"
              value={borderColor}
              onChange={handleBorderColorChange}
            />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            <SubMenuTitle title="border width" />
            <DebouncedSlider
              min={0}
              max={10}
              step={0.1}
              value={borderWidth}
              onChange={handleChangeBorderWidth}
              style={{ width: '100%' }}
            />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
