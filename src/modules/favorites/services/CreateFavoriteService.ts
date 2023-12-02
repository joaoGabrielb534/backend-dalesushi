import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  clientId: string
  productId: string
}

class CreateFavoriteService {
  async execute({ clientId, productId }: IRequest) {
    const isFavoriteExits = await prisma.favorite.findFirst({
      where: {
        clientId,
        productId,
      },
    })

    if (isFavoriteExits) {
      throw new AppError('This product is already a favorite', 409)
    }

    await prisma.favorite.create({
      data: {
        clientId,
        productId,
      },
    })
  }
}

export default new CreateFavoriteService()
