import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  orderId: string
}

class OrderDetailsService {
  async execute({ orderId }: IRequest) {
    const isOrderExists = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
        id: true,
        products: {
          select: {
            id: true,
            amount: true,
            product: {
              select: {
                name: true,
                imageUrl: true,
                price: true,
              },
            },
          },
        },
      },
    })

    if (!isOrderExists) {
      throw new AppError('Order not found', 404)
    }

    return { orderId: isOrderExists.id, products: isOrderExists.products }
  }
}

export default new OrderDetailsService()
