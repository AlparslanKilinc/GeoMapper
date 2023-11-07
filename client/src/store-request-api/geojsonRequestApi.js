import axios from 'axios';
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: 'https://geomapper-ylm6.onrender.com/api/geojson'
});

export const getGeojson = () => {
  return api.get('/');
};

export const getGeojsonById = (id) => {
  return api.get(`/${id}`);
};

const apis = { getGeojson, getGeojsonById };
export default apis;
