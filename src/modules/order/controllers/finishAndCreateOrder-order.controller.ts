import { Request, Response } from 'express'
import finishAndCreateOrderOrderService from '../services/finishAndCreateOrder-order.service'
import { z } from 'zod'

class FinishOrderAndCreateOrder {
  async handle(req: Request, res: Response) {
    const getOrderSchema = z.object({
      orderId: z.string().cuid(),
    })

    const finishOrderSchema = z.object({
      valueTotal: z
        .string()
        .nonempty()
        .transform((value) => +value),
    })

    const { valueTotal } = finishOrderSchema.parse(req.body)

    const { orderId } = getOrderSchema.parse(req.params)

    const response = await finishAndCreateOrderOrderService.execute({
      orderId,
      valueTotal,
    })

    return res.status(200).json(response)
  }
}

export default new FinishOrderAndCreateOrder()
