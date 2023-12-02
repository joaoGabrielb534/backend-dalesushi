import { Request, Response } from 'express'
import { z } from 'zod'
import removeAmountOrderProductService from '../services/remove-amount-order-product.service'

class RemoveAmountOrderProductController {
  async handle(req: Request, res: Response) {
    const addAmountSchema = z.object({
      id: z.string(),
    })

    const { id } = addAmountSchema.parse(req.params)

    await removeAmountOrderProductService.execute({ id })

    return res.status(204).end()
  }
}

export default new RemoveAmountOrderProductController()
