import { compareSync, hashSync } from 'bcryptjs'
import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
  name?: string
  birthday?: Date
  cpf?: string
  email?: string
  password?: string
  oldPassword?: string
}

class UpdateClientService {
  async execute({
    id,
    name,
    birthday,
    cpf,
    email,
    password,
    oldPassword,
  }: IRequest) {
    const clientAlreadyExists = await prisma.client.findUnique({
      where: {
        id,
      },
    })

    if (!clientAlreadyExists) {
      throw new AppError('Client not found', 404)
    }

    if (oldPassword) {
      const checkOldPassword = compareSync(
        oldPassword,
        clientAlreadyExists.password,
      )

      if (!checkOldPassword) {
        throw new AppError('Old passwords do not match', 409)
      }

      if (!password) {
        throw new AppError('New password is required')
      }

      return await prisma.client.update({
        where: {
          id,
        },
        data: {
          name,
          birthday,
          cpf,
          email,
          password: hashSync(password, 10),
        },
      })
    }

    return await prisma.client.update({
      where: {
        id,
      },
      data: {
        name,
        birthday,
        cpf,
        email,
      },
    })
  }
}

export default new UpdateClientService()
