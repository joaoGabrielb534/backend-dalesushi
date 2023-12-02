import { Request, Response } from 'express'
import getAllOrdersFinishService from '../services/get-all-orders-finish.service'
import { z } from 'zod'

class GetAllOrderFinishOrderController {
  async handle(req: Request, res: Response) {
    const getOrderSchema = z.object({
      cartId: z.string().cuid().nonempty(),
    })

    const { cartId } = getOrderSchema.parse(req.params)

    const response = await getAllOrdersFinishService.execute({ cartId })

    return res.status(200).json(response)
  }
}

export default new GetAllOrderFinishOrderController()
