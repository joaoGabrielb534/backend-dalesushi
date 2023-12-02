import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
}

class GetProductService {
  async execute({ id }: IRequest) {
    const productAlreadyExists = await prisma.product.findUnique({
      where: {
        id,
      },
    })

    if (!productAlreadyExists) {
      throw new AppError('Product not found', 404)
    }

    return productAlreadyExists
  }
}

export default new GetProductService()
