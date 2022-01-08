import { Request, Response, Router } from 'express'
import { OrderStore } from '../models/order'
import { token } from '../crypto'
const store = new OrderStore()
const orderRoute = async (req: Request<{ userId: string }>, res: Response) => {
  if (req.params.userId == undefined) {
    res.status(401)
    res.contentType('application/json')
    res.send({ Error: `invalid user Id` })
    return
  }
  try {
    const order = await store.show(req.params.userId)
    res.status(200)
    res.contentType('application/json')
    res.send(order)
  } catch (error) {
    res.status(500)
    res.contentType('application/json')
    res.send({ Error: error })
  }
}
const route = Router()
route.get('/:userId/order/', token, orderRoute)
export default route
