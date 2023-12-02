import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
}

class DeleteCategoryService {
  async execute({ id }: IRequest) {
    const categoryAlreadyExists = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    if (!categoryAlreadyExists) {
      throw new AppError('Category not found', 404)
    }

    const category = await prisma.category.delete({
      where: {
        id,
      },
    })

    return category
  }
}

export default new DeleteCategoryService()
