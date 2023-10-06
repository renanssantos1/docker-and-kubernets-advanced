const keys = require('./keys')

const express = require('express')
const bodyParser  = require('body-parser')
const cors = require('cors')
const {Pool} = require('pg')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Setup Postgress
const pgClient = new Pool({
    user: keys.pgUser,
    port: keys.pgPort,
    host: keys.pgHost,
    database: keys.pgDataBase,
    password: keys.pgPassword,
})

pgClient.on('error', () => console.log('Lost PG connection'))

pgClient
    .query('CREATE TABLE IF NOT EXISTS values(number INT)')
    .catch((err) => console.log(err))