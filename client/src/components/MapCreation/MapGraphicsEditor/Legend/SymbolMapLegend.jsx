import React, { useRef, useEffect, useState } from 'react';
import Paper from "@mui/material/Paper";
import Draggable from 'react-draggable';
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import shapeFactory from "./svgShapes.js";

export default function SymbolMapLegend({ properties }) {
    const legendRef = useRef(null);
    const { orientation, bgColor, fontColor } = useSelector((state) => state.legend);
    let shape = useSelector((state) => state.mapStyles.shape);
    const maxSymbolSize = useSelector((state) => state.mapGraphics.maxProperty);
    const minSymbolSize = useSelector((state) => state.mapGraphics.minProperty);
    const [smallIcon, setSmallIcon] = useState('');
    const [mediumIcon, setMediumIcon] = useState('');
    const [largeIcon, setLargeIcon] = useState('');
    const mediumSize = (minSymbolSize + maxSymbolSize) / 2
    if (shape == 'Spike') {
        shape = 'spike'
    }
    useEffect(() => {
        const shapeMappings = {
            'circle': shapeFactory.createCircleSvg,
            'square': shapeFactory.createSquareSvg,
            'triangle': shapeFactory.createTriangleSvg,
            'diamond': shapeFactory.createDiamondSvg,
            'star': shapeFactory.createStarSvg,
            'hexagon': shapeFactory.createHexagonSvg,
            'spike': shapeFactory.createSpikeSvg,
        };
        const createShapeIcons = (size) => ({
            small: shapeMappings[shape](size, 'grey'),
            medium: shapeMappings[shape](size + 10, 'grey'),
            large: shapeMappings[shape](size + 25, 'grey'),
        });
        const { small, medium, large } = createShapeIcons(15);
        console.log(shape);
        setSmallIcon(small);
        setMediumIcon(medium);
        setLargeIcon(large);

    }, [shape]);


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
                    top: (orientation === 'horizontal') ? '85%' : '70%',
                    left: (orientation === 'horizontal') ? '65%' : '85%',
                    zIndex: 998,
                    cursor: 'move'
                }}>
                {properties.map((props, index) => (
                    <div key={index} style={itemStyle}>
                        <Box sx={{ bgcolor: props.color, height: '20px', width: '20px', marginRight: '5px' }} />
                        <Typography style={{ marginRight: '-10px' }}>
                            {props.name}
                        </Typography>
                    </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div dangerouslySetInnerHTML={{ __html: smallIcon }} ></div>
                    <Typography style={{ marginLeft: '20px' }}>
                        {minSymbolSize} - {mediumSize}
                    </Typography>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div dangerouslySetInnerHTML={{ __html: mediumIcon }} />
                    <Typography style={{ marginLeft: '20px' }} >
                        {mediumSize} - {maxSymbolSize}
                    </Typography>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div dangerouslySetInnerHTML={{ __html: largeIcon }} />
                    <Typography style={{ marginLeft: '20px' }}>
                        {maxSymbolSize} +
                    </Typography>
                </div>
            </Paper>
        </Draggable>
    );
}