import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  orderId: string
  productId: string
}

class CreateOrderProductService {
  async execute({ orderId, productId }: IRequest) {
    const isOrderProductExists = await prisma.ordersHasProducts.findFirst({
      where: {
        orderId,
        productId,
      },
    })

    if (isOrderProductExists) {
      throw new AppError('Product already exists on order', 409)
    }

    await prisma.ordersHasProducts.create({
      data: {
        orderId,
        productId,
      },
    })
  }
}

export default new CreateOrderProductService()
