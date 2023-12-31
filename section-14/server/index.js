const keys = require('./keys')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Pool } = require('pg')
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
app.get('/', (req, res) => {
  res.send('Hi')
})

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values')

  res.send(values.rows)
})

app.get('/values/current', async (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.send(values)
  })
})

app.post('/values', async (req, res) => {
  const index = req.body.index

  if (parseInt(index) > 40) {
    return res.status(422).send({ message: 'Index to high' })
  }

  redisClient.hset('values', index, 'Nothing yet!')
  redisPublisher.publish('insert', index)

  pgClient.query('INSERT INTO values(number) VALUES($1)', [index])

  res.send({ working: true })
})


app.listen(5000, () => {
  console.info('app on listening on port 5000!')
})