const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rateSchema = new Schema({
  currency: {type: String, required: true},
  rate: {type: Number, required: true},
}, {_id: false})
const exchangeRateSchema = new Schema({
  base: {type: String, required: true},
  rate: [rateSchema],
  business: {type: Schema.Types.ObjectID, ref: 'Business', default: null},
}, {timestamps: true})
module.exports = mongoose.model('ExchangeRate', exchangeRateSchema)
