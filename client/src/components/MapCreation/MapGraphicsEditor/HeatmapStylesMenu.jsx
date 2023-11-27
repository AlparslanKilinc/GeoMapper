import React from 'react';
import {
    Paper,
    Typography,
    Slider,
    Switch,
    Button,
    FormGroup,
    FormControlLabel,
    Box,
    TextField
} from '@mui/material';
import HeatmapColorRange from './StylesMenu/ColorsAccordion/HeatmapColorRange';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function HeatmapStylesMenu() {
    const [state, setState] = React.useState({
        checkedA: true,
        opacity: 50,
        smoothing: 25,
        threshold: 200,
    });

    const handleSliderChange = (event, newValue) => {
        setState({ ...state, [event.target.name]: newValue });
    };

    const handleTextFieldChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleSwitchChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <Paper gap={1}>
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={state.checkedA} onChange={handleSwitchChange} name="checkedA" />}
                    label="Display Markers"
                />
            </FormGroup>

            <Box display="flex" flexDirection="column" >
                <Typography variant="h6" sx={{ fontSize: '1em', }} id="opacity-slider" gutterBottom>
                    Opacity
                </Typography>
                <Box display="flex" flexDirection="row" gap={1}>
                    <Slider value={state.opacity} onChange={handleSliderChange} aria-labelledby="opacity-slider" name="opacity" />
                    <Typography>{state.opacity}%</Typography>
                </Box>
            </Box>

            <Box display="flex" flexDirection="column" >
                <Typography variant="h6" sx={{ fontSize: '1em', }} id="opacity-slider" gutterBottom>
                    Smoothing
                </Typography>
                <Box display="flex" flexDirection="row" gap={1}>
                    <Slider value={state.smoothing} onChange={handleSliderChange} aria-labelledby="opacity-slider" name="smoothing" />
                    <Typography>{state.smoothing}%</Typography>
                </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h6" sx={{ fontSize: '1em', }} id="threshold-textfield" gutterBottom>
                    Threshold
                </Typography>
                <TextField
                    value={state.threshold}
                    onChange={handleTextFieldChange}
                    name="threshold"
                    type="number"
                    sx={{
                        '& input': {
                            padding: '0.3em 0.5em',
                        },
                    }}
                    inputProps={{ step: 1, min: 0, max: 1000, 'aria-labelledby': 'threshold-textfield' }}
                />
            </Box>

            <Typography variant="h6" sx={{ fontSize: '1em', }}>Gradient</Typography>

            <HeatmapColorRange
                intialColor="blue"
                text="LIGHT"
                number={0}
            />

            <HeatmapColorRange
                intialColor="green"
                text="MEDIUM"
                number={500}
            />

            <HeatmapColorRange
                intialColor="red"
                text="DENSE"
                number={1000}
            />

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
                <Button startIcon={<AutoAwesomeIcon />} variant="contained" color="primary">
                    Visualize
                </Button>
            </div>
        </Paper>
    );
}
