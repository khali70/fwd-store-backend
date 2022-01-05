import express, { Request, Response } from 'express'
import { user, UserStore } from '../models/user'
import { orderRoute } from './orders'

const Router = express.Router()
const store = new UserStore()
const token = async (req: Request, res: Response, next: () => void) => {
  next()
}
Router.get('/', token, async (req, res) => {
  try {
    const users = await store.index()
    res.status(200)
    res.contentType('application/json')
    res.send(users)
  } catch (error) {
    res.status(500)
    res.send(error)
  }
})
  .get('/:userId', token, async (req: Request<{ userId: string }>, res) => {
    try {
      const user = await store.show(req.params.userId)
      res.status(200)
      res.contentType('application/json')
      res.send(user)
    } catch (error) {
      res.status(500)
      res.send(error)
    }
  })
  .post(
    '/',
    token,
    async (
      req: Request<
        Record<string, never>,
        Partial<user> | Error,
        { firstname: string; lastname: string; password: string }
      >,
      res
    ) => {
      // should create new user
      // encrypt the password
      if (
        req.body.firstname == undefined &&
        req.body.password == undefined &&
        req.body.lastname == undefined
      ) {
        res.status(401)

        res.send(
          Error(
            `\
            ${req.body.firstname ? '' : 'first name is required\n'}
            ${req.body.lastname ? '' : 'last name is required\n'}
            ${req.body.password ? '' : 'password is required'}`
          )
        )

        return
      }
      try {
        const user = await store.create(req.body)
        res.status(200)
        res.contentType('application/json')
        res.send(user)
      } catch (error) {
        res.status(500)
        res.contentType('application/json')
        res.send(error as Error)
      }
    }
  )
  .get('/:userId/orders/:orderId', token, orderRoute)

export default Router
