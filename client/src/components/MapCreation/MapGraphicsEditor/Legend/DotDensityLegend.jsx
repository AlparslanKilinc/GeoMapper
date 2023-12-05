import React, { useRef, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import Draggable from 'react-draggable';
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import shapeFactory from "./svgShapes.js";

export default function DotDensityLegend({ properties }) {
    const legendRef = useRef(null);
    const { orientation, bgColor, fontColor } = useSelector((state) => state.legend);
    const valuePerDot = useSelector((state) => state.mapGraphics.valuePerDot);
    const shape = useSelector((state) => state.mapStyles.shape);

    const renderShape = (shapeType, color) => {
        const shapeMappings = {
            'circle': shapeFactory.createCircleSvg,
            'square': shapeFactory.createSquareSvg,
            'triangle': shapeFactory.createTriangleSvg,
            'diamond': shapeFactory.createDiamondSvg,
            'star': shapeFactory.createStarSvg,
            'hexagon': shapeFactory.createHexagonSvg,
        };

        const svgString = shapeMappings[shapeType](15, color);

        return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
    };

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
    useEffect(() => {
        const updatedShape = shape;
    }, [shape]);



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
                        <div style={{ marginRight: '5px', marginLeft: '-5px' }}>
                            {renderShape(shape, props.color)}
                        </div>
                        <Typography>
                            {props.name}
                        </Typography>
                    </div>
                ))}
                1 dot = {valuePerDot}

            </Paper>
        </Draggable>
    );
}