import prisma from '../../../config/Prisma'

interface IRequest {
  cartId: string
}

class GetAllOrderFinishOrderService {
  async execute({ cartId }: IRequest) {
    const orders = await prisma.order.findMany({
      where: {
        cartId,
        finalized: true,
      },
      select: {
        id: true,
        valueTotal: true,
        finalized: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    return orders
  }
}
export default new GetAllOrderFinishOrderService()
