import client from '../database'
import supertest from 'supertest'
import app from '../server'
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
    expect(response.statusCode).toEqual(200)
  })
  it('get /user with token should return all users', async () => {
    const response = await request
      .get('/user')
      .set('Content-type', 'application/json')
      .set('authorization', info.token)

    expect(response.statusCode).toEqual(200)
    const user = response.body[0]
    info.user_id = user.id
    expect([
      {
        firstname: user.firstname,
        lastname: user.lastname,
      },
    ]).toEqual([
      {
        firstname: 'test',
        lastname: 'user',
      },
    ])
  })

  it('get /user/:userId with token should return the correct user', async () => {
    const response = await request
      .get(`/user/${info.user_id}`)
      .set('Content-type', 'application/json')
      .set('authorization', info.token)

    expect(response.statusCode).toEqual(200)
    const user = response.body
    expect({
      firstname: user.firstname,
      lastname: user.lastname,
    }).toEqual({
      firstname: 'test',
      lastname: 'user',
    })
  })
})
