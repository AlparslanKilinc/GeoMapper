import axios from 'axios';
axios.defaults.withCredentials = true;
const baseURL =
    process.env.NODE_ENV === 'production'
        ? 'https://geomapper-ylm6.onrender.com/api/map'
        : 'http://localhost:5001/api/map';

const api = axios.create({
    baseURL: baseURL
});
export const addMap = async () => {
    console.log("in request api")
    try {
        const response = await api.post('/addMap', {});
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateMap = async({mapId, graphicsId, stylesId, metadataId, geoId}) => {
    console.log("in upate map request api")
    try{
        const response = await api.post('/updateMap', {
            mapId: mapId,
            graphicsDataId: graphicsId,
            stylesDataId: stylesId,
            metadataId: metadataId,
            geoData: geoId,
        });
        console.log("response frm request")
        console.log(response.data)
        return response.data;
    }catch (error) {
        throw error;
    }
}

export const getMapById = (id) => {
    return api.get('/getMapById', {
        id: id
    });
};


const apis = { addMap, getMapById, updateMap };
export default apis;
