const express = require('express');
const ExchangeRate = require('../models/exchange-rate');
const router = express.Router();
/********CRUD********/
// CREATE
router.post('/', async (req, res, next) => {
  try {
    let exchange_rate = new ExchangeRate(req.body);
    await exchange_rate.save();
    res.json({
      status: true,
      data: exchange_rate,
      message: 'Successfully saved'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// READ - read all exchange_rates by business
router.get('/:id/fetch-by-business', async function (req, res, next) {
  try {
    let business_id = req.params.id
    let exchange_rates = await ExchangeRate.find({business: business_id});
    if (exchange_rates) {
      res.json({
        status: true,
        data: exchange_rates
      })
    }
  } catch (e) {
    res.json({
      status: false,
      message: e.message
    })
  }
});
//UPDATE - exchange_rate
router.put('/:id/update', async (req, res, next) => {
  let id = req.params.id;
  try {
    let exchange_rate = await ExchangeRate.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.json({
      status: true,
      data: exchange_rate,
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
    await ExchangeRate.findByIdAndDelete(id);
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
