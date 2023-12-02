import { Router } from 'express'
import CategoryController from '../modules/category/controllers/CategoryController'
import { verifyEmployee } from '../middleware/verifyEmployee'
import { isAuthenticate } from '../middleware/isAuthenticate'

class CategoryRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.get('/categories', isAuthenticate, CategoryController.index)
    this.router.post(
      '/categories/register',
      isAuthenticate,
      verifyEmployee,
      CategoryController.create,
    )
    this.router.get(
      '/categories/:id',
      isAuthenticate,
      verifyEmployee,
      CategoryController.show,
    )
    this.router.put(
      '/categories/:id',
      isAuthenticate,
      verifyEmployee,
      CategoryController.update,
    )
    this.router.delete(
      '/categories/:id',
      isAuthenticate,
      verifyEmployee,
      CategoryController.delete,
    )
  }

  public get getRouter() {
    return this.router
  }
}

export default new CategoryRouter()
