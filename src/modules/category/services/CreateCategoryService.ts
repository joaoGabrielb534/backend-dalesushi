import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  name: string
}

class CreateCategoryService {
  async execute({ name }: IRequest) {
    const categoryAlreadyExists = await prisma.category.findUnique({
      where: {
        name,
      },
    })

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists', 409)
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    })

    return category
  }
}

export default new CreateCategoryService()
