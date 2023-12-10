const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucket = storage.bucket(process.env.GCS_BUCKET);

async function uploadToGoogleCloud(file, name) {
  try {
    // Specify the destination file name in the bucket
    const destinationFileName = `uploads/${Date.now()}-${name}-${file.originalname}`;

    // Create a reference to the file in the bucket
    const blob = bucket.file(destinationFileName);
    const blobStream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        reject(err);
      });

      blobStream.on('finish', async () => {
        // Construct the public URL for the file
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      });

      // End the stream
      blobStream.end(file.buffer);
    });
  } catch (error) {
    console.log('Error uploading to Google Cloud Storage:', error);
    throw error;
  }
}

module.exports = { storage, bucket, uploadToGoogleCloud };
