const express = require('express')
const router = express.Router();
//const User = require('../models/users'); //export with module.exports
const { User, validateUser } = require('../models/users') //exports.User

//POST:  CREATE A NEW USER
router.post('/', async (req, res) => {
  const message = await validateUser(req.body);
  if (message.error) res.status(400).send(message)
  const user = new User({
    first_name: req.body.firstName,
    second_name: req.body.secondName,
    username: req.body.username,
    password: req.body.password,
    address: req.body.address
  });

  user.save().then(user => {
    console.log("Everything Well")
    res.status(200).send({
      "error": false,
      "message": "Signup Successful!"
    });
  }).catch(error => {
    res.status(500).send("User was not store in db", error)
  })

  // user.save(function(err, user){
  //   if(err) return res.status(500).send("User was not store in db", err)
  //   console.log("Successfully Save User!")
  //   res.status(200).send({
  //     "error": false,
  //     "message": "Signup Successful!"
  //   })
  // })

})


//Get All Users
router.get('/', (req, res) => {
  User.find()
    .then((users) => {
      if(users.length == 0){
        res.status(404).send({
          "error": true,
          "message": "User Not Found"
        })
      }else{
        res.status(200).send(users)
      }
    })
    .catch((error) => {
      res.status(500).send({
        "error": true,
        "message": "Something Wrong!"
      })
    })
})

//Get User by ID
router.get('/:userId', (req, res) => {
  User.findById(req.params.userId).then(user => {
    console.log("get user by Id", user)
    if (user) res.status(200).send(user);
    res.status(404).send({
      error: false,
      message: "User Not Found!"
    })
  }).catch(error => {
    res.status(500).send({
      "error": true,
      "message": "User Not Found"
    })
  })
})

//Get user by username and password
router.get('/:username/:password', (req, res) => {
  User.find({ username: req.params.username, password: req.params.password })
    .then(user => {
      console.log("I'm here....", user)
      if(user.length == 0)  res.status(404).send({error: true, message: "Username or Password incorrect!"})
      if (user) {
        let u = user[0].toObject()
        u["error"] = false;
        u["message"] = "Login Successful!"
        res.status(200).send(u)
      }
    }).catch(error => {
      res.status(500).send({
        "error": true,
        "message": "Something Wrong with Server!"
      })
    })
})

//Update user by Id
router.put('/:userId', (req, res) => {
  User.findByIdAndUpdate(req.params.userId, {
    first_name: req.body.firstName,
    second_name: req.body.secondName,
    address: req.body.address
  }, {new: true}).then(user => {
      res.status(200).send(user)
  }).catch(error => {
    res.status(500).send({
      "error": true,
      "message": "Invalid User"
    })
  })
})

//Delete User based on Id
router.delete('/:userId', (req, res) => {
    User.findByIdAndRemove(req.params.userId).then(user => {
      res.status(200).send({
        "error": false,
        "message": "Deleted user Successfully"
      }).catch(error => {
        res.status(500).send({
          "error": true,
          "message": "User Not Found by Id"
        })
      })
    })
})

module.exports = router;