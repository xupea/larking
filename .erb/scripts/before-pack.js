const path = require('path');
const { writeFileSync, readFileSync } = require('fs');

const { version } = require('../../release/app/package.json');

const rootPath = path.join(__dirname, '../..');
const versionPath = path.join(rootPath, 'version.json');

function updateVersion(v) {
  const data = readFileSync(versionPath);

  const parsedData = JSON.parse(data);
  parsedData.version = v;
  writeFileSync(versionPath, JSON.stringify(parsedData, null, 2));
}

exports.default = async function beforePack(context) {
  console.log(context);
  updateVersion(version);
};
