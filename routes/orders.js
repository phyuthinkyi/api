const express = require('express')
const router = express.Router()

const Order = require('../models/orders')
router.post('/', (req, res) => {
  const order = new Order({
    voucherNo: req.body.voucherNo,
    productList: req.body.productlist,
    discount: req.body.discount,
    totalAmount: req.body.description,
  })

  order.save().then(order => {
    console.log("Success Order", order)
    res.status(200).send({
      "error": false,
      "message": "Successful Order!"
    })
  }).catch(error => {
    res.status(500).send("User was not store in db", error)
  })
})

//Get All Orders
router.get('/', (req, res) => {
  Order.find()
    .then((orders) => res.status(200).send(orders))
    .catch((error) => {
      res.status(500).send({
        "error": true,
        "message": "Something Wrong!"
      })
    })
})
