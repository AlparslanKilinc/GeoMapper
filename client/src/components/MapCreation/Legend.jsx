import React, { useRef } from 'react';
import Paper from "@mui/material/Paper";
import Draggable from 'react-draggable';
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import * as d3 from 'd3';

export default function Legend({ properties, mapType }) {
    const legendRef = useRef(null);
    const { regions, colorByProperty } = useSelector((state) => state.mapGraphics);
    const { colorPalette, colorPaletteIdx } = useSelector((state) => state.mapStyles);
    const { orientation, bgColor, fontColor } = useSelector((state) => state.legend);

    const isNumeric = !isNaN(regions[0][colorByProperty]);

    const horizontalPaper = {
        display: 'flex',
        padding: '16px',
        backgroundColor: bgColor,
        color: fontColor,
    };

    const verticalPaper = {
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        backgroundColor: bgColor,
        color: fontColor,
    };

    const paperStyle = orientation === 'horizontal' ? horizontalPaper : verticalPaper;
    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        marginRight: orientation === 'horizontal' ? '10px' : '0',
        marginBottom: orientation === 'vertical' ? '10px' : '0',
    };

    function textualLegend() {
        return (
            <Paper
                ref={legendRef}
                elevation={3}
                style={paperStyle}
                sx={{
                    position: 'absolute',
                    top: (orientation === 'horizontal') ? '85%' : '70%',
                    left: (orientation === 'horizontal') ? '65%' : '85%',
                    zIndex: 999,
                    cursor: 'move'
                }}>
                {properties.map((props, index) => (
                    <div key={index} style={itemStyle}>
                        <Box sx={{ bgcolor: props.color, height: '20px', width: '20px', marginRight: '5px' }} />
                        <Typography>
                            {props.name}
                        </Typography>
                    </div>
                ))}
            </Paper>
        );
    }

    function numericalLegend() {
        // TODO: Bug: I changed the max value in the data editor, but no change in the ui.
        // We have to transfer text to num when enter data to table.
        const minVal = d3.min(regions, (d) => d[colorByProperty]);
        const maxVal = d3.max(regions, (d) => d[colorByProperty]);
        const palette = colorPalette[colorPaletteIdx];

        return (
            <Paper
                ref={legendRef}
                elevation={3}
                style={paperStyle}
                sx={{
                    position: 'absolute',
                    top: (orientation === 'horizontal') ? '85%' : '60%',
                    left: (orientation === 'horizontal') ? '75%' : '90%',
                    zIndex: 999,
                    cursor: 'move'
                }}>
                <Box
                    sx={{
                        width: orientation === 'horizontal' ? '10em' : '1em',
                        height: orientation === 'horizontal' ? '1em' : '10em',
                        position: 'relative',
                        backgroundImage: orientation === 'horizontal'
                            ? `linear-gradient(to right, ${palette.join(', ')})`
                            : `linear-gradient(to bottom, ${palette.join(', ')})`
                    }}
                >
                    <Typography style={{
                        position: 'absolute',
                        top: orientation === 'horizontal' ? '100%' : '0',
                        left: orientation === 'horizontal' ? '0' : '100%',
                        transform: orientation === 'horizontal'
                            ? 'translateY(0)'
                            : 'translateX(50%)',
                        whiteSpace: 'nowrap',
                        fontSize: '0.75em'
                    }}>
                        {minVal}
                    </Typography>
                    <Typography style={{
                        position: 'absolute',
                        top: orientation === 'horizontal' ? '100%' : 'initial',
                        bottom: orientation === 'horizontal' ? 'initial' : '0',
                        left: orientation === 'horizontal' ? 'initial' : '100%',
                        right: orientation === 'horizontal' ? '0' : 'initial',
                        transform: orientation === 'horizontal'
                            ? 'translateY(0)'
                            : 'translateX(50%)',
                        whiteSpace: 'nowrap',
                        fontSize: '0.75em'
                    }}>
                        {maxVal}
                    </Typography>
                </Box>

            </Paper>
        );
    }

    return (
        <Draggable nodeRef={legendRef} bounds="parent">
            {isNumeric ? numericalLegend() : textualLegend()}
        </Draggable>
    );
}
