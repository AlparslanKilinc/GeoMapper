import L from 'leaflet';

export const createCircleIcon = (size) => {
  return L.divIcon({
    className: 'circle-icon',
    iconSize: size, // size of the icon
    html: '<div class="circle"></div>'
  });
};

export const createTriangleIcon = (size) => {
  return L.divIcon({
    className: 'custom-icon triangle',
    iconSize: size,
    html: '<div class="shape"></div>'
  });
};

export const createDiamondIcon = (size) => {
  return L.divIcon({
    className: 'custom-icon diamond',
    iconSize: size,
    html: '<div class="shape"></div>'
  });
};

export const createSquareIcon = (size) => {
  return L.divIcon({
    className: 'custom-icon square',
    iconSize: size,
    html: '<div class="shape"></div>'
  });
};

const shapeFactory = { createCircleIcon, createTriangleIcon, createDiamondIcon, createSquareIcon };
export default shapeFactory;
