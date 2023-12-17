import axios from 'axios';
axios.defaults.withCredentials = true;
const baseURL =
    process.env.NODE_ENV === 'production'
        ? 'https://geomapper-ylm6.onrender.com/api/comment'
        : 'http://localhost:5001/api/comment';

const api = axios.create({
    baseURL: baseURL
});

export const addComment = (commentData) => api.post('/addComment', commentData);
export const getMapComments = (mapId) => api.get(`/${mapId}`)




const apis= {
   addComment,
    getMapComments
}

export default apis;