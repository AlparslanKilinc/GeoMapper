import React from 'react';
import { Marker } from 'react-leaflet';
import shapeIconMap from './shapeIconMap';
import { useSelector, useDispatch } from 'react-redux';
import './ShapeIcons/shape-icon.css';
import { setSelectedPointKey } from '../../../../../redux-slices/mapGraphicsDataSlice';

const SymbolLayer = () => {
  const dispatch = useDispatch();
  const points = useSelector((state) => state.mapGraphics.points);
  const shape = useSelector((state) => state.mapStyles.shape);
  const sizeByProperty = useSelector((state) => state.mapGraphics.sizeByProperty);
  const fixedSymbolSize = useSelector((state) => state.mapGraphics.fixedSymbolSize);
  const fixedOpacity = useSelector((state) => state.mapGraphics.fixedOpacity);
  const opacityByProperty = useSelector((state) => state.mapGraphics.opacityByProperty);
  const colorByProperty = useSelector((state) => state.mapGraphics.colorByProperty);
  const fixedColor = useSelector((state) => state.mapGraphics.fixedColor);
  const colors = useSelector((state) => state.mapStyles.colors);
  const extractSizeValues = (points) => {
    let min = 10000000,
      max = 0;
    Object.values(points).forEach((point) => {
      min = Math.min(min, point[sizeByProperty]);
      max = Math.max(max, point[sizeByProperty]);
    });
    return { min, max };
  };

  const { min, max } = extractSizeValues(points);

  function calculateMarkerSize(value) {
    if (!value) {
      return null;
    }
    const minSize = 10,
      maxSize = 100;
    const minValue = min,
      maxValue = max;
    const size = minSize + ((value - minValue) / (maxValue - minValue)) * (maxSize - minSize);
    return size;
  }

  const markers = Object.values(points).map((point) => {
    const iconSize = calculateMarkerSize(point[sizeByProperty]) || fixedSymbolSize;
    const opacity = point[opacityByProperty] || fixedOpacity;
    // Assuming you have a way to determine the color, add that logic here
    let color = fixedColor; // Replace 'someColorLogic' with actual logic to determine color

    let colorObj = colors.find((color) => color.name === point[colorByProperty]);
    if (colorObj && colorByProperty) color = colorObj.color;

    const icon = shapeIconMap[shape](iconSize, color, opacity) || shapeIconMap.default;
    const { lat, lon } = point;

    return (
      <Marker
        key={point.lat + '#' + point.lon}
        position={[point.lat, point.lon]}
        icon={icon}
        eventHandlers={{
          click: (e) => {
            dispatch(setSelectedPointKey(point.lat + '#' + point.lon));
          }
        }}
      />
    );
  });

  return <div>{markers}</div>;
};

export default SymbolLayer;
