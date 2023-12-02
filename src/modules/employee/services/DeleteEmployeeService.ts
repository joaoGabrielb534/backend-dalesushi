import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
}

class DeleteEmployeeService {
  async execute({ id }: IRequest) {
    const employeeAlreadyExists = await prisma.employee.findUnique({
      where: {
        id,
      },
    })

    if (!employeeAlreadyExists) {
      throw new AppError('Employee not found', 404)
    }

    const employee = await prisma.employee.delete({
      where: {
        id,
      },
    })

    return employee
  }
}

export default new DeleteEmployeeService()
