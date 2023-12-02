import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  orderId: string
  valueTotal: number
}

class FinishAndCreateOrder {
  async execute({ orderId, valueTotal }: IRequest) {
    const isOrderExists = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    })

    if (!isOrderExists) {
      throw new AppError('Order not found', 404)
    }

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        valueTotal,
        finalized: true,
      },
    })

    const newOrder = await prisma.order.create({
      data: {
        cartId: isOrderExists.cartId,
      },
    })

    return newOrder.id
  }
}

export default new FinishAndCreateOrder()
