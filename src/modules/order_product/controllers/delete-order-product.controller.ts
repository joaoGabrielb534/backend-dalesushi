import { Request, Response } from 'express'
import { z } from 'zod'
import deleteOrderProductService from '../services/delete-order-product.service'

class DeleteOrderProductController {
  async handle(req: Request, res: Response) {
    const deleteSchema = z.object({
      id: z.string(),
    })

    const { id } = deleteSchema.parse(req.params)

    await deleteOrderProductService.execute({ orderProductId: id })

    return res.status(204).end()
  }
}

export default new DeleteOrderProductController()
