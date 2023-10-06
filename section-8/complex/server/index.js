const keys = require('./keys')

const express = require('express')
const bodyParser  = require('body-parser')
const cors = require('cors')
const {Pool} = require('pg')
const redis = require('redis')

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

pgClient.on("connect", (client) => {
    client
      .query("CREATE TABLE IF NOT EXISTS values (number INT)")
      .catch((err) => console.error(err));
});

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
})

const redisPublisher = redisClient.duplicate() 

// Express route handlers