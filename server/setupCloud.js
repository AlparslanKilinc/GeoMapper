const fs = require('fs');
const path = require('path');

if (process.env.GOOGLE_CLOUD_KEY) {
  const keyFilePath = path.join(__dirname, 'google-cloud-key.json');
  fs.writeFileSync(keyFilePath, process.env.GOOGLE_CLOUD_KEY);

  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyFilePath;
}
