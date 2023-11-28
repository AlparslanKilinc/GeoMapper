import L from 'leaflet';

export const createCircleIcon = (size, color, opacity) => {
  return L.divIcon({
    className: 'circle-icon',
    iconSize: size,
    html: `<div class="circle" style="background-color: ${color}; opacity: ${opacity};"></div>`
  });
};

export const createTriangleIcon = (size, color, opacity) => {
  return L.divIcon({
    className: 'custom-icon triangle',
    iconSize: size,
    html: `<div class="shape" style="border-bottom-color: ${color}; opacity: ${opacity};"></div>`
  });
};

export const createDiamondIcon = (size, color, opacity) => {
  return L.divIcon({
    className: 'custom-icon diamond',
    iconSize: size,
    html: `<div class="shape" style="background-color: ${color}; opacity: ${opacity};"></div>`
  });
};

export const createSquareIcon = (size, color, opacity) => {
  return L.divIcon({
    className: 'custom-icon square',
    iconSize: size,
    html: `<div class="shape" style="background-color: ${color}; opacity: ${opacity};"></div>`
  });
};

const shapeFactory = { createCircleIcon, createTriangleIcon, createDiamondIcon, createSquareIcon };
export default shapeFactory;
