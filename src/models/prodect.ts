import client from '../database'
export type product = {
  id: number
  name: string
  price: string
  category: string
}
export class Product {
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect()
      const query = `SELECT * from products`
      const result = await conn.query(query)
      return result.rows
    } catch (error) {
      throw new Error('Cannot get the products' + error)
    }
  }
  async create(p: product): Promise<product> {
    const conn = await client.connect()
    const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
    const result = await conn.query(sql, [p.name, p.price])
    const product = result.rows[0]
    conn.release()
    return product
  }
  async delete(id: string): Promise<void> {
    const conn = await client.connect()
    const sql = 'DELETE FROM products WHERE id=($1)'
    const result = await conn.query(sql, [id])
  }
}
