import React from 'react';
import { Marker } from 'react-leaflet';
import shapeIconMap from './shapeIconMap';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPointKey, setMinProperty, setMaxProperty } from '../../../../../redux-slices/mapGraphicsDataSlice';
import {changeSelectedShape} from '../../../../../redux-slices/mapStylesSlice'

const SymbolLayer = () => {
  const dispatch = useDispatch();
  const points = useSelector((state) => state.mapGraphics.points);
  const shape = useSelector((state) => state.mapStyles.shape);
  const fixedSymbolSize = useSelector((state) => state.mapGraphics.fixedSymbolSize);
  const fixedOpacity = useSelector((state) => state.mapGraphics.fixedOpacity);
  const opacityByProperty = useSelector((state) => state.mapGraphics.opacityByProperty);
  const colorByProperty = useSelector((state) => state.mapGraphics.colorByProperty);
  const fixedColor = useSelector((state) => state.mapGraphics.fixedColor);
  const colors = useSelector((state) => state.mapStyles.colors);
  const latByProperty = useSelector((state) => state.mapGraphics.latByProperty);
  const lonByProperty = useSelector((state) => state.mapGraphics.lonByProperty);
  const maxSymbolSize = useSelector((state) => state.mapGraphics.maxSymbolSize);
  const minSymbolSize = useSelector((state) => state.mapGraphics.minSymbolSize);
  let mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

  let sizeByProperty;
  if (mapGraphicsType === 'Spike Map') {
    dispatch(changeSelectedShape('spike'))
    sizeByProperty = useSelector((state) => state.mapGraphics.heightByProperty);
  } else {
    sizeByProperty = useSelector((state) => state.mapGraphics.sizeByProperty);
  }

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
  console.log({min,max});
  dispatch(setMinProperty(min))
  dispatch(setMaxProperty(max))

  function calculateMarkerSize(value) {
    if (!value) {
      return null;
    }
    const minValue = min;
    const maxValue = max;

    // Check if minValue is equal to maxValue
    if (minValue === maxValue) {
      // Return a default size or the mid-point between minSymbolSize and maxSymbolSize
      return (minSymbolSize + maxSymbolSize) / 2;
    }

    const size =
      minSymbolSize +
      ((value - minValue) / (maxValue - minValue)) * (maxSymbolSize - minSymbolSize);
    return size;
  }

  const markers = points.map((point, pointIdx) => {
    const iconSize = calculateMarkerSize(point[sizeByProperty]) || fixedSymbolSize;
    const opacity = point[opacityByProperty] || fixedOpacity;

    console.log(iconSize);

    let color = fixedColor;

    let colorObj = colors.find((color) => color.name === point[colorByProperty]);
    if (colorObj && colorByProperty) color = colorObj.color;

    let icon;
    if (mapGraphicsType === 'Spike Map') {
      icon = shapeIconMap['spike'](iconSize, color, opacity);
    } else {
      icon = shapeIconMap[shape](iconSize, color, opacity) || shapeIconMap.default;
    }
    const lat = point[latByProperty];
    const lon = point[lonByProperty];

    if (lat === undefined || lon === undefined) return null;

    return (
      <Marker
        key={lat + '#' + lon}
        position={[lat, lon]}
        icon={icon}
        eventHandlers={{
          click: (e) => {
            dispatch(setSelectedPointKey(pointIdx));
          }
        }}
      />
    );
  });

  return <div>{markers}</div>;
};

export default SymbolLayer;
