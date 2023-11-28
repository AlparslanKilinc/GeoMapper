import L from 'leaflet';
import shapeFactory from './ShapeIcons/ShapeIcons';
// Mapping of shape props to Leaflet icon objects

const shapeIconMap = {
  circle: (size) => shapeFactory.createCircleIcon(size),
  square: (size) => shapeFactory.createSquareIcon(size),
  triangle: (size) => shapeFactory.createTriangleIcon(size),
  diamond: (size) => shapeFactory.createDiamondIcon(size),
  // Add more shapes and their respective icons here
  default: L.icon({ iconUrl: 'default-icon.png' })
};

export default shapeIconMap;
