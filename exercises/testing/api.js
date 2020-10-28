const express = require('express')
const morgan = require('morgan')
const { urlencoded, json } = require('body-parser')
const users = require('./users')
const app = express()

app.use(morgan('dev'))
app.use(urlencoded({extended: true}))
app.use(json())

app.get('/user/:id', async (req, res) => {
  const id = req.params.id
  // should ge user by given id in route param
  const user = await users.findUser(id);
  if (user) {
    res.status(200).send(user)
  } else {
    res.status(404).send('User not found')
  }
})

app.delete('/user/:id', async (req, res) => {
  const id = req.id
  await users.deleteUser(id)
  res.status(201).send({id})
})

module.exports = app
