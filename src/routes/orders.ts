import { Request, Response } from 'express'
import { OrderStore } from '../models/order'
const store = new OrderStore()
export const orderRoute = async (
  req: Request<{ userId: string }>,
  res: Response
) => {
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
    // current order by user
    console.log(JSON.stringify(req.params, null, 2))
  } catch (error) {
    res.status(500)
    res.contentType('application/json')
    res.send({ Error: error })
  }
}
