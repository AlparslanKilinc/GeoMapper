import shapeFactory from './ShapeIcons/ShapeIcons';

const shapeIconMap = {
    circle: (size, color) => shapeFactory.createCircleIcon(size, color),
    square: (size, color) => shapeFactory.createSquareIcon(size, color),
    triangle: (size, color) => shapeFactory.createTriangleIcon(size, color),
    diamond: (size, color) => shapeFactory.createDiamondIcon(size, color),
    star: (size, color) => shapeFactory.createStarIcon(size, color),
    hexagon: (size, color) => shapeFactory.createHexagonIcon(size, color),
    default: icon({ iconUrl: 'default-icon.png' })
};

export default shapeIconMap;