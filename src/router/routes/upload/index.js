const multer = require('multer');
const fnv = require('fnv-plus');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'bmp':
      case 'png':
      case 'tiff':
      case 'raw':
      case 'psd':
      case 'svg':
      case 'swf':
      case 'tga':
        cb(null, 'static/uploads/images');
        break;
      case 'doc':
      case 'docx':
      default:
        cb(null, 'static/uploads/files');
        break;
    }
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${fnv.hash(file.originalname, 64).str()}.${ext}`);
  }
})

const uploadConf = multer({storage}).fields([
  {'name': 'files', maxCount: 10}
]);

module.exports = [
  {
    pathname: '/file_upload',
    method: 'post',
    eventHandler: [
      uploadConf,
      (req, res) => {
        const { files } = req.files;
        const response = {
          message: 'upload successfully',
          data: null
        }
        response.data = files && files.map((file) => ({
          name: file.filename,
          url: `http://${res.app.get('host_address')}/${file.path}`,
        }))
        res.send(JSON.stringify(response))
      }
    ]
  }
]