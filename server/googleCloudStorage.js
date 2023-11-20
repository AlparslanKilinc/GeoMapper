const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

module.exports = { storage, bucket };
