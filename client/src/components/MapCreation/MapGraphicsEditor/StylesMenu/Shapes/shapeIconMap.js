import L from 'leaflet';
import shapeFactory from './ShapeIcons/ShapeIcons';

const shapeIconMap = {
  circle: (size, color, opacity) => shapeFactory.createCircleIcon(size, color, opacity),
  square: (size, color, opacity) => shapeFactory.createSquareIcon(size, color, opacity),
  triangle: (size, color, opacity) => shapeFactory.createTriangleIcon(size, color, opacity),
  diamond: (size, color, opacity) => shapeFactory.createDiamondIcon(size, color, opacity),
  // Add more shapes and their respective icons here
  default: L.icon({ iconUrl: 'default-icon.png' })
};

export default shapeIconMap;
