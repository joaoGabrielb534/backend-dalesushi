import { Request, Response } from 'express'
import { z } from 'zod'
import CreateFavoriteService from '../services/CreateFavoriteService'

class CreateFavoriteController {
  async handle(req: Request, res: Response) {
    const favoriteSchema = z.object({
      productId: z.string().cuid(),
    })

    const { productId } = favoriteSchema.parse(req.body)
    const clientId = req.userId

    await CreateFavoriteService.execute({ productId, clientId })

    return res.status(201).end()
  }
}

export default new CreateFavoriteController()
