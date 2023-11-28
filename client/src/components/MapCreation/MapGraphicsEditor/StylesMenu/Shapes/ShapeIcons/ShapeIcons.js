import L from 'leaflet';

export const createCircleIcon = (size, color, opacity) => {
  const circleSvg = `<svg width="${size}px" height="${size}px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="${color}" fill-opacity="${opacity}" />
  </svg>`;

  return L.divIcon({
    className: 'custom-icon circle',
    html: circleSvg,
    iconSize: [size, size]
  });
};

export const createTriangleIcon = (size, color, opacity) => {
  const triangleSvg = `<svg width="${size}px" height="${size}px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,0 100,100 0,100" fill="${color}" fill-opacity="${opacity}" />
  </svg>`;

  return L.divIcon({
    className: 'custom-icon triangle',
    html: triangleSvg,
    iconSize: [size, size]
  });
};

export const createDiamondIcon = (size, color, opacity) => {
  const diamondSvg = `<svg width="${size}px" height="${size}px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,0 100,50 50,100 0,50" fill="${color}" fill-opacity="${opacity}" />
  </svg>`;

  return L.divIcon({
    className: 'custom-icon diamond',
    html: diamondSvg,
    iconSize: [size, size]
  });
};

export const createSquareIcon = (size, color, opacity) => {
  const squareSvg = `<svg width="${size}px" height="${size}px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="${color}" fill-opacity="${opacity}" />
  </svg>`;

  return L.divIcon({
    className: 'custom-icon square',
    html: squareSvg,
    iconSize: [size, size]
  });
};

export const createStarIcon = (size, color, opacity) => {
  const starSvg = `<svg width="${size}px" height="${size}px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,1 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="${color}" fill-opacity="${opacity}" />
  </svg>`;

  return L.divIcon({
    className: 'custom-icon star',
    html: starSvg,
    iconSize: [size, size]
  });
};

export const createHexagonIcon = (size, color, opacity) => {
  const hexagonSvg = `<svg width="${size}px" height="${size}px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,1 93,25 93,75 50,99 7,75 7,25" fill="${color}" fill-opacity="${opacity}" />
  </svg>`;

  return L.divIcon({
    className: 'custom-icon hexagon',
    html: hexagonSvg,
    iconSize: [size, size]
  });
};

const shapeFactory = {
  createCircleIcon,
  createTriangleIcon,
  createDiamondIcon,
  createSquareIcon,
  createStarIcon,
  createHexagonIcon
};
export default shapeFactory;
