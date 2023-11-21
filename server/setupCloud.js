const fs = require('fs');
const path = require('path');

const secretFilePath = '/etc/secrets/google-cloud-key.json';

if (fs.existsSync(secretFilePath)) {
  const keyData = JSON.parse(fs.readFileSync(secretFilePath, 'utf8'));

  const keyFilePath = path.join('/tmp', 'google-cloud-key.json');
  fs.writeFileSync(keyFilePath, JSON.stringify(keyData));

  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyFilePath;
}
