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
    Object.keys(query).forEach((key) => {
      user[key] = query[key]
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

  await user
    .save()
    .then((rez) => {
      console.log(rez)
      res.json({
        rez,
        message: 'Update user info success'
      })
    })
    .catch((err) => console.log('ERR 💥:', err))
}

async function changePlan(req, res) {
  var { plan } = req.body
  const queryPlan = query.body.plan

  const user = await User.findOne({})

  if (!plan) plan = queryPlan

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
