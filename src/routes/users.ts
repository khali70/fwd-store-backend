import express, { Request, Response } from 'express'
import { UserStore } from '../models/user'
import { orderRoute } from './orders'

const Router = express.Router()
const token = async (req: Request, res: Response, next: () => void) => {
  next()
}
Router.get('/', token, async (req, res) => {
  const store = new UserStore()
  const users = await store.index()
  res.status(200)
  res.contentType('application/json')
  res.send(users)
})
  .get('/:userId', token, async (req: Request<{ userId: string }>, res) => {
    const store = new UserStore()
    const user = await store.show(req.params.userId)
    res.status(200)
    res.contentType('application/json')
    res.send(user)
  })
  .post(
    '/',
    token,
    async (
      req: Request<
        Record<string, never>,
        Record<string, unknown>,
        { bodyValue: string }
      >,
      res
    ) => {
      // should create new user
      // encrypt the password
      console.log(req.body)
    }
  )
  .get('/:userId/orders/:orderId', token, orderRoute)

export default Router
