import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import client from './database'

const app: express.Application = express()
const address = '0.0.0.0:3000'

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!')
})

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
