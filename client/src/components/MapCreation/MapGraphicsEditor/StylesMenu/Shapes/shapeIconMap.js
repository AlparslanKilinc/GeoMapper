import L from 'leaflet';
import shapeFactory from './ShapeIcons/ShapeIcons';

const shapeIconMap = {
  circle: (size, color, opacity) => shapeFactory.createCircleIcon(size, color, opacity),
  square: (size, color, opacity) => shapeFactory.createSquareIcon(size, color, opacity),
  triangle: (size, color, opacity) => shapeFactory.createTriangleIcon(size, color, opacity),
  diamond: (size, color, opacity) => shapeFactory.createDiamondIcon(size, color, opacity),
  star: (size, color, opacity) => shapeFactory.createStarIcon(size, color, opacity),
  hexagon: (size, color, opacity) => shapeFactory.createHexagonIcon(size, color, opacity),
  // Add more shapes and their respective icons here
  default: L.icon({ iconUrl: 'default-icon.png' })
};

export default shapeIconMap;
