import { Request, Response } from 'express'

export const orderRoute = async (
  req: Request<{ userId: string; orderId: string }>,
  res: Response
) => {
  // current order by user
  console.log(JSON.stringify(req.params, null, 2))
}
