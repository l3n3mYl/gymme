const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

function setPassword(value) {
  return bcrypt.hashSync(value, 10)
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: setPassword
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan'
  }
})

const model = mongoose.model('User', UserSchema)

module.exports = model
