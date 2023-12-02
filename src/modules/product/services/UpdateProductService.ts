import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
  name?: string
  price?: number
  description?: string
  categoryId?: string
  barCode?: string
  manufacturingDate?: Date
  expirationDate?: Date
}

class UpdateProductService {
  async execute({
    id,
    name,
    price,
    description,
    categoryId,
    barCode,
    manufacturingDate,
    expirationDate,
  }: IRequest) {
    const productAlreadyExists = await prisma.product.findUnique({
      where: {
        id,
      },
    })

    if (!productAlreadyExists) {
      throw new AppError('Product not found', 404)
    }

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        description,
        categoryId,
        barCode,
        manufacturingDate,
        expirationDate,
      },
    })

    return product
  }
}

export default new UpdateProductService()
