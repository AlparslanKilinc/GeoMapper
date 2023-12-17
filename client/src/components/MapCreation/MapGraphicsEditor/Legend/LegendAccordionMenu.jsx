import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore.js";
import Box from "@mui/material/Box";
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { changeLegendOrientation, changeLegendBackgroundColor, changeLegendFontColor } from "../../../../redux-slices/mapStylesSlice.js";
import DebouncedColorInput from '../../../DebouncedElement/DebouncedColorInput';
import { addActionToPast } from '../../../../redux-slices/undoRedoSlice';

export default function LegendAccordionMenu() {
    const orientation = useSelector((state) => state.mapStyles.orientation);
    const bgColor = useSelector((state) => state.mapStyles.bgColor);
    const fontColor = useSelector((state) => state.mapStyles.fontColor);

    const dispatch = useDispatch();

    const handleOrientationChange = (event) => {
        dispatch(addActionToPast({
            undoActions: [{ actionCreator: changeLegendOrientation, args: [orientation] }],
            redoActions: [{ actionCreator: changeLegendOrientation, args: [event.target.value] }]
        }));
        dispatch(changeLegendOrientation(event.target.value));
    };

    const handleBackgroundColorChange = (color) => {
        dispatch(addActionToPast({
            undoActions: [{ actionCreator: changeLegendBackgroundColor, args: [bgColor] }],
            redoActions: [{ actionCreator: changeLegendBackgroundColor, args: [color] }]
        }));
        dispatch(changeLegendBackgroundColor(color));
    }

    const handleFontColorChange = (newFontColor) => {
        dispatch(addActionToPast({
            undoActions: [{ actionCreator: changeLegendFontColor, args: [fontColor] }],
            redoActions: [{ actionCreator: changeLegendFontColor, args: [newFontColor] }]
        }));
        dispatch(changeLegendFontColor(newFontColor));
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
                        <LegendToggleIcon sx={{ mr: 0.5 }} /> legend
                    </Box>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="subtitle2" sx={{ ml: '45px' }}>orientation</Typography>
                <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
                <FormControl>
                    <FormLabel id="legend-orientation" />
                    <RadioGroup
                        aria-labelledby="legend-orientation-radio-buttons"
                        name="controlled-radio-buttons-group"
                        value={orientation}
                        onChange={handleOrientationChange}>
                        <FormControlLabel value="vertical" control={<Radio />} label="vertical" />
                        <FormControlLabel value="horizontal" control={<Radio />} label="horizontal" />
                    </RadioGroup>
                </FormControl>
                <Typography variant="subtitle2" sx={{ ml: '20px', mt: '20px' }}>background color</Typography>
                <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
                <DebouncedColorInput format="hex" value={bgColor} onChange={handleBackgroundColorChange} />
                <Typography variant="subtitle2" sx={{ ml: '40px', mt: '20px' }}>font color</Typography>
                <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
                <DebouncedColorInput format="hex" value={fontColor} onChange={handleFontColorChange} />
            </AccordionDetails>
        </Accordion>
    );
}