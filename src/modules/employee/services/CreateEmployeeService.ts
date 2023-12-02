import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'
import { hashSync } from 'bcryptjs'

interface IRequest {
  name: string
  birthday: Date
  cpf: string
  email: string
  password: string
}

class CreateEmployeeService {
  async execute({ name, birthday, cpf, email, password }: IRequest) {
    const userByCpf = await prisma.employee.findUnique({
      where: {
        cpf,
      },
    })

    const userByEmail = await prisma.employee.findUnique({
      where: {
        email,
      },
    })

    if (userByCpf || userByEmail) {
      throw new AppError('Employee already exists', 409)
    }

    const passwordHash = hashSync(password, 16)

    const user = await prisma.employee.create({
      data: {
        name,
        birthday,
        cpf,
        email,
        password: passwordHash,
      },
    })

    return user
  }
}

export default new CreateEmployeeService()
