import client from '../database'
import supertest from 'supertest'
import app from '../server'

const request = supertest(app)

describe(`Users Route`, () => {
  beforeAll(async () => {
    const conn = await client.connect()
    const sql = `INSERT INTO users 
    (id,firstName,lastName,password) 
    VALUES 
    (1,'test','user','password');
    `
    await conn.query(sql)
    conn.release()
  })
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query(`DELETE FROM users;`)
    conn.release()
  })
  it('get /user with token should return all users', async () => {
    const response = await request.get('/user')
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual([
      {
        id: 1,
        firstname: 'test',
        lastname: 'user',
        password: 'password',
      },
    ])
  })

  it('get /user/:userId with token should return the correct user', async () => {
    const response = await request.get('/user/1')
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      id: 1,
      firstname: 'test',
      lastname: 'user',
      password: 'password',
    })
  })

  it('post /user with token should return success', async () => {
    const response = await request.post('/user').send({
      firstname: 'user',
      lastname: 'Do',
      password: '12345678',
    })
    expect(response.statusCode).toEqual(200)
  })
})
