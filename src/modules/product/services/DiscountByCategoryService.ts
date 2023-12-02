import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  categoryId: string
  percentage: number
}

class DiscountByCategoryService {
  async execute({ categoryId, percentage }: IRequest) {
    const products = await prisma.product.findMany({
      where: {
        categoryId,
      },
    })

    if (!products) {
      throw new AppError('Products not found', 404)
    }

    const currentProducts = products.map((element) => {
      return {
        ...element,
        price: element.price - (percentage * element.price) / 100,
      }
    })

    return currentProducts
  }
}

export default new DiscountByCategoryService()
