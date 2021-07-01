const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  description: {
    type: String,
  },
  imgUrl: {
    type: String
  }
})

module.exports = mongoose.model('Product', ProductSchema, 'products')


