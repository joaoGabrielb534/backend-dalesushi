import { Router } from 'express'
import EmployeeController from '../modules/employee/controllers/EmployeeController'
import { isAuthenticate } from '../middleware/isAuthenticate'
import { verifyEmployee } from '../middleware/verifyEmployee'

class EmployeeRouter {
  private router: Router

  constructor() {
    this.router = Router()
    this.setup()
  }

  private setup() {
    this.router.get(
      '/employees',
      isAuthenticate,
      verifyEmployee,
      EmployeeController.index,
    )
    this.router.post('/employees/register', EmployeeController.create)
    this.router.get(
      '/employees/me',
      isAuthenticate,
      verifyEmployee,
      EmployeeController.show,
    )
    this.router.put(
      '/employees/:id',
      isAuthenticate,
      verifyEmployee,
      EmployeeController.update,
    )
    this.router.delete(
      '/employees/:id',
      isAuthenticate,
      verifyEmployee,
      EmployeeController.delete,
    )
  }

  public get getRouter() {
    return this.router
  }
}

export default new EmployeeRouter()
