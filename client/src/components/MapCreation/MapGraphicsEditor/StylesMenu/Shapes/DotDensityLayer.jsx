import React from 'react';
import { Marker } from 'react-leaflet';
import shapeIconMap from './shapeIconMap';
import { useSelector } from 'react-redux';
import './ShapeIcons/shape-icon.css';
import * as Turf from '@turf/turf';

const DotDensityLayer = () => {
  const shape = useSelector((state) => state.mapStyles.shape);
  const fixedSymbolSize = useSelector((state) => state.mapGraphics.fixedSymbolSize);
  const fixedOpacity = useSelector((state) => state.mapGraphics.fixedOpacity);
  const fixedColor = useSelector((state) => state.mapGraphics.fixedColor);
  const valuePerDot = useSelector((state) => state.mapGraphics.valuePerDot);
  const dotDensityByProperty = useSelector((state) => state.mapGraphics.dotDensityByProperty);
  const regions = useSelector((state) => state.mapGraphics.regions);

  const iconSize = fixedSymbolSize;
  const opacity = fixedOpacity;
  const color = fixedColor;
  const icon = shapeIconMap[shape](iconSize, color, opacity) || shapeIconMap.default;

  const features = useSelector((state) => state.geojson.geojson.geoJSON.features);

  const generateRandomPointsInFeature = (feature, numberOfPoints) => {
    let points = [];
    while (points.length < numberOfPoints) {
      const randomPoint = Turf.randomPoint(1, { bbox: Turf.bbox(feature) }).features[0];
      if (Turf.booleanPointInPolygon(randomPoint, feature)) {
        points.push(randomPoint);
      }
    }
    return points;
  };

  const markers = [];
  features.forEach((feature) => {
    // calculate how many dots will go inside this feature
    const regionDetails = regions[feature.properties.regionIdx];
    const dotDensityValue = regionDetails[dotDensityByProperty];
    const numberOfDots = Math.floor(dotDensityValue / valuePerDot);
    console.log(dotDensityValue, valuePerDot, numberOfDots);
    const randomPoints = generateRandomPointsInFeature(feature, numberOfDots);

    randomPoints.forEach((point) => {
      const latLng = [point.geometry.coordinates[1], point.geometry.coordinates[0]];
      markers.push(<Marker key={latLng.join('#')} position={latLng} icon={icon} />);
    });
  });

  return <div>{markers}</div>;
};

export default DotDensityLayer;