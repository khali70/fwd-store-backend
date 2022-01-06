import client from '../database'
import { product } from './product'
export interface order_product extends product {
  quantity: string | number
  total_price: string | number
}
export interface coreOrder {
  user_name: string // firstname + lastname
  status: string
}
export interface coreOrderQuery extends coreOrder {
  id: string | number
}
export interface coreOrderWithProducts extends coreOrder {
  products: order_product[]
}
export interface order extends coreOrderWithProducts {
  id: number | string
}
export class OrderStore {
  async show(user_id: string): Promise<order> {
    try {
      const conn = await client.connect()
      const orderProductsQuery = `
      SELECT products.id,name ,price,quantity,price*quantity as total_price 
      FROM order_products
      JOIN products on products.id = product_id
      WHERE order_id=(SELECT MAX(id) FROM orders WHERE user_id=($1));`

      const userOrdersQuery = `
      SELECT orders.id,firstname|| ' ' || lastname as user_name , status
      FROM orders
      JOIN users ON users.id = user_id
      WHERE orders.id =(SELECT MAX(id) FROM orders WHERE user_id=($1));`
      const result = await conn.query<coreOrderQuery>(userOrdersQuery, [
        user_id,
      ])
      const order = result.rows[0]
      const resultProducts = await conn.query<order_product>(
        orderProductsQuery,
        [user_id]
      )
      conn.release()
      return { ...order, products: resultProducts.rows }
    } catch (error) {
      throw new Error('Cannot get the orders ' + error)
    }
  }
  async create(user_order: {
    user_id: string
    status: string
    products: { id: string; quantity: number }[]
  }): Promise<order> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING id'
      const result = await conn.query<{ id: number }>(sql, [
        user_order.user_id,
        user_order.status,
      ])
      for (const p of user_order.products) {
        const order_id = result.rows[0].id
        const query = `INSERT INTO order_products(order_id,product_id,quantity) VALUES ($1,$2,$3)`
        await conn.query(query, [order_id, p.id, p.quantity])
      }
      const order = await this.show(user_order.user_id)
      conn.release()
      return order
    } catch (error) {
      throw Error(`can't create order for user ${user_order.user_id}`)
    }
  }
  async delete(id: string): Promise<void> {
    const conn = await client.connect()
    const sql = 'DELETE FROM orders WHERE id=($1)'
    conn.query(sql, [id])
    conn.release()
  }
}
