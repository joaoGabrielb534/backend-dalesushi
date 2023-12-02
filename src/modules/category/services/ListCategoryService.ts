import prisma from '../../../config/Prisma'

class ListCategoryService {
  async execute() {
    const categories = await prisma.category.findMany()
    return categories
  }
}

export default new ListCategoryService()
