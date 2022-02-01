const express = require('express')
// const next = require('next')

const PORT = process.env.PORT || 9000
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
const app = express()
// const handle = app.getRequestHandler()

const crypto = require('crypto')
// const mongo = require('mongodb').MongoClient
const { MongoClient } = require('mongodb')
const DATABASE_NAME = 'database_name'
// const router = express.Router()
// var database = 'mongodb://localhost:27017'
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
    if(err) {
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
  var user = {}

  mongo.connect(database, (error, client) => {
    if (error) throw error

    var db = client.db(DATABASE_NAME)
    db.collection('details')
      .find(data)
      .toArray((err, collection) => {
        if (err) throw err
        user = collection

        if (collection.length >= 1) {
          collection.map((col) => {
            if (
              col.email === email &&
              col.password === getHash(password, col.phone)
            )
              return res.redirect(process.env.NEXT)
          })
        } else {
          if (
            user.email === email &&
            user.password === getHash(pass, user.phone)
          )
            res.redirect(process.env.NEXT)
        }
        return res.redirect(`${process.env.NEXT}/login`)
      })
  })
})

app.post('/api/sign_up', (req, res) => {
  const { name, email, password, phone } = req.body

  const hashedPass = getHash(password, phone)

  const data = {
    name: name,
    email: email,
    password: hashedPass,
    phone: phone
  }

  mongo.connect(database, (error, client) => {
    if (error) throw error

    var db = client.db(DATABASE_NAME)
    db.collection('details').insertOne(data, (err) => {
      if (err) throw err
      res.redirect(`${process.env.NEXT}`)
    })
  })

  res.set({
    'Access-Control-Allow-Origin': '*'
  })
})

const getHash = (pass, phone) => {
  const hmac = crypto.createHmac('sha256', phone)

  data = hmac.update(pass)
  gen_hmac = data.digest('hex')

  return gen_hmac
}

// app
//   .prepare()
//   .then(() => {
//     const server = express()
//     const showRoutes = require('./routes/index.js')

//     server.use(express.json())
//     server.use(express.urlencoded({ extended: true }))

//     server.use('/api', showRoutes(server))

//     server.get('*', (req, res) => {
//       return handle(req, res)
//     })

//     server.listen(PORT, (err) => {
//       if (err) throw err
//       console.log(`> Ready on ${PORT}`)
//     })
//   })
//   .catch((ex) => {
//     console.error(ex.stack)
//     process.exit(1)
//   })
