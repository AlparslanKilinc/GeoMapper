import apis from '../store-request-api/geojsonRequestApi.js';
import Pbf from 'pbf';
import geobuf from 'geobuf';
// import the geojson file Africa.json with assertion

import africa from './africa.json' assert { type: 'json' };

const postGejson = async (geojson_raw, name) => {
  // Compress the geojson
  const compressedGeoJSON = Buffer.from(geobuf.encode(geojson_raw, new Pbf()));

  // compressedGeoJSON, ownerId, isPrivate, name;
  const response = await apis.createGeojson(compressedGeoJSON, null, false, name);

  // check if response ok
  if (response.status !== 201) {
    throw new Error('Error creating GeoJSON');
  } else {
    console.log(response.data.message);
  }
};

const fetchGeojsonById = async (id) => {
  const response = await apis.getGeojsonById(id);
  const geojson_raw = geobuf.decode(new Pbf(response.data));
  console.log(geojson_raw);
};

// postGejson(africa, 'Africa');
fetchGeojsonById('655e938c2fef3f8b5a56f8a1');
