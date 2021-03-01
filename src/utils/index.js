const multer = require('multer');
const fnv = require('fnv-plus')

// 处理文件的配置
const storage =multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    switch(ext) {
      case 'jpeg':
        // cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
        cb(null, `${fnv.hash(file.originalname, 64).str()}.${ext}`);
        break;
      default:
        cb(null, file.fieldname + '-' + Date.now())
    }
  }
})
exports.uploadConf = multer({storage: storage});