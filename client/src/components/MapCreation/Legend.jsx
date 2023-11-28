import React, { useRef } from 'react';
import Paper from "@mui/material/Paper";
import Draggable from 'react-draggable';
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

export default function Legend({ properties, mapType }) {
    const legendRef = useRef(null);
    const { orientation } = useSelector((state) => state.legend);
    const { bgColor } = useSelector((state) => state.legend);
    const { fontColor } = useSelector((state) => state.legend);

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

    return (
        <Draggable nodeRef={legendRef} bounds="parent">
            <Paper
                ref={legendRef}
                elevation={3}
                style={paperStyle}
                sx={{
                    position: 'absolute',
                    top: '70%',
                    left: '85%',
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
        </Draggable>
    );
}
