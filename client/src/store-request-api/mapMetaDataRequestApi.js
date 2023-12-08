import axios from 'axios';
axios.defaults.withCredentials = true;
const baseURL =
    process.env.NODE_ENV === 'production'
        ? 'https://geomapper-ylm6.onrender.com/api/metadata'
        : 'http://localhost:5001/api/metadata';

const api = axios.create({
    baseURL: baseURL
});
export const addMetaData = async ({ mapId,author, title, description, tags, mapGraphicsType }) => {
    try {
        console.log('in add meta data request')
        const response = await api.post('/addmetadata', {
            mapId: mapId,
            author: author,
            title: title,
            description: description,
            tags: tags,
            mapGraphicsType: mapGraphicsType,
        });
        console.log("response in request")
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error adding metadata:', error);
        throw error;
    }

};
export const getMetaDataByMapId = async(mapId) => {
    try{
        const response = await api.get(`/getMetaDataByMapId/${mapId}`);
        return response.data
    }catch(error){
        console.log(error)
    }
}

const apis = { addMetaData, getMetaDataByMapId };
export default apis;
