const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 9000
const app = express()
const crypto = require('crypto')
const database = process.env.MONGO_DB || 'mongodb://localhost:27017'
require('dotenv').config()
const cors = require('cors')
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

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
  .catch((err) => console.log('ERR 💥:', err))

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: Number
})

const User = mongoose.model('User', userSchema)

app.post('/api/sign_up', async (req, res) => {
  const { name, phone, email, password } = req.body

  res.header('Content-Type', 'application/json')
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
  User.findOne({ email: email }).then((rez) => {
    if (rez === null) {
      try {
        User.create({
          name: name,
          phone: phone,
          email: email,
          password: getHash(password, phone)
        }).then((newUser) => {
          res.status(201).json({
            status: 'success',
            data: { user: newUser }
          })
        })
      } catch (err) {
        res.status(400).json({
          status: 'fail',
          message: err
        })
      }
    } else {
      res.status(401).json({
        status: 'fail',
        message: 'User already exists'
      })
    }
  })
})

app.get('/api/login', (req, res) => {
  mongo.connect((err, client) => {
    if (err) {
      throw err
    }

    const collection = client.db('details').collection('devices')
    collection.insertOne({ name: 'name123' }, (err) => {
      if (err) throw err
      res.end('SUCCESS')
    })
  })
})

app.post('/api/login', (req, res) => {
  const { email, password } = req.body

  res.header('Content-Type', 'application/json')
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
  User.findOne({ email: email }).then((rez) => {
    if (rez !== null) {
      if (
        rez.email === email &&
        rez.password === getHash(password, rez.phone.toString())
      )
        res.status(200).json({
          status: 'sucess'
        })
      else {
        res.status(400).json({
          status: 'fail',
          message: 'errrr'
        })
      }
    } else {
      console.log(rez)
      res.status(401).json({
        status: 'fail',
        message: 'User already exists'
      })
    }
  })
})

const getHash = (pass, phone) => {
  const hmac = crypto.createHmac('sha256', phone)

  data = hmac.update(pass)
  gen_hmac = data.digest('hex')

  return gen_hmac
}
