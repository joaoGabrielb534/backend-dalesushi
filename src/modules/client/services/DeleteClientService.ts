import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
}

class DeleteClientService {
  async execute({ id }: IRequest) {
    const clientAlreadyExists = await prisma.client.findUnique({
      where: {
        id,
      },
    })

    if (!clientAlreadyExists) {
      throw new AppError('Client not found', 404)
    }

    const client = await prisma.client.delete({
      where: {
        id,
      },
    })

    return client
  }
}

export default new DeleteClientService()
