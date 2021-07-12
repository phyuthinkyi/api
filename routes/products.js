const express = require('express')
const router = express.Router()

const Product = require('../models/products')

router.post('/', (req, res) => {
  const product = new Product({
    productName: req.body.productName,
    price: req.body.price,
    discount: req.body.discount,
    description: req.body.description,
    imgUrl: req.body.imgUrl
  })

  product.save().then(product => {
    res.status(200).send({
      "error": false,
      "message": "Product was successfully created!"
    })
  }).catch(error => {
    res.status(500).send("User was not store in db", error)
  })
})


//Get All Products
router.get('/', (req, res) => {
  Product.find()
    .then((products) => res.status(200).send(products))
    .catch((error) => {
      res.status(500).send({
        "error": true,
        "message": "Something Wrong!"
      })
    })
})

module.exports = router