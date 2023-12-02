import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
}

class GetEmployeeService {
  async execute({ id }: IRequest) {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    })

    if (!employee) {
      throw new AppError('Employee not found', 404)
    }

    return employee
  }
}

export default new GetEmployeeService()
