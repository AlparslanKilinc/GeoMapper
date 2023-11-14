import React from 'react';
import {
    Typography,
    Box,
    TextField
} from '@mui/material';
import { MuiColorInput } from 'mui-color-input';

const HeatmapColorRange = ({ intialColor, text, number }) => {
    const [color, setColor] = React.useState(intialColor);

    const handleColorChange = (color) => {
        setColor(color);
    };

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap={1}
        >
            <MuiColorInput
                value={color}
                onChange={handleColorChange}
                inputProps={{ style: { width: '0', border: 'none' } }}
                sx={{
                    width: '30%',
                    height: '30%',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        },
                    },
                }}
            />
            <Typography sx={{ fontSize: '0.8em', }}>
                {text}
            </Typography>
            <TextField
                value={number}
                type="number"
                sx={{
                    '& input': {
                        padding: '0.3em 0.5em',
                    },
                }}
                inputProps={{ step: 1, min: 0, max: 1000 }}
            />
        </Box>
    );
};

export default HeatmapColorRange;
