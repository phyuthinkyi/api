const mongoose = require('mongoose')
const productList = require('./productlist')
const OrderSchema = new mongoose.Schema({
  voucherNo: {
    type: String,
    required: true,
  },
  productList,
  discount: {
    type: Number,
  },
  totalAmount: {
    type: Number,
  }
})

module.exports = mongoose.model('Order', OrderSchema, 'orders')


