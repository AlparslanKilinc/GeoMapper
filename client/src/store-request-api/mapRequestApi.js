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
  return api.put(`/${map.mapId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const saveMapGraphicsData = (map) => api.post(`/graphics`, map);
export const updateMapGraphicsDataById = (mapGraphicsId, mapGraphicsData) => api.put(`/graphics/${mapGraphicsId}`, mapGraphicsData);
export const getMapGraphicsDataById = (mapGraphicsId) => api.get(`/graphics/${mapGraphicsId}`);
export const saveMapStylesData = (map) => api.post(`/styles`, map);
export const updateMapStylesDataById = (mapStylesId, mapStylesData) => api.put(`/styles/${mapStylesId}`, mapStylesData);
export const getMapStylesDataById = (mapStylesId) => api.get(`/styles/${mapStylesId}`);
export const deleteGeojsonById = (geojsonId) => api.delete(`/geojson/${geojsonId}`);

export const getDrafts = () => api.get(`/drafts`);
export const getUserPublishedMaps = () => api.get(`/userPublished`);

const apis = {
  saveMapGraphicsData,
  updateMapGraphicsDataById,
  getMapGraphicsDataById,
  saveMapStylesData,
  updateMapStylesDataById,
  getMapStylesDataById,
  getDrafts,
  getUserPublishedMaps,
  createMap,
  updateMap,
  getMapDataById,
  deleteGeojsonById
};
export default apis;
