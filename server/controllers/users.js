const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function del(req, res) {
  const mongoose = require('mongoose')
  mongoose.connection.db.dropDatabase(function (err, result) {
    console.log(err + result)
  })
}

async function create(req, res) {
  var { name, email, phone, password } = req.body

  const queryName = req.query.name
  const queryEmail = req.query.email
  const queryPhone = req.query.phone
  const queryPassword = req.query.password

  if (!name) name = queryName
  if (!email) email = queryEmail
  if (!phone) phone = queryPhone
  if (!password) password = queryPassword

  await User.create({
    name,
    email,
    phone,
    password
  })
    .then((rez) => {
      res.json({
        rez,
        message: 'Create user success'
      })
    })
    .catch((err) => console.log('ERR 💥:', err))
}

async function login(req, res) {
  var { email, password } = req.body
  const queryEmail = req.query.email
  const queryPassword = req.query.password

  if (!email) email = queryEmail
  if (!password) password = queryPassword

  const user = await User.findOne({ email })

  if (!user) throw Error('User not found')

  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ user }, 'yourSecretKey', {
      expiresIn: '24h'
    })
    console.log(token)

    res.json({
      user,
      token,
      message: 'sign user success'
    })
  } else {
    res.status(401).json({
      message: 'Unauthenticated'
    })
  }
}

module.exports = { login, create, del }