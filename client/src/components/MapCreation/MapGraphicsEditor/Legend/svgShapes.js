//these are for commmon use not just leaflet
export const createCircleSvg = (size, color) => {
    return`<svg width="${size}px" height="${size}px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="${color}"  />
  </svg>`;

};

export const createTriangleSvg = (size, color, ) => {
    return `<svg width="${size}px" height="${size}px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,0 100,100 0,100" fill="${color}" />
  </svg>`;
};

export const createDiamondSvg = (size, color) => {
    return `<svg width="${size}px" height="${size}px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,0 100,50 50,100 0,50" fill="${color}" />
  </svg>`;
};

export const createSquareSvg = (size, color) => {
    return `<svg width="${size}px" height="${size}px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="${color}"   />
  </svg>`;
};

export const createStarSvg = (size, color) => {
    return `<svg width="${size}px" height="${size}px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,1 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="${color}" />
  </svg>`;
};

export const createHexagonSvg = (size, color) => {
    return `<svg width="${size}px" height="${size}px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,1 93,25 93,75 50,99 7,75 7,25" fill="${color}"}" />
  </svg>`;
};

const shapeFactory = {
    createCircleSvg,
    createTriangleSvg,
    createDiamondSvg,
    createSquareSvg,
    createStarSvg,
    createHexagonSvg
};

export default shapeFactory;