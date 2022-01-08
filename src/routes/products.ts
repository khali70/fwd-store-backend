import express, { Request, Response } from 'express'
import { ProductStore, product, coreProduct } from '../models/product'
import { token } from '../crypto'

const Router = express.Router()
const store = new ProductStore()

Router.get('/', async (req, res) => {
  const store = new ProductStore()
  const products = await store.index()
  res.status(200)
  res.contentType('application/json')
  res.send(products)
})
  .get('/:productId', async (req, res) => {
    try {
      const product = await store.show(req.params.productId)
      res.status(200)
      res.contentType('application/json')
      res.send(product)
    } catch (error) {
      res.status(500)
      res.contentType('application/json')
      res.send({ error })
    }
  })
  .post(
    '/',
    token,
    async (
      req: Request<
        Record<string, never>,
        product | { error: unknown },
        coreProduct
      >,
      res
    ) => {
      // should add new product and return success
      try {
        const product = await store.create(req.body)
        res.status(200)
        res.contentType('application/json')
        res.send(product)
      } catch (error) {
        res.status(500)
        res.contentType('application/json')
        res.send({ error })
      }
    }
  )
export default Router
