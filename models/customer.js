// const mongoose = require('mongoose')

// const customerSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
// });
// models/Customer.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
  name:String,
  age:Number
});


const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
