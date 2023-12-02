import { Request, Response } from 'express'
import listMessagesService from '../services/list-messages.service'

class ListMessageController {
  async handle(req: Request, res: Response) {
    const response = await listMessagesService.execute()

    return res.status(200).json(response)
  }
}

export default new ListMessageController()
