import { Router } from 'express'
import { isAuthenticate } from '../middleware/isAuthenticate'
import listMessagesController from '../modules/messages/contollers/list-messages.controller'

class MessageRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.get('/messages', isAuthenticate, listMessagesController.handle)
  }

  public get getRouter() {
    return this.router
  }
}

export default new MessageRouter()
