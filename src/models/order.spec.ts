import { OrderStore } from './order'
import dotenv from 'dotenv'
import { ProductStore } from './product'
import { UserStore } from './user'
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
      `INSERT INTO users (id,firstname, lastname,password) VALUES(1,'ahmed', 'khalifa');`
    )
    conn.release()
  })
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query(`DELETE FROM products WHERE id=1;`)
    await conn.query(`DELETE FROM users WHERE id=1;`)
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
  it('create method should add a product', async () => {
    const result = await store.create({
      user_id: '1',
      status: 'active',
      products: [{ id: '1', quantity: 8 }],
    })

    expect(result).toEqual({
      id: 1,
      status: 'active',
      user_name: 'ahmed khalifa',
      products: [
        {
          quantity: 8,
          id: 1,
          price: '$20.00',
          total_price: '$160.00',
          name: 'sugar',
        },
      ],
    })
  })

  it('show method should return the correct user order', async () => {
    const result = await store.show('1')
    expect(result).toEqual({
      id: 1,
      status: 'active',
      user_name: 'ahmed khalifa',
      products: [
        {
          quantity: 8,
          id: 1,
          price: '$20.00',
          total_price: '$160.00',
          name: 'sugar',
        },
      ],
    })
  })
})
