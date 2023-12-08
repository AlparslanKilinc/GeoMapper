import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import * as Turf from '@turf/turf';

const DotDensityCanvasLayer = () => {
  const map = useMap();
  const canvasRef = useRef(null);

  const shape = useSelector((state) => state.mapStyles.shape);
  const fixedSymbolSize = useSelector((state) => state.mapGraphics.fixedSymbolSize);
  const fixedOpacity = useSelector((state) => state.mapGraphics.fixedOpacity);
  const fixedColor = useSelector((state) => state.mapGraphics.fixedColor);
  const valuePerDot = useSelector((state) => state.mapGraphics.valuePerDot);
  const dotDensityByProperty = useSelector((state) => state.mapGraphics.dotDensityByProperty);
  const regions = useSelector((state) => state.mapGraphics.regions);
  const colors = useSelector((state) => state.mapStyles.colors);
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

  useEffect(() => {
    if (!map || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = map.getSize().x;
    canvas.height = map.getSize().y;
    const ctx = canvas.getContext('2d');

    const drawPoints = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      features.forEach((feature) => {
        const regionDetails = regions[feature.properties.regionIdx];

        dotDensityByProperty.forEach((property) => {
          const dotDensityValue = regionDetails[property];
          if (dotDensityValue === undefined) return;

          let color = fixedColor;
          const colorObj = colors.find((c) => c.name === property);
          if (colorObj) color = colorObj.color;

          const numberOfDots = Math.floor(dotDensityValue / valuePerDot);
          const randomPoints = generateRandomPointsInFeature(feature, numberOfDots);

          randomPoints.forEach((point) => {
            const latLng = [point.geometry.coordinates[1], point.geometry.coordinates[0]];
            const canvasPoint = map.latLngToContainerPoint(latLng);

            // Draw the dot
            ctx.fillStyle = color;
            ctx.globalAlpha = fixedOpacity;
            ctx.beginPath();
            ctx.arc(canvasPoint.x, canvasPoint.y, fixedSymbolSize / 3, 0, Math.PI * 2);
            ctx.fill();
          });
        });
      });
    };

    drawPoints();
    map.on('moveend', drawPoints);

    return () => {
      map.off('moveend', drawPoints);
    };
  }, [map, features, regions, colors, fixedSymbolSize, fixedOpacity, fixedColor, valuePerDot]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 400, pointerEvents: 'none' }}
    />
  );
};

export default DotDensityCanvasLayer;
