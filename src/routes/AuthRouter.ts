import { Router } from 'express'
import AuthController from '../modules/auth/controllers/AuthController'

class AuthRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.post('/auth/employees', AuthController.authEmployee)
    this.router.post('/auth/clients', AuthController.authClient)
  }

  public get getRouter() {
    return this.router
  }
}

export default new AuthRouter()
