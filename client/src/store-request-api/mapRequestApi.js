import axios from 'axios';
axios.defaults.withCredentials = true;
const baseURL =
    process.env.NODE_ENV === 'production'
        ? 'https://geomapper-ylm6.onrender.com/api/map'
        : 'http://localhost:5001/api/map';

const api = axios.create({
    baseURL: baseURL
});


export const getMapById = (id) => {
    return api.get(`/${id}`, { responseType: 'arraybuffer' });
};
const apis = { getMapById };
export default apis;
