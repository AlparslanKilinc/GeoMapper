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
  return api.get(`/${id}`);
};

const apis = { getGeojson, getGeojsonById };
export default apis;
