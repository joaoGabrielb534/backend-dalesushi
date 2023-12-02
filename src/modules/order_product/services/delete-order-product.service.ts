import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  orderProductId: string
}

class DeleteOrderProductService {
  async execute({ orderProductId }: IRequest) {
    const isOrderProductExists = await prisma.ordersHasProducts.findUnique({
      where: {
        id: orderProductId,
      },
    })

    if (!isOrderProductExists) {
      throw new AppError('OrderProduct not found', 404)
    }

    await prisma.ordersHasProducts.delete({
      where: {
        id: orderProductId,
      },
    })
  }
}

export default new DeleteOrderProductService()
