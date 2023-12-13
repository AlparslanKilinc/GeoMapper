const { Storage } = require('@google-cloud/storage');
const crypto = require('crypto');
const fetch = require('node-fetch');

const storage = new Storage();
const bucket = storage.bucket(process.env.GCS_BUCKET);

async function uploadImage(file, name) {
  try {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const destinationFileName = `uploads/${name}-${uniqueSuffix}`;

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

async function isDuplicateImage(newFile, existingFilePath) {
  const newFileHash = await generateFileHash(newFile.buffer);
  const existingFileHash = await generateFileHashFromURL(existingFilePath);
  console.log(newFileHash === existingFileHash);
  return newFileHash === existingFileHash;
}

async function generateFileHash(buffer) {
  const hash = crypto.createHash('md5');
  hash.update(buffer);
  return hash.digest('hex');
}

async function generateFileHashFromURL(url) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  return generateFileHash(buffer);
}

async function deleteFileFromGCS(filePath) {
  try {
    const fileName = filePath.split('/').pop();
    const fullPath = `uploads/${fileName}`;
    await bucket.file(fullPath).delete();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  uploadImage,
  isDuplicateImage,
  generateFileHash,
  generateFileHashFromURL,
  deleteFileFromGCS
};
