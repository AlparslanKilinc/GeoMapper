import React from 'react';
import Paper from "@mui/material/Paper";
import { Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";

export default function Legend({properties, mapType}) {
    const { orientation } = useSelector((state) => state.legend);
    const { bgColor } = useSelector((state) => state.legend);
    const { fontColor } = useSelector((state) => state.legend);
    const horizontalPaper = {
        display: 'flex',
        padding: '16px',
        backgroundColor: bgColor,
        color: fontColor,
    }
    const horizontalStyle   = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '10px'
    }

    const verticlePaper = {
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        backgroundColor: bgColor,
        color: fontColor,


    }

    const verticleStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    }
    let paperStyle = verticlePaper;
    let style = verticleStyle;


    if(orientation === 'horizontal'){
        paperStyle = horizontalPaper;
        style = horizontalStyle;
    }




    return(
        <Paper elevation={3} style={paperStyle}>
            {properties.map((props, index) => (
                <div style = {style}>
                    <Box sx = {{bgcolor: props.color,  height: '20px', width: '20px' , marginRight: '5px'}}  />
                    <Typography sx = {{marginLeft: '-2px' , marginRight: '8px'}}>{props.name}</Typography>

                </div>

            ))}
        </Paper>

    );
}