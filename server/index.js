const express = require('express')
const PORT = process.env.PORT || 9000
const app = express()
const crypto = require('crypto')
const { MongoClient } = require('mongodb')
var database =
  'mongodb+srv://Sample:sample@cluster0.q4obt.mongodb.net/Cluster0?retryWrites=true&w=majority'

const mongo = new MongoClient(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

require('dotenv').config()

app.listen(PORT, (err) => {
  if (err) throw err
  console.log(`Listening ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

  const data = {
    email: email
  }

  mongo.connect((error, client) => {
    if (error) throw error

    res.set({
      'Access-Control-Allow-Origin': '*'
    })

    const collection = client.db('details').collection('users')

    collection
      .find(data)
      .toArray()
      .then((coll) => {
        if (
          coll[0].email === email &&
          coll[0].password === getHash(password, coll[0].phone)
        )
          return res.redirect(process.env.NEXT)
        else return res.redirect(`${process.env.NEXT}/login`)
      })
      .catch((error) => {
        return res.redirect(`${process.env.NEXT}/login`)
      })
  })
})

app.post('/api/sign_up', (req, res) => {
  const { name, email, password, phone } = req.body

  const hashedPass = getHash(password, phone)

  res.set({
    'Access-Control-Allow-Origin': '*'
  })

  const data = {
    name: name,
    email: email,
    password: hashedPass,
    phone: phone
  }

  mongo.connect((error, client) => {
    if (error) throw error

    const collection = client.db('details').collection('users')

    collection
      .find({ email: data.email })
      .toArray()
      .then((item) => {
        if (item.length > 0) {
          res.redirect(`${process.env.NEXT}/signUp`)
          res.end()
        } else {
          collection.insertOne(data, (err) => {
            if (err) throw err

            res.redirect(`${process.env.NEXT}`)
            res.end()
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  })
})

const getHash = (pass, phone) => {
  const hmac = crypto.createHmac('sha256', phone)

  data = hmac.update(pass)
  gen_hmac = data.digest('hex')

  return gen_hmac
}
