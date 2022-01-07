import express, { Request } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { user, UserStore } from '../models/user'

import dotenv from 'dotenv'
import { token } from '../token'
dotenv.config()
const Router = express.Router()
const store = new UserStore()

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
  .get('/:id', token, async (req: Request<{ id: string }>, res) => {
    try {
      const user = await store.show(req.params.id)
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
    async (
      req: Request<
        Record<string, never>,
        { token: string } | { error: unknown },
        { firstname: string; lastname: string; password: string }
      >,
      res
    ) => {
      if (req.body.firstname == undefined || req.body.password == undefined) {
        console.log(req.body)
        res.status(401)
        res.send({
          error: `${req.body.firstname ? '' : 'first name is required,'}${
            req.body.password ? '' : 'password is required'
          }`,
        })

        return
      }
      try {
        const salt = await bcrypt
          .genSalt(parseInt(process.env.SALT_ROUNDS as string))
          .catch((error) => {
            throw Error(`can't generate salt ${error}`)
          })
        const paper = process.env.BCRYPT_PASSWORD
        const hash = await bcrypt
          .hash(req.body.password + paper, salt)
          .catch((error) => {
            throw Error(`can't hash password ${error}`)
          })
        const password = hash
        const body = { ...req.body, password }
        const user = await store.create(body)
        const token = jwt.sign(user, process.env.TOKEN_SECRET as string)
        res.status(200)
        res.contentType('application/json')
        res.send({ token })
      } catch (error) {
        res.status(500)
        res.contentType('application/json')
        res.send({ error })
      }
    }
  )
  .post(
    '/auth',
    async (
      req: Request<
        Record<string, never>,
        { error: Error | string } | { token: string },
        user
      >,
      res
    ) => {
      if (req.body.firstname == undefined && req.body.password == undefined) {
        res.status(401)
        res.contentType('application/json')
        res.send({
          error: Error(
            `\
            ${req.body.firstname ? '' : 'first name is required\n'}
            ${req.body.password ? '' : 'password is required'}`
          ),
        })
        return
      }
      try {
        const user = await store.auth(req.body.firstname, req.body.password)
        if (user) {
          const token = jwt.sign(user, process.env.TOKEN_SECRET as string)
          res.status(200)
          res.contentType('application/json')
          res.send({ token })
        }
        res.status(401)
        res.contentType('application/json')
        res.send({ error: 'invalid username or password' })
      } catch (error) {
        res.status(500)
        res.contentType('application/json')
        res.send({ error: error as Error })
      }
    }
  )

export default Router
