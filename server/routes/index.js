/* eslint-disable prettier/prettier */
const express = require('express')
const crypto = require('crypto')
const mongo = require('mongodb').MongoClient
const DATABASE_NAME = 'database_name'
const router = express.Router()
var database = "mongodb://localhost:27017";

function routes() {
  router.get('/sign_up', (req, res) => {
    res.set({
      'Access-Control-Allow-Origin': '*'
    })

    return res.redirect('/')
  })

  router.post('/test', (req, res) => {
    console.log('test')
    res.redirect('/');
  })

  router.post('/login', async (req, res) => {
    const {
      email,
      password
    } = req.body
    
    const data = {
      "email": email
    }
    var user = {}

    mongo.connect(database, (error, client) => {
      if (error) throw error
      
      var db = client.db(DATABASE_NAME)
      db.collection("details").find(data).toArray((err, collection) => {
        if (err) throw err
        user = collection
        
        if (collection.length >= 1) {
          collection.map((col) => {
            if (
              col.email === email &&
              col.password === getHash(password, col.phone)
            ) res.redirect('/')
          })
        } else {
          if (
            user.email === email &&
            user.password === getHash(pass, user.phone)
          ) res.redirect('/')
        }
        return res.redirect('/login')
      })
    })
  })

  router.post('/sign_up', (req, res) => {
    const {
      name,
      email,
      password,
      phone,
    } = req.body

    const hashedPass = getHash(password, phone)

    const data = {
      "name":name,
      "email":email,
      "password":hashedPass,
      "phone":phone
    }

    mongo.connect(database, (error, client) => {
      if (error) throw error

      var db = client.db(DATABASE_NAME)
      db.collection("details").insertOne(data, (err) => {
        if (err) throw err
        res.redirect('/')
      })
    })

    res.set({
      'Access-Control-Allow-Origin' : '*'
    })

  })

  const getHash = ( pass, phone ) => {
    const hmac = crypto.createHmac('sha256', phone)

    data = hmac.update(pass)
    gen_hmac = data.digest('hex')

    return gen_hmac
  }

  return router
}

module.exports = routes
