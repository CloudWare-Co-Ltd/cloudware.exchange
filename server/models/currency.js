const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const currencySchema = new Schema({
  name: {type: String, required: true},
  abbr: {type: String, required: true,unique:true},
  business: {type: Schema.Types.ObjectID, ref: 'Business', default: null},
},{timestamps:true})
module.exports = mongoose.model('Currency', currencySchema)
