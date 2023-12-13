const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { getGeojsonIdNamePairs } = require('../controllers/geojson-controller');
const Geo = require('../models/geojson-model');
const expressApp = require('../server').app;

let mongoServer;
let serverInstance;

beforeAll(async () => {
    await mongoose.disconnect();
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    serverInstance = expressApp.listen();
});


afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    await new Promise((resolve) => serverInstance.close(resolve));
});
jest.mock('../models/geojson-model', () => ({
    find:jest.fn(),
}));


describe('GeoJSON API Tests', () => {

    const registerRandomUser = async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                userName: 'testUser',
                firstName: 'Test',
                lastName: 'User',
                email: 'testuser@example.com',
                password: 'testPassword',
                passwordVerify: 'testPassword'
            })
            .expect(201);
       return response.body.user;
    }
    const generateRandomGeoJSON = async  () => {
        const getRandomCoordinate = () => Math.random() * (180 - (-180)) - 180;
        const getRandomPopulation = () => Math.floor(Math.random() * 100);

        const feature = {
            type: 'Feature',
            properties: {
                population: getRandomPopulation(),
            },
            geometry: {
                type: 'Point',
                coordinates: [getRandomCoordinate(), getRandomCoordinate()],
            },
        };

        const featureCollection = {
            type: 'FeatureCollection',
            features: [feature],
        };

        return featureCollection;
    };

    // it('should return an error when creating GeoJSON', async() => {
    //     let geoJSONData = await generateRandomGeoJSON();
    //     const response = await request(app).post('/api/geojson/').send({
    //         compressedGeoJSON: null,
    //         ownerId: null,
    //         isPrivate: true,
    //         name: 'test geoJson'
    //     });

    //     expect(response.status).toBe(500);
    //     expect(response.body.message).toBe('Error creating GeoJSON');
    // })

    it('should return an error when no id is given', async() => {
        const id = null
        const response = await request(app)
            .get('/api/geojson/:id')
            .query({ id })
            .expect(500);
        expect(response.body.message).toBe('Error retrieving GeoJSON');
    })

    it('should return an error when valid query not given', async() => {
        const search = null
        const response = await(request(app))
            .get('/api/geojson/search/:query')
            .query({search})
            .expect(500);
        expect(response.body.message).toBe('Error performing search')
    })


})


