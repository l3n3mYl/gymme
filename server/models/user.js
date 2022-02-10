const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

function setPassword(value) {
  return bcrypt.hashSync(value, 10)
}

const PlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  expiration: {
    type: Date,
    required: true
  }
})

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
    type: PlanSchema
  }
})

const Plan = mongoose.model('Plan', PlanSchema)
const User = mongoose.model('User', UserSchema)

module.exports = { Plan, User }
