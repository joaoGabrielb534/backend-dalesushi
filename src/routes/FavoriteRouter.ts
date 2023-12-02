import { Router } from 'express'
import { isAuthenticate } from '../middleware/isAuthenticate'
import CreateFavoriteController from '../modules/favorites/controllers/CreateFavoriteController'
import DeleteFavoriteController from '../modules/favorites/controllers/DeleteFavoriteController'
import ListAllFavoriteController from '../modules/favorites/controllers/ListAllFavoriteController'

class FavoriteRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.get(
      '/favorites',
      isAuthenticate,
      ListAllFavoriteController.handle,
    )
    this.router.post(
      '/favorite/register',
      isAuthenticate,
      CreateFavoriteController.handle,
    )
    this.router.delete(
      '/favorite/:id',
      isAuthenticate,
      DeleteFavoriteController.handle,
    )
  }

  public get getRouter() {
    return this.router
  }
}

export default new FavoriteRouter()
