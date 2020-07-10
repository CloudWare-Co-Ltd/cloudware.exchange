const express = require('express');
const Currency = require('../models/currency');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
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
/********CRUD********/
// CREATE
router.post('/', async (req, res, next) => {
  try {
    let currency = new Currency(req.body);
    await currency.save();
    res.json({
      status: true,
      data: currency,
      message: 'Successfully saved'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// READ - read all currencies by business
router.get('/:id/fetch-by-business', async function (req, res, next) {
  try {
    let business_id = req.params.id
    let currencies = await Currency.find({business: business_id});
    if (currencies) {
      res.json({
        status: true,
        data: currencies
      })
    }
  } catch (e) {
    res.json({
      status: false,
      message: e.message
    })
  }
});
//UPDATE - currency
router.put('/:id/update', async (req, res, next) => {
  let id = req.params.id;
  try {
    let currency = await Currency.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.json({
      status: true,
      data: currency,
      message: 'Successfully updated!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// UPDATE - currency photo
router.put('/:id/update-photo', upload.single('photo'), async (req, res, next) => {
  let id = req.params.id;
  try {
    let host = 'http://localhost:3000/'
    req.body.photo = host+'images/' + req.file.filename;
    //update and remove file
    let photo = await Currency.findByIdAndUpdate(id, {$set: req.body});
    const image = path.join(__dirname, '../public/images/' + photo.photo.split('images/')[1]);
    fs.unlinkSync(image)
    //end update and remove file
    let business = await Currency.findById(id);
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
//DELETE
router.delete('/:id/delete', async (req, res, next) => {
  try {
    let id = req.params.id
    //remove file
    let currency = await Currency.findById(id);
    const image = path.join(__dirname, '../public/images/' + currency.photo.split('images/')[1]);
    fs.unlinkSync(image)
    //end remove file
    await Currency.findByIdAndDelete(id);
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
/********END CRUD********/
module.exports = router;
