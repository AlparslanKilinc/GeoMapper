import React, { useRef, useEffect } from 'react';
import { Marker } from 'react-leaflet';
import shapeIconMap from './shapeIconMap';
import { useSelector } from 'react-redux';
import './ShapeIcons/shape-icon.css';

const SymbolLayer = () => {
  // Get the icon for the given shape, or default if not found

  const samplePoints = {
    '36.7783#-119.4179': { lat: 36.7783, lon: -119.4179, size: 21, color: 'Jordan', opacity: 1 },
    '31.9686#-99.9018': { lat: 31.9686, lon: -99.9018, size: 20, color: 'Kobe', opacity: 2 },
    '27.9944#-81.7603': { lat: 27.9944, lon: -81.7603, size: 15, color: 'LeBron', opacity: 6 },
    '40.7128#-74.006': { lat: 40.7128, lon: -74.006, size: 30, color: 'Kobe', opacity: 5 },
    '40.6331#-89.3985': { lat: 40.6331, lon: -89.3985, size: 19, color: 'Kobe', opacity: 6 },
    '41.2033#-77.1945': { lat: 41.2033, lon: -77.1945, size: 47, color: 'Kobe', opacity: 3 },
    '40.4173#-82.9071': { lat: 40.4173, lon: -82.9071, size: 50, color: 'LeBron', opacity: 9 },
    '32.1656#-82.9001': { lat: 32.1656, lon: -82.9001, size: 26, color: 'Kobe', opacity: 1 },
    '35.7596#-79.0193': { lat: 35.7596, lon: -79.0193, size: 25, color: 'Jordan', opacity: 1 },
    '44.3148#-85.6024': { lat: 44.3148, lon: -85.6024, size: 12, color: 'Kobe', opacity: 4 }
  };

  const shape = useSelector((state) => state.mapStyles.shape);
  const sizeByProperty = useSelector((state) => state.mapGraphics.sizeByProperty);
  const fixedSymbolSize = useSelector((state) => state.mapGraphics.fixedSymbolSize);
  const fixedOpacity = useSelector((state) => state.mapGraphics.fixedOpacity);
  const opacityByProperty = useSelector((state) => state.mapGraphics.opacityByProperty);

  // determine the size of the symbol based on a property we are making a proportional symbol map with

  const extractSizeValues = (points) => {
    let sizeValues = [];
    let min = 10000000,
      max = 0;
    Object.values(points).forEach((point) => {
      sizeValues.push(point[sizeByProperty]);
      min = Math.min(min, point[sizeByProperty]);
      max = Math.max(max, point[sizeByProperty]);
    });
    return { sizeValues, min, max };
  };

  const { sizeValues, min, max } = extractSizeValues(samplePoints);

  function calculateMarkerSize(value) {
    if (!value) {
      return null;
    }
    // Constants for size scaling - adjust these based on your data
    const minSize = 10; // Minimum size of marker
    const maxSize = 100; // Maximum size of marker

    // Assuming 'value' is within a known range, adjust these limits according to your data
    const minValue = min; // Minimum value in your data
    const maxValue = max; // Maximum value in your data

    // Scale the value to the marker size range
    const size = minSize + ((value - minValue) / (maxValue - minValue)) * (maxSize - minSize);

    // Return size as [width, height]
    return [size, size];
  }

  const markerRefs = useRef({});

  const markers = Object.values(samplePoints).map((point, index) => {
    const iconSize = calculateMarkerSize(point[sizeByProperty]) || [
      fixedSymbolSize,
      fixedSymbolSize
    ];
    const icon = shapeIconMap[shape](iconSize) || shapeIconMap.default;

    // Assign a ref to each marker
    if (!markerRefs.current[point.lat + '#' + point.lon]) {
      markerRefs.current[point.lat + '#' + point.lon] = React.createRef();
    }

    return (
      <Marker
        key={point.lat + '#' + point.lon}
        position={[point.lat, point.lon]}
        icon={icon}
        ref={markerRefs.current[point.lat + '#' + point.lon]}
      />
    );
  });

  useEffect(() => {
    Object.keys(samplePoints).forEach((key) => {
      const point = samplePoints[key];
      const markerRef = markerRefs.current[key];
      if (markerRef && markerRef.current) {
        const opacity = point[opacityByProperty] || fixedOpacity;
        const icon = markerRef.current.getElement();
        if (icon) {
          icon.style.opacity = opacity;
        }
      }
    });
  }, [samplePoints, opacityByProperty, fixedOpacity]);

  return <div>{markers}</div>;
};

export default SymbolLayer;
