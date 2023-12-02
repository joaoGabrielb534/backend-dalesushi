import { Request, Response } from 'express'
import { z } from 'zod'
import createOrderProductService from '../services/create-order-product.service'

class CreateOrderProductController {
  async handle(req: Request, res: Response) {
    const createSchema = z.object({
      orderId: z.string().cuid(),
      productId: z.string().cuid(),
    })

    const { orderId, productId } = createSchema.parse(req.body)

    await createOrderProductService.execute({ orderId, productId })

    return res.status(201).end()
  }
}

export default new CreateOrderProductController()
