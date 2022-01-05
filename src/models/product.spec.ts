import { ProductStore } from './product'
import dotenv from 'dotenv'
import client from '../database'
dotenv.config()
const store = new ProductStore()

describe('Product Model', () => {
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query(`DELETE FROM products;`)
  })
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should have a update method', () => {
    expect(store.update).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined()
  })
  it('create method should add a product', async () => {
    const result = await store.create({
      id: '1',
      name: 'sugar',
      price: '20',
    })
    expect(result).toEqual({
      id: 1,
      name: 'sugar',
      price: '$20.00',
    })
  })

  it('index method should return a list of products', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: 1,
        name: 'sugar',
        price: '$20.00',
      },
    ])
  })

  it('show method should return the correct product', async () => {
    const result = await store.show('1')
    expect(result).toEqual({
      id: 1,
      name: 'sugar',
      price: '$20.00',
    })
  })
  it('delete method should delete product', async () => {
    const result = await store.delete('1')
    expect(result).toEqual([])
  })
})
