import React from 'react';
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

export default function Legend({ properties, mapType }) {
    const { orientation } = useSelector((state) => state.legend);
    const { bgColor } = useSelector((state) => state.legend);
    const { fontColor } = useSelector((state) => state.legend);

    const horizontalPaper = {
        display: 'flex',
        padding: '16px',
        backgroundColor: bgColor,
        color: fontColor,
    };

    const horizontalStyle = {
        display: 'flex',
        alignItems: 'center',
        marginRight: '10px',
    };

    const verticalPaper = {
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        backgroundColor: bgColor,
        color: fontColor,
    };

    const verticalStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    };

    const paperStyle = orientation === 'horizontal' ? horizontalPaper : verticalPaper;
    const style = orientation === 'horizontal' ? horizontalStyle : verticalStyle;

    return (
        <Paper elevation={3} style={paperStyle} sx={{
            position: 'absolute',
            top: '55%',
            transform: 'translateY(-50%)',
            zIndex: 999,
        }}>
            {properties.map((props, index) => (
                <div key={index} style={style}>
                    <Box sx={{ bgcolor: props.color, height: '20px', width: '20px', marginRight: orientation === 'horizontal' ? '8px' : '5px' }} />
                    <Typography sx={{ marginLeft: orientation === 'horizontal' ? '4px' : '0', marginRight: orientation === 'horizontal' ? '8px' : '0' }}>
                        {props.name}
                    </Typography>
                </div>
            ))}
        </Paper>
    );
}
