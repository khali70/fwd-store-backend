import { OrderStore } from './order'
import dotenv from 'dotenv'
import client from '../database'
dotenv.config()
const store = new OrderStore()
describe('Orders Model', () => {
  beforeAll(async () => {
    const conn = await client.connect()
    await conn.query(
      `INSERT INTO products (id,name, price) VALUES(1,'sugar', '20');`
    )
    await conn.query(
      `INSERT INTO users (id,firstname, lastname,password) VALUES(1,'ahmed', 'khalifa','123456789');`
    )
    await conn.query(
      `INSERT INTO orders (user_id, status) VALUES(1, 'active');`
    )
    await conn.query(
      `INSERT INTO order_products(order_id,product_id,quantity) VALUES (1,1,8);`
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
  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined()
  })

  it('show method should return the correct user order', async () => {
    const result = await store.show('1')
    expect(result).toEqual({
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
