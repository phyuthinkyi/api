const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const usersRoute = require('./routes/users')

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
app.use('/api/users', usersRoute)

//connect to mongodb atlas
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => {
  console.log("Connected to Mongodb Atals")
}).catch(error => {
  console.log("Something Wrong Happen", error)
})

app.listen(PORT, ()=> {
  console.log("Server Started at PORT", PORT)
})