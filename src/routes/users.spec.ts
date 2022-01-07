import client from '../database'
import supertest from 'supertest'
import app from '../server'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
const request = supertest(app)
const info = { token: '', user_id: 1 }
describe(`Users Route`, () => {
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query(`DELETE FROM users;`)
    conn.release()
  })
  it('post /user should return success', async () => {
    const response = await request
      .post('/user')
      .set('Content-type', 'application/json')
      .send({
        firstname: 'test',
        lastname: 'user',
        password: 'password',
      })
    info.token = 'Bearer ' + response.body.token
    console.log(response.body)
    expect(response.statusCode).toEqual(200)
  })
  it('get /user with token should return all users', async () => {
    const response = await request
      .get('/user')
      .set('Content-type', 'application/json')
      .set('authorization', info.token)

    const salt = await bcrypt.genSalt(
      parseInt(process.env.SALT_ROUNDS as string)
    )

    const paper = process.env.BCRYPT_PASSWORD
    const hash = await bcrypt.hash('password' + paper, salt)

    expect(response.statusCode).toEqual(200)
    const user = response.body[0]
    info.user_id = user.id
    expect([
      {
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password,
      },
    ]).toEqual([
      {
        firstname: 'test',
        lastname: 'user',
        password: hash,
      },
    ])
  })

  it('get /user/:userId with token should return the correct user', async () => {
    const response = await request
      .get(`/user/${info.user_id}`)
      .set('Content-type', 'application/json')
      .set('authorization', info.token)

    const salt = await bcrypt.genSalt(
      parseInt(process.env.SALT_ROUNDS as string)
    )

    const paper = process.env.BCRYPT_PASSWORD
    const hash = await bcrypt.hash('password' + paper, salt)

    expect(response.statusCode).toEqual(200)
    const user = response.body[0]
    expect({
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
    }).toEqual({
      firstname: 'test',
      lastname: 'user',
      password: hash,
    })
  })
})
