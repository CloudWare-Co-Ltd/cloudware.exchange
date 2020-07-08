const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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
    data.logo = host + 'images/' + req.file.filename;
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
// DELETE request - delete a business
router.delete('/:id/delete', async (req, res, next) => {
  try {
    let id = req.params.id
    //remove file
    let business = await Business.findById(id);
    const image = path.join(__dirname, '../public/images/' + business.logo.split('images/')[1]);
    fs.unlinkSync(image)
    //end remove file
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
// GET request - edit a business
router.get('/:id/edit', upload.single('logo'), async (req, res, next) => {
  try {
    let id = req.params.id
    let business = await Business.findById(id);
    res.json({
      status: true,
      data: business,
      message: 'Successfully deleted!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// PUT request - update post
router.put('/:id/update', async (req, res, next) => {
  let id = req.params.id;
  try {
    let business = await Business.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.json({
      status: true,
      data: business,
      message: 'Successfully updated!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// PUT request - update post logo
router.put('/:id/update-logo', upload.single('logo'), async (req, res, next) => {
  let id = req.params.id;
  try {
    let host = 'http://localhost:3000/'
    req.body.logo = host+'images/' + req.file.filename;
    //update and remove file
    let logo = await Business.findByIdAndUpdate(id, {$set: req.body});
    const image = path.join(__dirname, '../public/images/' + logo.logo.split('images/')[1]);
    fs.unlinkSync(image)
    //end update and remove file
    let business = await Business.findById(id);
    res.json({
      status: true,
      data: business,
      message: 'Successfully updated!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
module.exports = router;
