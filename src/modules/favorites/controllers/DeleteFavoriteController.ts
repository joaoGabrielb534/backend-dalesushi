import { Request, Response } from 'express'
import { z } from 'zod'
import DeleteFavoriteService from '../services/DeleteFavoriteService'

class DeleteFavoriteController {
  async handle(req: Request, res: Response) {
    const favoriteSchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = favoriteSchema.parse(req.params)

    await DeleteFavoriteService.execute({ id })

    return res.status(204).end()
  }
}

export default new DeleteFavoriteController()
