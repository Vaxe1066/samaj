const multer = require('multer');
const fs = require('fs-extra');
const util = require("util");

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/images'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

var uploadFile = multer({ storage: storage }).single("file");
var upload = util.promisify(uploadFile);


const uploadFileMiddleware = {
    upload
  };
  module.exports = uploadFileMiddleware;

