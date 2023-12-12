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
export const getMapDataById = (mapId) => api.get(`/${mapId}`);
export const updateMap = (map, imageFile) => {
  const formData = new FormData();

  // Append map data as JSON. Assuming 'map' is an object
  formData.append('map', JSON.stringify(map));

  // Append image file if it exists
  if (imageFile) {
    formData.append('image', imageFile);
  }

  // Axios post request with FormData
  return api.post(`/${map._id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const saveMapGraphicsData = (map) => api.post(`/graphics`, map);
export const updateMapGraphicsDataById = (map, mapGraphicsId) => api.post(`/graphics/${mapGraphicsId}`, map);
export const getMapGraphicsDataById = (mapGraphicsId) => api.get(`/graphics/${mapGraphicsId}`);
export const saveMapStylesData = (map) => api.post(`/styles`, map);
export const updateMapStylesDataById = (map, mapStylesId) => api.post(`/styles/${mapStylesId}`, map);
export const getMapStylesDataById = (mapStylesId) => api.get(`/styles/${mapStylesId}`);


export const getDrafts = () => api.get(`/drafts`);
export const getPublishedMaps = () => api.get(`/published`);

const apis = {
  saveMapGraphicsData,
  updateMapGraphicsDataById,
  getMapGraphicsDataById,
  saveMapStylesData,
  updateMapStylesDataById,
  getMapStylesDataById,
  getDrafts,
  getPublishedMaps,
  createMap,
  updateMap,
  getMapDataById,
};
export default apis;
