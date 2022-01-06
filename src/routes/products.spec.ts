import client from '../database'
import supertest from 'supertest'
import app from '../server'

const request = supertest(app)

describe(`Products Route`, () => {
  beforeAll(async () => {
    const conn = await client.connect()
    const sql = `INSERT INTO products 
    (id,name,price,category)
    VALUES
    (1,'sugar',20,'caffe');
    `
    await conn.query(sql)
    conn.release()
  })
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query(`DELETE FROM products;`)
    conn.release()
  })
  it('get /product should return all products', async () => {
    const response = await request.get('/product')
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual([
      {
        id: 1,
        name: 'sugar',
        price: '$20.00',
      },
    ])
  })

  it('get /product/:productId should return the correct product', async () => {
    const response = await request.get('/product/1')
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      id: 1,
      name: 'sugar',
      price: '$20.00',
    })
  })

  it('post /product with token should return success', async () => {
    const response = await request.post('/product').send({
      name: 'tea',
      price: '14',
    })
    expect(response.statusCode).toEqual(200)
  })
})
