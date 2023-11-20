const fs = require('fs');
const path = require('path');

if (process.env.GOOGLE_CLOUD_KEY) {
  const keyFilePath = path.join('/tmp', 'google-cloud-key.json');
  const keyData = JSON.parse(process.env.GOOGLE_CLOUD_KEY);
  fs.writeFileSync(keyFilePath, JSON.stringify(keyData));
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyFilePath;
}
