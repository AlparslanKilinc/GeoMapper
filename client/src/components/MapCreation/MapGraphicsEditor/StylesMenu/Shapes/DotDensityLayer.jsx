// import React, { useEffect, useRef } from 'react';
// import { useMap } from 'react-leaflet';
// import { useSelector } from 'react-redux';
// import * as Turf from '@turf/turf';

// const DotDensityCanvasLayer = () => {
//   const map = useMap();
//   const canvasRef = useRef(null);

//   const shape = useSelector((state) => state.mapStyles.shape);
//   const fixedSymbolSize = useSelector((state) => state.mapGraphics.fixedSymbolSize);
//   const fixedOpacity = useSelector((state) => state.mapGraphics.fixedOpacity);
//   const fixedColor = useSelector((state) => state.mapGraphics.fixedColor);
//   const valuePerDot = useSelector((state) => state.mapGraphics.valuePerDot);
//   const dotDensityByProperty = useSelector((state) => state.mapGraphics.dotDensityByProperty);
//   const regions = useSelector((state) => state.mapGraphics.regions);
//   const colors = useSelector((state) => state.mapStyles.colors);
//   const features = useSelector((state) => state.geojson.geojson.geoJSON.features);

//   const generateRandomPointsInFeature = (feature, numberOfPoints) => {
//     let points = [];
//     while (points.length < numberOfPoints) {
//       const randomPoint = Turf.randomPoint(1, { bbox: Turf.bbox(feature) }).features[0];
//       if (Turf.booleanPointInPolygon(randomPoint, feature)) {
//         points.push(randomPoint);
//       }
//     }
//     return points;
//   };

//   useEffect(() => {
//     if (!map || !canvasRef.current) return;
//     const canvas = canvasRef.current;
//     canvas.width = map.getSize().x;
//     canvas.height = map.getSize().y;
//     const ctx = canvas.getContext('2d');

//     const drawPoints = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       features.forEach((feature) => {
//         const regionDetails = regions[feature.properties.regionIdx];

//         dotDensityByProperty.forEach((property) => {
//           const dotDensityValue = regionDetails[property];
//           if (dotDensityValue === undefined) return;

//           let color = fixedColor;
//           const colorObj = colors.find((c) => c.name === property);
//           if (colorObj) color = colorObj.color;

//           const numberOfDots = Math.floor(dotDensityValue / valuePerDot);
//           const randomPoints = generateRandomPointsInFeature(feature, numberOfDots);

//           randomPoints.forEach((point) => {
//             const latLng = [point.geometry.coordinates[1], point.geometry.coordinates[0]];
//             const canvasPoint = map.latLngToContainerPoint(latLng);

//             // Draw the dot
//             ctx.fillStyle = color;
//             ctx.globalAlpha = fixedOpacity;
//             ctx.beginPath();
//             ctx.arc(canvasPoint.x, canvasPoint.y, fixedSymbolSize / 3, 0, Math.PI * 2);
//             ctx.fill();
//           });
//         });
//       });
//     };

//     drawPoints();
//     map.on('moveend', drawPoints);

//     return () => {
//       map.off('moveend', drawPoints);
//     };
//   }, [map, features, regions, colors, fixedSymbolSize, fixedOpacity, fixedColor, valuePerDot]);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{ position: 'absolute', top: 0, left: 0, zIndex: 400, pointerEvents: 'none' }}
//     />
//   );
// };

// export default DotDensityCanvasLayer;

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
  const regions = useSelector((state) => state.mapGraphics.regions);
  const colors = useSelector((state) => state.mapStyles.colors);
  const features = useSelector((state) => state.geojson.geojson.geoJSON.features);
  const dotDensityByProperty = useSelector((state) => state.mapGraphics.dotDensityByProperty);

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

            // Draw the shape based on the current shape type
            drawShape(
              ctx,
              canvasPoint,
              fixedSymbolSize,
              color,
              fixedOpacity,
              shape,
              dotDensityByProperty
            );
          });
        });
      });
    };

    drawPoints();
    map.on('moveend', drawPoints);

    return () => {
      map.off('moveend', drawPoints);
    };
  }, [
    map,
    features,
    regions,
    colors,
    fixedSymbolSize,
    fixedOpacity,
    fixedColor,
    valuePerDot,
    shape
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 400 }}
    />
  );
};

// Placeholder for drawing shapes
const drawShape = (ctx, point, size, color, opacity, shapeType) => {
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;

  switch (shapeType) {
    case 'circle':
      ctx.beginPath();
      ctx.arc(point.x, point.y, size / 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'square':
      ctx.beginPath();
      ctx.rect(point.x - size / 2, point.y - size / 2, size, size);
      ctx.fill();
      break;
    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(point.x, point.y - size / 2);
      ctx.lineTo(point.x + size / 2, point.y + size / 2);
      ctx.lineTo(point.x - size / 2, point.y + size / 2);
      ctx.closePath();
      ctx.fill();
      break;
    case 'hexagon':
      let numberOfSides = 6,
        angle = (2 * Math.PI) / numberOfSides;

      ctx.beginPath();
      for (let i = 0; i <= numberOfSides; i++) {
        let x = point.x + size * Math.cos(i * angle),
          y = point.y + size * Math.sin(i * angle);
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      break;

    case 'star':
      const spikes = 5;
      const outerRadius = size / 2;
      const innerRadius = outerRadius / 2;
      const step = Math.PI / spikes;

      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        // Alternate between outer and inner radius
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = point.x + Math.cos(step * i) * radius;
        const y = point.y + Math.sin(step * i) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fill();
      break;
    // Add more cases for other shapes
    default:
      // Default to circle if shape is unknown
      ctx.beginPath();
      ctx.arc(point.x, point.y, size / 2, 0, Math.PI * 2);
      ctx.fill();
  }
};

export default DotDensityCanvasLayer;
