import React from 'react';
import Paper from "@mui/material/Paper";
import { Typography} from "@mui/material";
import Box from "@mui/material/Box";


export default function Legend({properties, mapType}) {
    console.log(properties)
    const horizontalPaper = {
        display: 'flex', padding: '16px'
    }
    const horizontalStyle   = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '10px'
    }

    const verticlePaper = {
        display: 'flex', flexDirection: 'column', padding: '16px'
    }

    const verticleStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    }



    return(
        <Paper elevation={3} style={verticlePaper}>
            {properties.map((props, index) => (
                <div style = {verticleStyle}>
                    <Box sx = {{bgcolor: props.color,  height: '20px', width: '20px' , marginRight: '5px'}}  />
                    <Typography sx = {{marginLeft: '-2px' , marginRight: '8px'}}>{props.name}</Typography>

                </div>


            ))}
        </Paper>

    );
}