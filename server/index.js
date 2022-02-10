require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 9000
const app = express()
const database = process.env.MONGO_DB || 'mongodb://localhost:27017'
const userRouter = require('./routes/user')
const cors = require('cors')
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

app.use('/users', userRouter)

app.listen(PORT, (err) => {
  if (err) throw err
  console.log(`Listening ${PORT}`)
})

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection success'))
  .catch((err) => console.log(process.env))
