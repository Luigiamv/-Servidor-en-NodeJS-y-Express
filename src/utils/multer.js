const multer = require('multer');
const path = require('path');
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error('Solo se permite imagenes con extensiones .png, .jpg & .jpeg')
      );
    }
  },
});
const multerMiddleware = multer({
  storage: multerConfig,
});

module.exports = { multerMiddleware };
