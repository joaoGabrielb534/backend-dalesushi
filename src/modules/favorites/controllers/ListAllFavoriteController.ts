import { Request, Response } from 'express'
import ListAllFavoriteService from '../services/ListAllFavoriteService'

class DeleteFavoriteController {
  async handle(req: Request, res: Response) {
    const clientId = req.userId

    const response = await ListAllFavoriteService.execute({ clientId })

    return res.status(200).json(response)
  }
}

export default new DeleteFavoriteController()
