'use strict'

const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/gif' && file.mimetype !== 'image/jpeg') {
      console.log('Solo se permiten imagenes')
      var err = new Error('Unsupported media type')
      err.status = 415
      return cb(err)
    }
    cb(null, true)
  }
})

module.exports = upload
