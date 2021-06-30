const express = require('express')
const router = express.Router();
const User = require('../models/users');

//POST:  CREATE A NEW USER
router.post('/',(req, res) => {
   const user = new User({
      first_name: req.body.firstName,
      second_name: req.body.secondName,
      username: req.body.username,
      password: req.body.password,
      address: req.body.address
    });

    // user.save(function(err, user){
    //   if(err) return res.status(500).send("User was not store in db", err)
    //   console.log("Successfully Save User!")
    //   res.status(200).send({
    //     "error": false,
    //     "message": "Signup Successful!"
    //   })
    // })
    user.save().then(user => {
      console.log("Everything Well")
      res.status(200).send({
        "error": false,
        "message": "Signup Successful!"
      });
    }).catch(error => {
      res.status(500).send("User was not store in db", error)
    })
})

module.exports = router;