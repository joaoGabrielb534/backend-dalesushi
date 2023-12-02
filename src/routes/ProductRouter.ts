import { Router } from 'express'
import ProductController from '../modules/product/controllers/ProductController'
import { isAuthenticate } from '../middleware/isAuthenticate'
import { verifyEmployee } from '../middleware/verifyEmployee'
import { upload } from '../config/setupMulter'

class ProductRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.get('/products', isAuthenticate, ProductController.index)
    this.router.post(
      '/products/register',
      isAuthenticate,
      verifyEmployee,
      upload.single('image'),
      ProductController.create,
    )
    this.router.get('/products/:id', isAuthenticate, ProductController.show)
    this.router.put(
      '/products/:id',
      isAuthenticate,
      verifyEmployee,
      ProductController.update,
    )
    this.router.delete(
      '/products/:id',
      isAuthenticate,
      verifyEmployee,
      ProductController.delete,
    )
    this.router.post(
      '/products/:categoryId/discount',
      isAuthenticate,
      verifyEmployee,
      ProductController.discount,
    )
  }

  public get getRouter() {
    return this.router
  }
}

export default new ProductRouter()
