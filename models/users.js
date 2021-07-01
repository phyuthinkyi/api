const mongoose = require('mongoose')
const yup = require('yup')
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
    minlength: 4,
    //maxlength: 50,
  },
  address: {
    type: String,
  }
})

const validateUser = async user => {
  const schema = yup.object().shape({
    firstName: yup.string().required().min(1).max(50),
    secondName: yup.string().required().min(1).max(50),
    username: yup.string().required(),
    password: yup.string().required().min(4)
  })

  return schema.validate(user)
  .then(user => {
    return{
      "error": false,
      "message": "Signup Successful!"
    }
  })
  .catch(error => {
    console.log("Error", error)
    return{
      error: true,
      message: error.message
    }
  })
}

//module.exports = mongoose.model('User', UserSchema, 'users');

exports.User = mongoose.model('User', UserSchema, 'users');
exports.validateUser = validateUser;