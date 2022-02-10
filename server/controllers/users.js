const { User, Plan } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY || 'yourSecretKey'

async function del(req, res) {
  const mongoose = require('mongoose')
  mongoose.connection.db.dropDatabase(function (err, result) {
    if(err) console.log(err)
    console.log(result)

    res.status(69).json({
      message: 'nice',
    })
  })
}

async function verifyJWT(req, res) {
  const token = req.body.token

  try {
    const verification = jwt.verify(token, secret)
    res.status(200).json({
      user: verification.user
    })
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error
    })
  }
}

async function create(req, res) {
  var { name, email, phone, password } = req.body

  const queryName = req.query.name
  const queryEmail = req.query.email
  const queryPhone = req.query.phone
  const queryPassword = req.query.password
  const plan = new Plan({
    name: 'None',
    expiration: '1999-01-01'
  })

  if (!name) name = queryName
  if (!email) email = queryEmail
  if (!phone) phone = queryPhone
  if (!password) password = queryPassword

  const user = await User.findOne({ email })

  if (!user) {
    await User.create({
      name: name,
      email: email,
      phone: phone,
      password: password,
      plan: plan
    })
      .then((rez) => {
        res.json({
          rez,
          message: 'Create user success'
        })
      })
      .catch((err) => {
        console.log('ERR 💥:', err)
        res.status(400).json({
          status: 'failed',
          message: 'Something went wrong'
        })
      })
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'User already exists'
    })
  }
}

async function login(req, res) {
  var { email, password } = req.body
  const queryEmail = req.query.email
  const queryPassword = req.query.password

  if (!email) email = queryEmail
  if (!password) password = queryPassword

  const user = await User.findOne({ email })

  if (!user) {
    res.status(400).json({
      message: 'User does not exist'
    })
    return
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ user }, secret, {
      expiresIn: '12h'
    })

    res.status(200).json({
      user,
      token,
      message: 'sign user success'
    })
  } else {
    res.status(process.env.MONGO_DB).json({
      message: 'Unauthenticated'
    })
  }
}

module.exports = { login, create, del, verifyJWT }
