const express = require('express');
const jwt = require('jsonwebtoken');
const middleware = require('../middlewares/verify-token')
const User = require('../models/user');
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
router.post('/', upload.single('photo'), async (req, res, next) => {
  try {
    let host = 'http://localhost:3000/'
    let data = JSON.parse(req.body.data);
    data.photo = host + 'images/' + req.file.filename;
    let user = new User(data);
    await user.save();
    let token = jwt.sign(user.toJSON(), process.env.SECRET, {
      expiresIn: 604800//1 weak
    });
    res.json({
      status: true,
      token: token,
      data: user,
      message: 'Successfully create a new user'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// READ - read all users by business
router.get('/:id/fetch-by-business', async function (req, res, next) {
  try {
    let business_id = req.params.id
    let users = await User.find({business: business_id});
    if (users) {
      res.json({
        status: true,
        data: users
      })
    }
  } catch (e) {
    res.json({
      status: false,
      message: e.message
    })
  }
});
//UPDATE - user
router.put('/:id/update', async (req, res, next) => {
  let id = req.params.id;
  try {
    let user = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.json({
      status: true,
      data: user,
      message: 'Successfully updated!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// UPDATE - user photo
router.put('/:id/update-photo', upload.single('photo'), async (req, res, next) => {
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
//DELETE
router.delete('/:id/delete', async (req, res, next) => {
  try {
    let id = req.params.id
    //remove file
    let user = await User.findById(id);
    const image = path.join(__dirname, '../public/images/' + user.photo.split('images/')[1]);
    fs.unlinkSync(image)
    //end remove file
    await User.findByIdAndDelete(id);
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
