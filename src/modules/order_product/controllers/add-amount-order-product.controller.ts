import { Request, Response } from 'express'
import addAmountOrderProductService from '../services/add-amount-order-product.service'
import { z } from 'zod'

class AddAmountOrderProductController {
  async handle(req: Request, res: Response) {
    const addAmountSchema = z.object({
      id: z.string(),
    })

    const { id } = addAmountSchema.parse(req.params)

    await addAmountOrderProductService.execute({ id })

    return res.status(204).end()
  }
}

export default new AddAmountOrderProductController()
