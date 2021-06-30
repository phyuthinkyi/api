const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000;

//connect to mongodb atlas
mongoose.connect(process.env.MONGO_URL,
{
  useNewUrlParser: true
}
)
.then(() => {
  console.log("Connected to Mongodb Atals")
}).catch(error => {
  console.log("Something Wrong Happen", error)
})

app.listen(PORT, ()=> {
  console.log("Server Started at PORT", PORT)
})