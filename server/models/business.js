const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const businessSchema = new Schema({
  name: {type: String, required: true},
  logo: {type: String, required: true},
  address: {type: String, required: true},
  contact: {type: String, required: true},
  location: {type: String, required: true},
},{timestamps:true})
module.exports = mongoose.model('Business', businessSchema)
