const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucket = storage.bucket(process.env.GCS_BUCKET);

module.exports = { storage, bucket, uploadToGoogleCloud };
