import client from '../database'
import supertest from 'supertest'
import app from '../server'

const request = supertest(app)

describe(`Orders Route`, () => {
  beforeAll(async () => {
    const conn = await client.connect()
    await conn.query(
      `INSERT INTO products (id,name, price) VALUES(1,'sugar', '20');`
    )
    await conn.query(
      `INSERT INTO users (id,firstname, lastname,password) VALUES(1,'ahmed', 'khalifa','123456789');`
    )
    await conn.query(
      `INSERT INTO orders (id,user_id, status) VALUES(1,1, 'active');`
    )
    await conn.query(
      `INSERT INTO order_products(id,order_id,product_id,quantity) VALUES (1,1,1,8);`
    )
    conn.release()
  })
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query(`DELETE FROM products;`)
    await conn.query(`DELETE FROM users;`)
    await conn.query(`DELETE FROM orders;`)
    await conn.query(`DELETE FROM order_products;`)
    conn.release()
  })

  it('get /user/:userId/order with token should return the correct user', async () => {
    const response = await request.get('/user/1/order')
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      id: 1,
      user_name: 'ahmed khalifa',
      status: 'active',
      products: [
        {
          id: 1,
          name: 'sugar',
          price: '$20.00',
          quantity: 8,
          total_price: '$160.00',
        },
      ],
    })
  })
})
