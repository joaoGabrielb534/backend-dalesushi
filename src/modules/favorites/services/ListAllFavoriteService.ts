import prisma from '../../../config/Prisma'

interface IRequest {
  clientId: string
}

class ListAllFavoriteService {
  async execute({ clientId }: IRequest) {
    return await prisma.favorite.findMany({
      where: {
        clientId,
      },
      select: {
        id: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
          },
        },
      },
    })
  }
}

export default new ListAllFavoriteService()
