import L from 'leaflet';
import * as d3 from 'd3';

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

export const createSpikeIcon = (size, color, opacity) => {
  const baseWidth = 10;
  const height = size;

  const gradientId = "gradient-" + Math.random().toString(36).substr(2, 9);

  const svg = d3.create("svg")
    .attr("width", baseWidth)
    .attr("height", height)
    .attr("viewBox", `0 0 ${baseWidth} ${height}`)
    .attr("xmlns", "http://www.w3.org/2000/svg");

  const gradient = svg.append("defs")
    .append("linearGradient")
    .attr("id", gradientId)
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "0%")
    .attr("y2", "0%");

  gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", d3.rgb(color).brighter(3))
    .attr("stop-opacity", opacity);

  gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", d3.rgb(color).darker(3))
    .attr("stop-opacity", opacity);

  svg.append("polygon")
    .attr("points", `0,${height} ${baseWidth / 2},0 ${baseWidth},${height}`)
    .attr("fill", `url(#${gradientId})`)
    .attr("stroke", d3.rgb(color).darker(3))
    .attr("stroke-opacity", opacity)
    .attr("stroke-width", "1");

  const spikeSvgString = svg.node().outerHTML;

  return L.divIcon({
    className: 'custom-icon spike',
    html: spikeSvgString,
    iconSize: [baseWidth, height],
    iconAnchor: [baseWidth / 2, height]
  });
};

const shapeFactory = {
  createCircleIcon,
  createTriangleIcon,
  createDiamondIcon,
  createSquareIcon,
  createStarIcon,
  createHexagonIcon,
  createSpikeIcon
};
export default shapeFactory;
