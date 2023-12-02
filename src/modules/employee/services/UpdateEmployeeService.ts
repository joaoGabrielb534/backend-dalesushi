import { hashSync } from 'bcryptjs'
import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
  name?: string
  birthday?: Date
  cpf?: string
  email?: string
  password?: string
}

class UpdateEmployeeService {
  async execute({ id, name, birthday, cpf, email, password }: IRequest) {
    const employeeAlreadyExists = await prisma.employee.findUnique({
      where: {
        id,
      },
    })

    if (!employeeAlreadyExists) {
      throw new AppError('Employee not found', 404)
    }

    const passwordHash = password ? hashSync(password, 16) : password

    const employee = await prisma.employee.update({
      where: {
        id,
      },
      data: {
        name,
        password: passwordHash,
        email,
        birthday,
        cpf,
      },
    })

    return employee
  }
}

export default new UpdateEmployeeService()
