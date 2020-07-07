const express = require('express');
const router = express.Router();
const multer = require('multer');
const Business = require('../models/business');
// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({storage: storage});
// POST request - create a new business
router.post('/', upload.single('logo'), async (req, res, next) => {
  try {
    let host = 'http://localhost:3000/'
    let data = JSON.parse(req.body.data);
    data.logo = host+'images/' + req.file.filename;
    let business = new Business(data);
    await business.save();
    res.json({
      status: true,
      data: business,
      message: 'Successfully saved!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// POST request - create a new business
router.delete('/:id/delete', upload.single('logo'), async (req, res, next) => {
  try {
    let id = req.params.id
    await Business.findByIdAndDelete(id);
    res.json({
      status: true,
      message: 'Successfully deleted!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// GET request - fetch businesses
router.get('/', async (req, res, next) => {
  try {
    let businesses = await Business.find();
    res.json({
      status: true,
      data: businesses,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
module.exports = router;
