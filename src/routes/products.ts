import express, { Request, Response } from 'express'
import { ProductStore, product, coreProduct } from '../models/product'
import { token } from '../token'

const Router = express.Router()

Router.get('/', async (req, res) => {
  const store = new ProductStore()
  const products = await store.index()
  res.status(200)
  res.contentType('application/json')
  res.send(products)
})
  .get('/:productId', async (req, res) => {
    const store = new ProductStore()
    const product = await store.show(req.params.productId)
    res.status(200)
    res.contentType('application/json')
    res.send(product)
  })
  .post(
    '/',
    token,
    async (req: Request<Record<string, never>, product, coreProduct>, res) => {
      // should add new product and return success
      const store = new ProductStore()
      const product = await store.create(req.body)
      res.status(200)
      res.contentType('application/json')
      res.send(product)
    }
  )
export default Router
