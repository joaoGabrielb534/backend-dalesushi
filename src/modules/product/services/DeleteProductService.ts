import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
}

class DeleteProductService {
  async execute({ id }: IRequest) {
    const productAlreadyExists = await prisma.product.findUnique({
      where: {
        id,
      },
    })

    if (!productAlreadyExists) {
      throw new AppError('Product not found', 404)
    }

    const product = await prisma.product.delete({
      where: {
        id,
      },
    })

    return product
  }
}

export default new DeleteProductService()
