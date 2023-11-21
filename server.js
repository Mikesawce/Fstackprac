const express = require('express')
const pool = require('./db')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

const port = process.env.port || 1337

app.listen(port, () => {
    console.log('listening')
})