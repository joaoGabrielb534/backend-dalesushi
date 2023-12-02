import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
  avatar: string
}

class SetAvatarClientService {
  async execute({ id, avatar }: IRequest) {
    const isClient = await prisma.client.findUnique({
      where: {
        id,
      },
    })

    if (!isClient) {
      throw new AppError('Client not found', 204)
    }

    const user = await prisma.client.update({
      where: {
        id,
      },
      data: {
        avatar: `${process.env.URL_BUCKET_ACCESS}/${avatar}`,
      },
      select: {
        avatar: true,
      },
    })

    return { avatar: user.avatar }
  }
}

export default new SetAvatarClientService()
