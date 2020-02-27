const jwt = require('jsonwebtoken');
const pubicPaths = ['/user/register', '/user/authenticate'];
const multer = require('multer');
const imagePaths = ['/add', '/updatebyid'];

module.exports = {
  imageupload: (req, res, next) => {

    if (imagePaths.includes(req.path)) {
      const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
          console.log('des');
          cb(null, 'images');
        },
        filename: (req, file, cb) => {
          console.log('name');
          cb(null, (new Date().getTime() + '-' + file.originalname).replace(' ', ''));
        }
      });

      const fileFilter = (req, file, cb) => {
        if (
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/jpeg' ||
          file.siz
        ) {
          console.log('filefilter');
          cb(null, true);
        } else {
          cb(null, false);
        }
      };

      multer({ storage: fileStorage, limits: { fileSize: 550000 }, fileFilter: fileFilter }).array('images', 3)(req, res, function (err) {
        //Catching and handling errors of multer
        if (err instanceof multer.MulterError) {
          return next(err);
        } else if (err) {
          console.log(err);
          if (err instanceof ErrorParent) {
            return next(err);
          }
          return next(err);
        }
        //Everything is ok
        next();
      });
    } else {
      next();
    }
  },

}