import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import client from './database'
import productsRoute from './routes/products'
import usersRoute from './routes/users'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const address = '0.0.0.0:3000'

app.use(bodyParser.json())

if (process.env.ENV !== 'test') app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', usersRoute)
app.use('/product', productsRoute)

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
  client
    .connect()
    .then(() => console.log('connected to DB successfully'))
    .catch(() =>
      console.error(
        '\nfailed to connect to the DB \nmake sure your DB is up and running\n'
      )
    )
})
export default app
