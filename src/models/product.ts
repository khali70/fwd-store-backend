import client from '../database'
export interface coreProduct {
  name: string
  price: string
  category?: string
}
export interface product extends coreProduct {
  id: string
}
export class ProductStore {
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect()
      const query = `SELECT * FROM products`
      const result = await conn.query(query)
      conn.release()

      return result.rows
    } catch (error) {
      throw new Error('Cannot get the products' + error)
    }
  }
  async show(id: string): Promise<product> {
    try {
      const conn = await client.connect()
      const query = `SELECT * FROM products WHERE id=($1)`
      const result = await conn.query<product>(query, [id])
      const product = result.rows[0]
      conn.release()

      return product
    } catch (error) {
      throw new Error('Cannot get the product with id ' + id + 'error' + error)
    }
  }
  async update(id: string, p: product): Promise<product> {
    try {
      const conn = await client.connect()
      const query = `SELECT * FROM products WHERE id=($1)`
      const result = await conn.query<product>(query, [id])
      const product = result.rows[0]
      p
      conn.release()

      return product
    } catch (error) {
      throw new Error(
        'Cannot update the product with id ' + id + 'error' + error
      )
    }
  }
  async create(p: coreProduct): Promise<product> {
    const conn = await client.connect()
    const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
    const result = await conn.query<product>(sql, [p.name, p.price])
    const product = result.rows[0]
    conn.release()
    return product
  }
  async delete(id: string): Promise<product[]> {
    const conn = await client.connect()
    const sql = 'DELETE FROM products WHERE id=($1)'
    await conn.query(sql, [id])
    const result = await conn.query<product>('SELECT * FROM products')
    conn.release()
    return result.rows
  }
}
