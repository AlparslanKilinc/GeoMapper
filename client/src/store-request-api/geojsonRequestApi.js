import axios from 'axios';
axios.defaults.withCredentials = true;
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://geomapper-ylm6.onrender.com/api/geojson'
    : 'http://localhost:5001/api/geojson';

const api = axios.create({
  baseURL: baseURL
});

export const getGeojson = () => {
  return api.get('/');
};

export const getGeojsonById = (id) => {
  return api.get(`/${id}`, { responseType: 'arraybuffer' });
};

export const createGeojson = (compressedGeoJSON, ownerId, isPrivate, name) => {
  // Configure the request to include binary data and additional parameters
  const config = {
    params: {
      ownerId: ownerId,
      isPrivate: isPrivate,
      name: name
    },
    headers: {
      'Content-Type': 'application/octet-stream'
    },
    responseType: 'arraybuffer'
  };

  return api.post(baseURL, compressedGeoJSON, config);
};

const apis = { getGeojson, getGeojsonById, createGeojson };
export default apis;
