const mongoose = require('mongoose')

//User Schema
const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  second_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  address: {
    type: String,
  }
})

module.exports = mongoose.model('User', UserSchema)