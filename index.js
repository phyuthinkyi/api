const express = require('express')
const mongoose = require('mongoose')
const winston = require('winston') //for logger
const app = express()
require('dotenv').config()
const usersRoute = require('./routes/users')
const productRoute = require('./routes/products')

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//create a logger (install winston with npm and copy code from npm winston package)
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({
        all: true
      }))
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log' })
  ]
});

//connect to mongodb atlas
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => {
  //logger.log("info", "connected to Mongodb Atals")
  logger.info("Connected to Mongodb Atals") // the same with upper line log => logger.log("info", "connected")
  //console.log("Connected to Mongodb Atals")
}).catch(error => {
  logger.error(error.message)
  //logger.log("error", error.message) 
})

//routes
//https://mobidevzoneshopapi.herokuapp.com/ (url)
app.use('/api/users', usersRoute)
app.use('/api/products', productRoute)
app.use('/api/orders')

app.listen(PORT, ()=> {
  //console.log("Server Started at PORT", PORT)
  logger.log("info", `Server started at PORT at ${PORT}`)
  //logger.warn(`Server started at PORT at ${PORT}`)
})