const mongoose = require('mongoose')
const products = require('./products')
const productListSchema = new mongoose.Schema([
  products
])

module.exports = mongoose.model('ProductList', productListSchema, 'ProdutLists');