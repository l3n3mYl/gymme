const User = require('../models/user')
const Plan = require('../models/plan')

async function getInfo(req, res) {
  const user = await User.find({})

  res.json({
    user,
    message: 'Get user info success'
  })
}

async function changeInfo(req, res) {
  const user = await User.findOne({})
  const body = req.body
  const query = req.query

  if (body) {
    Object.keys(body).forEach((key) => {
      user[key] = body[key]
    })
  } else {
    Object.keys(query).forEach((key) => {
      user[key] = query[key]
    })
  }

  if (body.plan) {
    user.plan = new Plan({
      name: body.plan.name,
      expiration: body.plan.expiration
    })
  } else if (query.plan) {
    user.plan = new Plan({
      name: query.plan.name,
      expiration: query.plan.expiration
    })
  }

  var email = body.email
  if (!email) email = query.email
  const dupEmail = await User.findOne({ email })
  if (!dupEmail) {
    await user
      .save()
      .then((rez) => {
        res.status(200).json({
          rez,
          message: 'Update user info success'
        })
      })
      .catch((err) => console.log('ERR 💥:', err))
  } else {
    res.status(401).json({
      status: 'fail',
      message: 'Email already in use'
    })
  }
}

async function changePlan(req, res) {
  var { plan } = req.body

  const user = await User.findOne({})

  if (plan) {
    user.plan = new Plan({
      name: plan.name,
      expiration: plan.expiration
    })
  }

  await user
    .save()
    .then((rez) => {
      console.log(rez)
      res.json({
        rez,
        message: 'Update plan success'
      })
    })
    .catch((err) => console.log('ERR 💥:', err))
}

module.exports = {
  getInfo,
  changeInfo,
  changePlan
}
