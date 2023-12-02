import { Router } from 'express'
import finishAndCreateOrderOrderController from '../modules/order/controllers/finishAndCreateOrder-order.controller'
import orderDetailsController from '../modules/order/controllers/order-details.controller'
import { isAuthenticate } from '../middleware/isAuthenticate'
import getAllOrdersFinishController from '../modules/order/controllers/get-all-orders-finish.controller'

class OrderRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.get(
      '/orders/:cartId',
      isAuthenticate,
      getAllOrdersFinishController.handle,
    )
    this.router.get(
      '/orders/:orderId/details',
      isAuthenticate,
      orderDetailsController.handle,
    )
    this.router.put(
      '/orders/:orderId/finish',
      isAuthenticate,
      finishAndCreateOrderOrderController.handle,
    )
  }

  public get getRouter() {
    return this.router
  }
}

export default new OrderRouter()
