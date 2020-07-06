const express = require('express');
const jwt = require('jsonwebtoken');
const middleware = require('../middlewares/verify-token')
const User = require('../models/user');
const router = express.Router();

// POST request - user signup
router.post('/signup', async (req, res, next) => {
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
// GET request - get auth user
router.get('/user', middleware, async function (req, res, next) {
  try {
    let user = await User.findById(req.decoded._id);
    if (user) {
      res.json({
        success: true,
        data: user
      })
    }
  } catch (e) {
    res.json({
      success: false,
      message: e.message
    })
  }
});
// POST request - user login
router.post('/login', async function (req, res, next) {
  try {
    let user = await User.findOne({phone:req.body.phone});
    if (user){
      if (user.comparePassword(req.body.password)){
        let token = jwt.sign(user.toJSON(), process.env.SECRET, {
          expiresIn: 604800//1 weak
        });
        res.json({
          status:true,
          token:token,
          user:user,
          message:'Authentication Success!'
        })
      }else {
        res.json({
          status:false,
          message:'Wrong password!',
        })
      }
    }else {
      res.json({
        status:false,
        message:'No user in our databases!',
      })
    }
  } catch (e) {
    res.status(e.response.status).json({
      success: false,
      message: e.message
    })
  }
});
module.exports = router;
