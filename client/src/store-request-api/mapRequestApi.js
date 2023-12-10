import axios from 'axios';
axios.defaults.withCredentials = true;
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://geomapper-ylm6.onrender.com/api/map'
    : 'http://localhost:5001/api/map';

const api = axios.create({
  baseURL: baseURL
});

export const createMap = (map, imageFile) => {
  const formData = new FormData();

  // Append map data as JSON. Assuming 'map' is an object
  formData.append('map', JSON.stringify(map));

  // Append image file if it exists
  if (imageFile) {
    formData.append('image', imageFile);
  }

  // Axios post request with FormData
  return api.post('/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const saveMapGraphicsData = (map) => api.post(`/graphics`, map);
export const saveMapStylesData = (map) => api.post(`/styles`, map);
export const updateMapGraphicsData = (map, mapGraphicsId) =>
  api.post(`/graphics/${mapGraphicsId}`, map);
export const updateMapStyles = (map, mapStylesId) => api.post(`/styles/${mapStylesId}`, map);

const apis = {
  createMap,
  saveMapGraphicsData,
  saveMapStylesData,
  updateMapGraphicsData,
  updateMapStyles
};
export default apis;
