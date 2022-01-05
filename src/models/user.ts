import client from '../database'
export interface coreUser {
  id?: string | number
  firstname: string
  lastname: string
  password: string
}
export interface user extends coreUser {
  id: string | number
}
export class UserStore {
  async index(): Promise<user[]> {
    try {
      const conn = await client.connect()
      const query = `SELECT * from users`
      const result = await conn.query(query)
      return result.rows
    } catch (error) {
      throw new Error('Cannot get the users' + error)
    }
  }
  async show(id: string): Promise<user> {
    try {
      const conn = await client.connect()
      const query = `SELECT * FROM users WHERE id=($1)`
      const result = await conn.query(query, [id])
      const user = result.rows[0]
      conn.release()

      return user
    } catch (error) {
      throw new Error('Cannot get the user with id ' + id + 'error' + error)
    }
  }
  async update(id: string, u: coreUser): Promise<user> {
    try {
      const conn = await client.connect()
      const query = `SELECT * FROM users WHERE id=($1)`
      const result = await conn.query(query, [id])
      const user = result.rows[0]
      conn.release()
      u
      return user
    } catch (error) {
      throw new Error('Cannot update the user with id ' + id + 'error' + error)
    }
  }
  async create(u: coreUser): Promise<user> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO users (firstname, lastname,password) VALUES($1, $2, $3) RETURNING *'
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.password,
      ])
      const user = result.rows[0]
      conn.release()
      return user
    } catch (error) {
      throw Error(`can't create user with name ${u.firstname} error ${error}`)
    }
  }
  async delete(id: string): Promise<user[]> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM users WHERE id=($1)'
      await conn.query(sql, [id])
      const products = await conn.query<user>('SELECT * FROM users')
      conn.release()
      return products.rows
    } catch (error) {
      throw Error(`can't delete user with id:${id} Error ${error}`)
    }
  }
}
