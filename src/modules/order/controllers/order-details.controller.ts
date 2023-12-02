import { Request, Response } from 'express'
import { z } from 'zod'
import orderDetailsService from '../services/order-details.service'

class OrderDetailsController {
  async handle(req: Request, res: Response) {
    const detailsSchema = z.object({
      orderId: z.string().cuid(),
    })

    const { orderId } = detailsSchema.parse(req.params)

    const response = await orderDetailsService.execute({ orderId })

    return res.status(200).json(response)
  }
}

export default new OrderDetailsController()
