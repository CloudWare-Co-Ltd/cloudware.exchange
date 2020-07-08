const express = require('express');
const jwt = require('jsonwebtoken');
const middleware = require('../middlewares/verify-token')
const User = require('../models/user');
const router = express.Router();

// POST request - create new user
router.post('/', async (req, res, next) => {
  try {
    let user = new User(req.body);
    await user.save();
    let token = jwt.sign(user.toJSON(), process.env.SECRET, {
      expiresIn: 604800//1 weak
    });
    res.json({
      status: true,
      token:token,
      user:user,
      message: 'Successfully create a new user'
    })
  } catch (e) {
    res.json({
      status: false,
      // message: 'User existed in database'
      message: e.message.split(':')[0]
    })
  }
});
// GET request - get all user
router.get('/:id/fetch-by-business', async function (req, res, next) {
  try {
    let business_id = req.params.id
    let users = await User.find({business:business_id});
    if (users) {
      res.json({
        success: true,
        data: users
      })
    }
  } catch (e) {
    res.json({
      success: false,
      message: e.message
    })
  }
});
module.exports = router;
