const mongoose = require('mongoose')

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

const model = mongoose.model('Plan', PlanSchema)

module.exports = model
