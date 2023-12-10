import axios from 'axios';
axios.defaults.withCredentials = true;
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://geomapper-ylm6.onrender.com/api/map'
    : 'http://localhost:5001/api/map';

const api = axios.create({
  baseURL: baseURL
});

export const createMap = (map) => api.post(`/create`, map);
export const saveMapGraphicsData = (map) => api.post(`/graphics/save`, map);
export const saveMapStylesData = (map) => api.post(`/styles/save`, map);
export const updateMapGraphicsData = (map,mapGraphicsId) => api.post(`/graphics/${mapGraphicsId}`, map);
export const updateMapStyles = (map,mapStylesId) => api.post(`/styles/${mapStylesId}`, map);


const apis = {
  createMap,
  saveMapGraphicsData,
  saveMapStylesData,
  updateMapGraphicsData,
  updateMapStyles
};
export default apis;
