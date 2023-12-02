import { Router } from 'express'
import ClientController from '../modules/client/controllers/ClientController'
import { isAuthenticate } from '../middleware/isAuthenticate'
import { verifyEmployee } from '../middleware/verifyEmployee'
import { upload } from '../config/setupMulter'

class ClientRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.get(
      '/clients',
      isAuthenticate,
      verifyEmployee,
      ClientController.index,
    )
    this.router.post('/clients/register', ClientController.create)
    this.router.patch(
      '/clients/avatar',
      isAuthenticate,
      upload.single('avatar'),
      ClientController.setAvatar,
    )
    this.router.get(
      '/clients/avatar',
      isAuthenticate,
      ClientController.getAvatar,
    )
    this.router.get('/clients/details', isAuthenticate, ClientController.show)
    this.router.put('/clients/:id', isAuthenticate, ClientController.update)
    this.router.delete('/clients/:id', isAuthenticate, ClientController.delete)
  }

  public get getRouter() {
    return this.router
  }
}

export default new ClientRouter()
