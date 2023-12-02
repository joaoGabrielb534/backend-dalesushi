import prisma from '../../../config/Prisma'

interface IRequest {
  id: string
}

class DeleteFavoriteService {
  async execute({ id }: IRequest) {
    await prisma.favorite.delete({
      where: {
        id,
      },
    })
  }
}

export default new DeleteFavoriteService()
