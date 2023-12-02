import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
  name?: string
}

class UpdateCategoryService {
  async execute({ id, name }: IRequest) {
    const categoryAlreadyExists = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    if (!categoryAlreadyExists) {
      throw new AppError('Category not found', 404)
    }

    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })

    return category
  }
}

export default new UpdateCategoryService()
