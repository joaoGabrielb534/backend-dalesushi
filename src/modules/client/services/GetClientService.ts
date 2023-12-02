import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
}

class GetClientService {
  async execute({ id }: IRequest) {
    const clientAlreadyExists = await prisma.client.findUnique({
      where: {
        id,
      },
    })

    if (!clientAlreadyExists) {
      throw new AppError('Client not found', 404)
    }

    return clientAlreadyExists
  }
}

export default new GetClientService()
