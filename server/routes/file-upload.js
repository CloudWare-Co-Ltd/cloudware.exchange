const express = require('express');
const router = express.Router();
const multer = require('multer');
// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/files');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({storage: storage});
// POST request - create a new staff
router.post('/', upload.single('file'), async (req, res, next) => {
  let hostname = 'http://localhost:3000/files/'
  try {
    res.json({
      status: true,
      location: hostname+req.file.filename,
      message: 'Successfully uploaded!'
    })
  } catch (e) {
    res.json({
      status: false,
      // message: e.message.split(':')[0]
      message: e.message
    })
  }
});
// POST request - create a new staff
router.post('/gallery', (req, res, next) => {
  res.json('done')
});
module.exports = router;
