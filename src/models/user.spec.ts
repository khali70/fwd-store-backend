import client from '../database'
import { UserStore } from './user'

const store = new UserStore()

describe('User Model', () => {
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query(`DELETE FROM users;`)
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
      id: 1,
      firstname: 'ahmed',
      lastname: 'khalifa',
      password: '123456789',
    })
    expect(result).toEqual({
      id: 1,
      firstname: 'ahmed',
      lastname: 'khalifa',
      password: '123456789',
    })
  })

  it('index method should return a list of users', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: 1,
        firstname: 'ahmed',
        lastname: 'khalifa',
        password: '123456789',
      },
    ])
  })

  it('show method should return the correct user', async () => {
    const result = await store.show('1')
    expect(result).toEqual({
      id: 1,
      firstname: 'ahmed',
      lastname: 'khalifa',
      password: '123456789',
    })
  })

  it('delete method should remove the book', async () => {
    store.delete('1')
    const result = await store.index()
    expect(result).toEqual([])
  })
})
