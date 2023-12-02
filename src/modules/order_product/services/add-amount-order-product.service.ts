import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  id: string
}

class AddAmountOrderProductService {
  async execute({ id }: IRequest) {
    const isOrderProductExists = await prisma.ordersHasProducts.findUnique({
      where: {
        id,
      },
    })

    if (!isOrderProductExists) {
      throw new AppError('OrderProduct not found', 404)
    }

    await prisma.ordersHasProducts.update({
      where: {
        id,
      },
      data: {
        amount: isOrderProductExists.amount + 1,
      },
    })
  }
}

export default new AddAmountOrderProductService()
