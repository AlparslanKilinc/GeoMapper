import React, { useRef, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import shapeFactory from './svgShapes.js';

export default function SymbolMapLegend({ properties }) {
    const legendRef = useRef(null);
    const { orientation, bgColor, fontColor } = useSelector((state) => state.legend);
    let shape = useSelector((state) => state.mapStyles.shape);
    const maxSymbolSize = useSelector((state) => state.mapGraphics.maxProperty);
    const minSymbolSize = useSelector((state) => state.mapGraphics.minProperty);
    const mediumSize = (minSymbolSize + maxSymbolSize) / 2;
    console.log(properties)
    console.log(properties.length)
    console.log(minSymbolSize)
    console.log(maxSymbolSize)
    const [iconSizes, setIconSizes] = useState({
        small: '',
        medium: '',
        large: '',
    });

    if (shape === 'Spike') {
        shape = 'spike';
    }

    useEffect(() => {
        const calculateIconSizes = () => {
            const shapeMappings = {
                circle: shapeFactory.createCircleSvg,
                square: shapeFactory.createSquareSvg,
                triangle: shapeFactory.createTriangleSvg,
                diamond: shapeFactory.createDiamondSvg,
                star: shapeFactory.createStarSvg,
                hexagon: shapeFactory.createHexagonSvg,
                spike: shapeFactory.createSpikeSvg,
            };

            const createShapeIcon = (size) => shapeMappings[shape](size, 'grey');

            if (minSymbolSize === maxSymbolSize) {
                return { medium: createShapeIcon(25) };
            } else {
                const smallIcon = createShapeIcon(15);
                const mediumIcon = createShapeIcon(25);
                const largeIcon = createShapeIcon(35);
                return { small: smallIcon, medium: mediumIcon, large: largeIcon };
            }
        };

        setIconSizes(calculateIconSizes());
    }, [properties, shape, maxSymbolSize, minSymbolSize]);

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

    const paperStyle = {
        position: 'absolute',
        top: orientation === 'horizontal' ? '85%' : '70%',
        left: orientation === 'horizontal' ? '65%' : '85%',
        zIndex: 999,
        cursor: 'move',
        ...(orientation === 'horizontal' && { display: 'flex' }),
    };

    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        marginRight: orientation === 'horizontal' ? '10px' : '0',
        marginBottom: orientation === 'vertical' ? '10px' : '0',
    };
    const SizeLegend = ({ icon, label }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div dangerouslySetInnerHTML={{ __html: icon }}></div>
            <Typography style={{ marginLeft: '20px' }}>{label}</Typography>
        </div>
    );
    return (
        <Draggable nodeRef={legendRef} bounds="parent">
            <Paper ref={legendRef} elevation={3} style={{ ...paperStyle, ...(orientation === 'horizontal' ? horizontalPaper : verticalPaper) }}>
                {properties.map((props, index) => (
                    <div key={index} style={itemStyle}>
                        <Box sx={{ bgcolor: props.color, height: '20px', width: '20px', marginRight: '5px' }} />
                        <Typography style={{ marginRight: '-10px' }}>{props.name}</Typography>
                    </div>
                ))}
                {((minSymbolSize === maxSymbolSize)) && (
                    <SizeLegend icon={iconSizes.medium} label={`${mediumSize}`} />
                )}
                {((properties.length > 0) &&  (minSymbolSize != maxSymbolSize)) &&(
                    <div>
                        <SizeLegend icon={iconSizes.small} label={`${minSymbolSize} - ${mediumSize}`} />
                        <SizeLegend icon={iconSizes.medium} label={`${mediumSize} - ${maxSymbolSize}`} />
                        <SizeLegend icon={iconSizes.large} label={`${maxSymbolSize} +`} />
                    </div>
                )}
            </Paper>
        </Draggable>
    );
}

