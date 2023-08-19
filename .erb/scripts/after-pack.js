const path = require('path');
const qiniu = require('qiniu');

const accessKey = 'QOsuzRd9w2rwhpD3WOCXUp1FE-GOZohDARFYMidh';
const secretKey = 'yd3m-8oePDB1WD2MGSsvj8vHtubPD4f4ORp7p42z';

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const rootPath = path.join(__dirname, '../..');
const versionPath = path.join(rootPath, 'version.json');

// 文件上传
function upload(key, localFile) {
  const putExtra = new qiniu.form_up.PutExtra();

  const options = {
    scope: `youdu-electron:${key}`,
  };

  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);

  const config = new qiniu.conf.Config();
  const formUploader = new qiniu.form_up.FormUploader(config);
  formUploader.putFile(
    uploadToken,
    key,
    localFile,
    putExtra,
    (respErr, respBody, respInfo) => {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode === 200) {
        console.log(respBody);
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    }
  );
}

exports.default = async function beforePack(context) {
  const { appOutDir, packager } = context;
  const { appInfo } = packager;
  const { productFilename } = appInfo;

  let asarPath = '';

  if (process.platform === 'darwin') {
    asarPath = path.join(
      appOutDir,
      `${productFilename}.app`,
      'Contents/Resources/app.asar'
    );
  } else if (process.platform === 'win32') {
    asarPath = path.join(
      appOutDir,
      `${productFilename}.app`,
      'Contents/Resources/app.asar'
    );
  }

  const keyAsar = 'next.asar';

  upload(keyAsar, asarPath);

  const versionAsar = 'version.json';

  upload(versionAsar, versionPath);
};
