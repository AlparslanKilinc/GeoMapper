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
export const forkMap = (mapData) => api.post('/forkMap', mapData)
export const getAllPublishedMaps = (sortBy) => api.get('/getAllPublishedMaps', { params: { sortBy } });
export const publishMap = (map) => api.put(`/${map.mapId}/publish`, map);
export const saveMapGraphicsData = (map) => api.post(`/graphics`, map);
export const deleteGraphicsById = (mapGraphicsId) => api.post('/graphics/deleteGraphics', mapGraphicsId )
export const updateMapGraphicsDataById = (mapGraphicsId, mapGraphicsData) => api.put(`/graphics/${mapGraphicsId}`, mapGraphicsData);
export const getMapGraphicsDataById = (mapGraphicsId) => api.get(`/graphics/${mapGraphicsId}`);
export const saveMapStylesData = (map) => api.post(`/styles`, map);

export const deleteStylesById = (mapStylesId) => api.post('/styles/deleteStyles', mapStylesId)
export const updateMapStylesDataById = (mapStylesId, mapStylesData) => api.put(`/styles/${mapStylesId}`, mapStylesData);
export const getMapStylesDataById = (mapStylesId) => api.get(`/styles/${mapStylesId}`);
export const deleteGeojsonById = (geojsonId) => api.delete(`/geojson/${geojsonId}`);

export const getDrafts = () => api.get(`/drafts`);
export const getUserPublishedMaps = () => api.get(`/userPublished`);

export const updateLikes = (likes, mapId, userId) => api.post(`/updateLikes`, {likes, mapId, userId})

export const removeMapFromUser = (userId, mapId) => api.post('/removeMap', {userId, mapId})

export const deleteMap = (mapId) => api.post('/deleteMap', mapId)

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
  deleteGeojsonById,
  publishMap,
  updateLikes,
  deleteGraphicsById,
  removeMapFromUser,
  deleteStylesById,
  deleteMap,
  getAllPublishedMaps,
  forkMap
};
export default apis;
