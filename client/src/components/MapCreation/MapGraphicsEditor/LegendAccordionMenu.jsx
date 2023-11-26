import * as React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore.js";
import Box from "@mui/material/Box";
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from "@mui/material/Divider";
import {useDispatch, useSelector} from "react-redux";
import {changeOrientation, changeBackgroundColor, changeFontColor} from "../../../redux-slices/legendSlice.js";
import {useEffect} from "react";
import { MuiColorInput } from 'mui-color-input';



export default function LegendAccordionMenu () {
    const [value, setValue] = React.useState('vertical');
    const [color, setColor] = React.useState('#ffffff')
    const [fontColor, setFontColor] = React.useState('black')
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeOrientation(value));
        dispatch(changeBackgroundColor(color))
        dispatch(changeFontColor(fontColor));
    }, [value, color, dispatch, fontColor]);


    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleBackgroundColorChange = (color) => {
       setColor(color)
    }

    const handleFontColorChange = (fontColor) => {
        setFontColor(fontColor)
    }

    return(
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
                <Typography variant="subtitle2" sx= {{ml: '45px'}}>orientation</Typography>
                <Divider style={{ margin: '10px 0', width: '100%', height: 1 }}/>
                <FormControl>
                    <FormLabel id = "legend-orientation"/>
                    <RadioGroup
                        aria-labelledby="legend-orientation-radio-buttons"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}>
                        <FormControlLabel value="vertical" control={<Radio />} label="vertical" />
                        <FormControlLabel value="horizontal" control={<Radio />} label="horizontal" />
                    </RadioGroup>
                </FormControl>
                <Typography variant="subtitle2" sx= {{ml: '20px', mt: '20px'}}>background color</Typography>
                <Divider style={{ margin: '10px 0', width: '100%', height: 1 }}/>
                <MuiColorInput format="hex" value={color} onChange={handleBackgroundColorChange} />
                <Typography variant="subtitle2" sx= {{ml: '40px',  mt: '20px'}}>font color</Typography>
                <Divider style={{ margin: '10px 0', width: '100%', height: 1 }}/>
                <MuiColorInput format="hex" value={fontColor} onChange={handleFontColorChange} />

            </AccordionDetails>
        </Accordion>
    );
}